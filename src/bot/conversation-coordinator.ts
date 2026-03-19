import { IncomingMessage, MessagingProvider, SessionData } from './messaging-service.js';
import { sessionManager } from './session-manager.js';
import { GenerationRunner } from './generation-runner.js';
import { WorkspaceManager } from './workspace-manager.js';
import { SiteSpec, Asset } from './types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { intentService, Intent } from '../lib/intent-service.js';
import { transcriptionService } from '../lib/transcription-service.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(process.cwd(), 'temp-uploads');

export class ConversationCoordinator {
  private generationRunner = new GenerationRunner();
  private workspaceManager = new WorkspaceManager();

  async handleMessage(message: IncomingMessage, provider: MessagingProvider): Promise<void> {
    try {
      const session = await sessionManager.getSession(message.platform, message.from);
    
      // 1. Handle Voice Transcription
      if (message.voiceId) {
        try {
          const audioBuffer = await provider.downloadMedia(message.voiceId);
          const tempPath = path.join(UPLOADS_DIR, `voice_${Date.now()}_${message.from}.ogg`);
          await fs.mkdir(UPLOADS_DIR, { recursive: true });
          await fs.writeFile(tempPath, audioBuffer);
          
          const transcribedText = await transcriptionService.transcribe(tempPath);
          message.text = transcribedText;
          await fs.unlink(tempPath).catch(e => console.error('Failed to unlink temp voice file:', e));
        } catch (error) {
          console.error('Transcription failed:', error);
          await provider.sendMessage(message.from, "⚠️ I heard your voice message but couldn't transcribe it. Could you please type it instead?");
          return;
        }
      }

      // 2. Handle Media Uploads (Multi-modal)
      if (message.mediaUrl) {
        const localPath = await this.handleMediaUpload(message.mediaUrl, provider, 'asset');
        session.spec.assets = session.spec.assets || [];
        session.spec.assets.push({ 
          type: 'image', 
          source: 'file', 
          content: localPath 
        });
        console.log(`[Media] Captured asset to ${localPath}`);
      }

      const text = message.text?.trim() || '';

      // 3. Intent Classification with Context
      const context = `Scene: ${session.currentScene}, Processing: ${session.isProcessing}, Current Spec: ${JSON.stringify(session.spec)}`;
      const intent = await intentService.classify(text, context);
      console.log(`[Intent] Classified as: ${intent.type} (confidence: ${intent.confidence})`);

      // 4. Handle Processing Lock Contextually
      if (session.isProcessing) {
        // High priority intents that are allowed during processing
        if (intent.type === 'CHAT' || intent.type === 'HELP' || intent.type === 'LIST_SITES' || intent.type === 'CANCEL_BUILD') {
           // Allow these to proceed
        } else {
           // Block building/updating if already processing
           await provider.sendMessage(message.from, "⏳ I'm still working on your previous request. You can chat with me or say 'Cancel' to stop current build.");
           return;
        }
      }

      // 5. Handle Cancel Intent
      if (intent.type === 'CANCEL_BUILD') {
        if (!session.isProcessing) {
          await provider.sendMessage(message.from, "Nothing is currently building! How else can I help?");
          return;
        }
        session.isProcessing = false;
        session.currentScene = 'IDLE';
        await provider.sendMessage(message.from, "🛑 Generation stopped. Session reset.");
        await sessionManager.saveSession(message.platform, message.from, session);
        return;
      }

      // 6. Update session spec with extracted parameters (if not in processing)
      if (!session.isProcessing && intent.parameters) {
        if (intent.parameters.projectName) session.spec.name = intent.parameters.projectName;
        if (intent.parameters.designStyle) session.spec.persona = intent.parameters.designStyle;
        if (intent.parameters.subdomain) session.spec.preferredSubdomain = intent.parameters.subdomain;
        if (intent.parameters.description && !session.spec.description) session.spec.description = intent.parameters.description;
        
        // Handle explicit skips
        if (intent.parameters.skipField) {
          if (intent.parameters.skipField === 'projectName') session.spec.name = '';
          if (intent.parameters.skipField === 'designStyle') session.spec.persona = 'Modern Minimalist'; 
          if (intent.parameters.skipField === 'subdomain') session.spec.preferredSubdomain = '';
        }
      }

      // 7. Route to Scene
      if (session.currentScene === 'BUILD_SCENE' && !session.isProcessing) {
        await this.runBuildScene(message, session, provider, intent);
      } else if (session.currentScene === 'UPDATE_SCENE' && !session.isProcessing) {
        await this.runUpdateScene(message, session, provider);
      } else {
        // IDLE state or CHAT/HELP during processing
        switch (intent.type) {
          case 'GENERATE_SITE':
            session.currentScene = 'BUILD_SCENE';
            session.spec = {
              description: intent.parameters.description || text || session.spec.description || '',
              name: intent.parameters.projectName || session.spec.name,
              persona: intent.parameters.designStyle || session.spec.persona,
              preferredSubdomain: intent.parameters.subdomain || session.spec.preferredSubdomain,
              assets: session.spec.assets || [],
              features: ['Modern UI', 'Responsive Design', 'Fast Performance'],
              theme: { primaryColor: '3b82f6', darkMode: false }
            };
            await this.runBuildScene(message, session, provider, intent);
            break;

          case 'UPDATE_SITE':
            session.currentScene = 'UPDATE_SCENE';
            session.siteId = intent.parameters.siteId;
            session.instruction = intent.parameters.instruction;
            if (session.siteId && session.instruction) {
              await provider.sendMessage(message.from, `🔄 Okay, updating site ${session.siteId}...`);
              // Fire and forget update
              this.startUpdate(message.from, session, provider);
            } else {
              await provider.sendMessage(message.from, `I see you want to update a site. Which one should I modify?`);
              session.sceneStep = 2; 
            }
            break;

          case 'LIST_SITES':
            await this.listSites(message, provider);
            break;

          case 'HELP':
            await this.sendHelp(message, provider);
            break;

          case 'CHAT':
            await provider.sendMessage(message.from, intent.parameters.replyText || "Hello! I'm your AI Website Builder. How can I help you today?");
            break;

          default:
            if (text.toLowerCase().startsWith('/build')) {
                session.currentScene = 'BUILD_SCENE';
                session.spec = { 
                  description: text.replace(/\/build/i, '').trim(), 
                  assets: session.spec.assets || [], 
                  features: [], 
                  theme: { primaryColor: '3b82f6', darkMode: false } 
                };
                await this.runBuildScene(message, session, provider, intent);
            } else if (text.toLowerCase().startsWith('/list')) {
                await this.listSites(message, provider);
            } else if (!session.isProcessing) {
                await provider.sendMessage(message.from, "🤖 I can help you build or update websites! Just tell me what you need.");
            }
            break;
        }
      }

      await sessionManager.saveSession(message.platform, message.from, session);
    } catch (error) {
      console.error('Error in handleMessage:', error);
      try {
        await provider.sendMessage(message.from, "⚠️ Sorry, I encountered an internal error. Please try again.");
      } catch (msgErr) {
        console.error('Failed to send error notification:', msgErr);
      }
    }
  }

  private async runBuildScene(message: IncomingMessage, session: SessionData, provider: MessagingProvider, intent: Intent): Promise<void> {
    const text = message.text?.trim() || '';
    
    // Check if user is ready to start
    if (intent.parameters.isReady || text.toLowerCase() === 'done') {
      // Fire and forget generation
      this.startGeneration(message.from, session, provider);
      return;
    }

    // Identify missing info
    const missing = [];
    if (!session.spec.name && session.spec.name !== '') missing.push('name');
    if (!session.spec.persona) missing.push('style');
    if (!session.spec.preferredSubdomain && session.spec.preferredSubdomain !== '') missing.push('subdomain');

    // If description is missing, we need it first
    if (!session.spec.description) {
      await provider.sendMessage(message.from, "Got it! Tell me more about the website you want to build.");
      return;
    }

    // If nothing is missing, or user just sent an image/text, confirm or ask to start
    if (missing.length === 0) {
      const msg = message.mediaUrl 
        ? "Got the image! Are we ready to build, or do you have more images/details to add?"
        : "I have everything I need! Ready to build, or anything else to add?";
      await provider.sendMessage(message.from, msg);
      return;
    }

    // Ask for missing info naturally
    let prompt = "";
    if (missing.includes('name') && missing.includes('style')) {
      prompt = "Great! What should we name this project? Also, what kind of design style do you prefer (e.g., Modern, Minimalist, Corporate)?";
    } else if (missing.includes('name')) {
      prompt = "Almost there! What should we name this project? (Or say 'skip' to let me choose)";
    } else if (missing.includes('style')) {
      prompt = "Got the name! What kind of design style or vibe should I use for the site?";
    } else if (missing.includes('subdomain')) {
      prompt = "One last thing: what subdomain would you prefer for the live site? (e.g. 'my-awesome-site')";
    }

    if (message.mediaUrl) {
      prompt = "Image received! " + prompt;
    }

    await provider.sendMessage(message.from, prompt);
  }

  private async runUpdateScene(message: IncomingMessage, session: SessionData, provider: MessagingProvider): Promise<void> {
    const text = message.text;
    const parts = text?.split(' ') || [];

    switch (session.sceneStep) {
      case 0:
        if (parts[0] === '/update' && parts.length >= 3) {
          session.siteId = parts[1];
          session.instruction = parts.slice(2).join(' ');
          await provider.sendMessage(message.from, 'Got instructions! Upload images or say done.');
          session.sceneStep = 1;
        } else {
          await provider.sendMessage(message.from, 'Which site to update? (ID)');
          session.sceneStep = 2;
        }
        break;
      case 1:
        if (text?.toLowerCase().includes('done')) {
          this.startUpdate(message.from, session, provider);
        } else if (message.mediaUrl) {
          await provider.sendMessage(message.from, 'Image received! More or say done.');
        } else if (text) {
          await provider.sendMessage(message.from, 'Description added. More or say done.');
        }
        break;
      case 2:
        session.siteId = text;
        await provider.sendMessage(message.from, 'What changes?');
        session.sceneStep = 3;
        break;
      case 3:
        session.instruction = text;
        await provider.sendMessage(message.from, 'Images? Upload or say done.');
        session.sceneStep = 1;
        break;
    }
  }

  private async listSites(message: IncomingMessage, provider: MessagingProvider) {
    const sites = this.workspaceManager.listSites();
    if (sites.length === 0) {
      return provider.sendMessage(message.from, "📂 No sites yet!");
    }
    let response = "📑 Your Sites:\n\n";
    sites.forEach((site, i) => {
      response += `${i + 1}. ${site.name}\n   🆔 ID: ${site.id}\n   🔗 ${site.url}\n\n`;
    });
    await provider.sendMessage(message.from, response);
  }

  private async sendHelp(message: IncomingMessage, provider: MessagingProvider) {
    await provider.sendMessage(message.from, "📖 Help:\nJust tell me what you want to build or update! For example:\n- 'Build me a site for a law firm'\n- 'Update site-xyz to fix the header'\n- 'Show me my projects'");
  }

  private async startGeneration(to: string, session: SessionData, provider: MessagingProvider) {
    if (session.isProcessing) return; // Guard
    
    session.isProcessing = true;
    await sessionManager.saveSession(session.platform, to, session);

    const spec = session.spec as SiteSpec;
    spec.name = spec.name || ''; 
    spec.description = spec.description || 'A modern website';
    
    await provider.sendMessage(to, '🚀 Starting generation... This will take a minute.');
    
    try {
      const { url, deployedUrl, expandedSpec } = await this.generationRunner.run(spec, async (status) => {
        // Only update status if session is still processing (not cancelled)
        const currentSession = await sessionManager.getSession(session.platform, to);
        if (currentSession.isProcessing) {
          await provider.sendMessage(to, `⏳ ${status}`).catch(() => {});
        } else {
          throw new Error('BUILD_CANCELLED');
        }
      });
      
      let msg = `✅ Success! "${expandedSpec.name}" is live!\n\n🔗 Preview: ${url}`;
      if (deployedUrl) msg += `\n🚀 Live URL: ${deployedUrl}`;
      await provider.sendMessage(to, msg);
    } catch (error: any) {
      if (error.message === 'BUILD_CANCELLED') {
        console.log('Build was cancelled by user.');
        return;
      }
      console.error('Generation failed:', error);
      await provider.sendMessage(to, '❌ Something went wrong during generation. Please try again soon.').catch(() => {});
    } finally {
      // Re-fetch session to check cancel flag
      const finalSession = await sessionManager.getSession(session.platform, to);
      finalSession.isProcessing = false;
      finalSession.currentScene = 'IDLE';
      finalSession.sceneStep = 0;
      await sessionManager.saveSession(session.platform, to, finalSession);
      console.log(`[Generation] Task finished for ${to}`);
    }
  }

  private async startUpdate(to: string, session: SessionData, provider: MessagingProvider) {
    if (session.isProcessing) return;

    const { siteId, instruction, spec } = session;
    const sitePath = this.workspaceManager.findSiteById(siteId!);

    if (!sitePath) {
      await provider.sendMessage(to, `❌ Site ${siteId} not found.`);
      return;
    }

    session.isProcessing = true;
    await sessionManager.saveSession(session.platform, to, session);

    await provider.sendMessage(to, `🔄 Updating ${siteId}...`);

    try {
      const { deployedUrl } = await this.generationRunner.iterate(sitePath, instruction!, async (status) => {
        const currentSession = await sessionManager.getSession(session.platform, to);
        if (currentSession.isProcessing) {
          await provider.sendMessage(to, `⏳ ${status}`).catch(() => {});
        } else {
          throw new Error('BUILD_CANCELLED');
        }
      }, spec.assets as Asset[]);
      await provider.sendMessage(to, `✅ Updated! 🚀 ${deployedUrl}`);
    } catch (error: any) {
      if (error.message === 'BUILD_CANCELLED') return;
      console.error('Update failed:', error);
      await provider.sendMessage(to, '❌ Update failed.').catch(() => {});
    } finally {
      const finalSession = await sessionManager.getSession(session.platform, to);
      finalSession.isProcessing = false;
      finalSession.currentScene = 'IDLE';
      finalSession.sceneStep = 0;
      await sessionManager.saveSession(session.platform, to, finalSession);
    }
  }

  private async handleMediaUpload(mediaSource: string, provider: MessagingProvider, prefix: string): Promise<string> {
    const buffer = await provider.downloadMedia(mediaSource);
    const fileName = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
    const filePath = path.join(UPLOADS_DIR, fileName);
    
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    await fs.writeFile(filePath, buffer);
    return filePath;
  }
}

export const coordinator = new ConversationCoordinator();
