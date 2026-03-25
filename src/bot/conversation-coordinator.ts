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
import { versionService } from '../lib/version-service.js';

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
        if (intent.type === 'CHAT' || intent.type === 'HELP' || intent.type === 'LIST_SITES' || intent.type === 'LIST_VERSIONS' || intent.type === 'CANCEL_BUILD') {
           // Proceed
        } else {
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
        session.processingId = undefined;
        session.currentScene = 'IDLE';
        await provider.sendMessage(message.from, "🛑 Generation stopped. Session reset.");
        await sessionManager.saveSession(message.platform, message.from, session);
        return;
      }

      // 6. Update session parameters
      if (!session.isProcessing && intent.parameters) {
        if (intent.parameters.projectName) session.spec.name = intent.parameters.projectName;
        if (intent.parameters.designStyle) session.spec.persona = intent.parameters.designStyle;
        if (intent.parameters.subdomain) session.spec.preferredSubdomain = intent.parameters.subdomain;
        if (intent.parameters.description && !session.spec.description) session.spec.description = intent.parameters.description;
        if (intent.parameters.instruction) {
          if (!session.instruction) session.instruction = intent.parameters.instruction;
          else if (!session.instruction.includes(intent.parameters.instruction)) session.instruction += '\n' + intent.parameters.instruction;
        }
        if (intent.parameters.siteId) session.siteId = intent.parameters.siteId;
        
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
        await this.runUpdateScene(message, session, provider, intent);
      } else {
        switch (intent.type) {
          case 'GENERATE_SITE':
            session.currentScene = 'BUILD_SCENE';
            session.spec = {
              description: intent.parameters.description || session.spec.description || '',
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
            // Try to find the site immediately if name/id provided
            const query = intent.parameters.siteId || intent.parameters.siteName;
            if (query) {
              const matches = this.workspaceManager.findSitesByQuery(query);
              if (matches.length === 1) {
                 session.sitePath = matches[0].path;
                 session.siteId = matches[0].id;
              }
            }
            await this.runUpdateScene(message, session, provider, intent);
            break;

          case 'LIST_SITES':
            await this.listSites(message, provider);
            break;

          case 'LIST_VERSIONS':
            await this.listSiteVersions(message, session, provider, intent);
            break;

          case 'REVERT_VERSION':
            await this.revertSiteVersion(message, session, provider, intent);
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
            } else if (text.toLowerCase().startsWith('/versions')) {
                await this.listSiteVersions(message, session, provider, intent);
            } else if (text.toLowerCase().startsWith('/revert')) {
                await this.revertSiteVersion(message, session, provider, intent);
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
    
    // Capture text or instruction as description if missing and it's not a generic format command
    if (!session.spec.description) {
      if (intent.parameters.description) {
        session.spec.description = intent.parameters.description;
      } else if (intent.parameters.instruction) {
        session.spec.description = intent.parameters.instruction;
      } else if (text && text.toLowerCase() !== 'done' && intent.type !== 'GENERATE_SITE' && intent.type !== 'CANCEL_BUILD' && intent.type !== 'HELP' && intent.type !== 'LIST_SITES' && !message.mediaUrl) {
        session.spec.description = text;
      }
    }

    const isReady = intent.parameters.isReady;

    if (isReady) {
      this.startGeneration(message.from, session, provider);
      return;
    }

    const missingName = !session.spec.name && session.spec.name !== '';
    const missingSubdomain = !session.spec.preferredSubdomain && session.spec.preferredSubdomain !== '';
    const hasImage = message.mediaUrl || (session.spec.assets && session.spec.assets.length > 0);

    if (!session.spec.description && !hasImage) {
      await provider.sendMessage(message.from, "Got it! Can you tell me a bit more about the website you'd like to build? You can describe it in detail or just send over a reference image.");
      return;
    }

    if (missingName || missingSubdomain) {
      const missingPieces: string[] = [];
      if (missingName) missingPieces.push('a project name');
      if (missingSubdomain) missingPieces.push('a preferred subdomain (e.g. my-awesome-site)');
      if (!hasImage) missingPieces.push('any logos or images');

      const askStr = missingPieces.length === 1 
        ? missingPieces[0] 
        : missingPieces.slice(0, -1).join(', ') + ' or ' + missingPieces[missingPieces.length - 1];
      
      let prompt = `Awesome! To help set things up, do you have ${askStr}? If you just want me to handle everything, simply reply 'done' and I'll start building.`;
      
      if (message.mediaUrl) {
        prompt = "Image received! " + prompt;
      }
      
      await provider.sendMessage(message.from, prompt);
      return;
    }

    // Auto-start if they have given a name and subdomain and didn't mention they want to provide more.
    this.startGeneration(message.from, session, provider);
  }

  private async runUpdateScene(message: IncomingMessage, session: SessionData, provider: MessagingProvider, intent: Intent): Promise<void> {
    const text = message.text?.trim() || '';

    // If session is ready to start update
    if (intent.parameters.isReady || text.toLowerCase() === 'done' || text.toLowerCase() === 'continue') {
      if (!session.sitePath) {
        await provider.sendMessage(message.from, "I'm not sure which site to update yet. Please tell me the name or ID.");
        return;
      }
      if (!session.instruction) {
        await provider.sendMessage(message.from, "What changes should I make to the site? (e.g. 'Add a contact form')");
        return;
      }
      this.startUpdate(message.from, session, provider);
      return;
    }

    // Identify the site if not yet identified
    if (!session.sitePath) {
      const query = intent.parameters.siteId || intent.parameters.siteName || text;
      if (query) {
        const matches = this.workspaceManager.findSitesByQuery(query);
        if (matches.length === 1) {
          session.sitePath = matches[0].path;
          session.siteId = matches[0].id;
          await provider.sendMessage(message.from, `🎯 Found it! Updating "${matches[0].name}". What would you like to change?`);
          return;
        } else if (matches.length > 1) {
          let msg = "I found multiple sites matching that. Which one did you mean?\n\n";
          matches.forEach(m => msg += `- ${m.name} (${m.id})\n`);
          await provider.sendMessage(message.from, msg);
          return;
        }
      }
      
      const sites = this.workspaceManager.listSites();
      if (sites.length === 0) {
        await provider.sendMessage(message.from, "📂 You don't have any sites to update yet! Try building one first.");
        session.currentScene = 'IDLE';
        return;
      }
      
      let msg = "Which site would you like to update? Here are your projects:\n\n";
      sites.forEach(s => msg += `- ${s.name} (ID: ${s.id})\n`);
      await provider.sendMessage(message.from, msg);
      return;
    }

    // Asset collection for update
    if (message.mediaUrl) {
      if (!session.instruction && !text) {
        await provider.sendMessage(message.from, "Image received for the update! What specific changes should I make with this?");
        return;
      }
    }

    // Fallback and accumulation if instruction was provided as multiple messages
    if (text && !intent.parameters.instruction) {
      if (!session.instruction) {
        session.instruction = text;
      } else if (!session.instruction.includes(text)) {
        session.instruction += '\n' + text;
      }
    }

    // Ask for instructions if STILL missing
    if (!session.instruction) {
      await provider.sendMessage(message.from, `I see we're updating site "${session.siteId}". What specific changes or additions should I make?`);
      return;
    }

    // Final confirmation
    let msg = "Got the instructions! Ready to apply the changes? (Reply 'done' to start, or add more images/instructions)";
    if (message.mediaUrl) {
      msg = "Got the image and instruction! Ready to apply the changes? (Reply 'done' to start)";
    }
    
    await provider.sendMessage(message.from, msg);
  }

  private async listSiteVersions(message: IncomingMessage, session: SessionData, provider: MessagingProvider, intent: Intent) {
    const text = message.text?.trim() || '';
    let sitePath = session.sitePath;
    let siteName = session.siteId || '';

    // Try intent parameters first, then fallback to slash command parsing
    const query = intent.parameters.siteName || intent.parameters.siteId;
    if (query) {
      const matches = this.workspaceManager.findSitesByQuery(query);
      if (matches.length === 1) {
        sitePath = matches[0].path;
        siteName = matches[0].name || matches[0].id;
      } else if (matches.length > 1) {
        let msg = "I found multiple sites. Which one did you mean?\n\n";
        matches.forEach(m => msg += `- ${m.name} (${m.id})\n`);
        await provider.sendMessage(message.from, msg);
        return;
      } else {
        await provider.sendMessage(message.from, "❌ Could not find a site matching that name.");
        return;
      }
    } else if (!sitePath) {
      // Fallback: try slash command parsing
      const parts = text.split(' ');
      if (parts.length > 1) {
        const cmdQuery = parts.slice(1).join(' ');
        const matches = this.workspaceManager.findSitesByQuery(cmdQuery);
        if (matches.length === 1) {
          sitePath = matches[0].path;
          siteName = matches[0].name || matches[0].id;
        }
      }
    }

    if (!sitePath) {
      await provider.sendMessage(message.from, "❌ Please specify a site. e.g. 'show versions of NeuronPeak' or `/versions my-site`");
      return;
    }

    const versions = await versionService.listVersions(sitePath, siteName);
    if (versions.length === 0) {
      await provider.sendMessage(message.from, `No versions found for ${siteName}. It might not have been tracked yet.`);
      return;
    }

    let response = `📑 Versions for ${siteName}:\n\n`;
    response += versions.map(v => `- ${v}`).join('\n');
    await provider.sendMessage(message.from, response);
  }

  private async revertSiteVersion(message: IncomingMessage, session: SessionData, provider: MessagingProvider, intent: Intent) {
    const text = message.text?.trim() || '';
    let sitePath = session.sitePath;
    let siteName = session.spec?.name || session.siteId || 'Site';

    // Get version from intent params or slash command
    let targetVersion = intent.parameters.version?.toLowerCase();
    if (!targetVersion) {
      const parts = text.split(' ');
      const vPart = parts.find(p => /^v\d+$/i.test(p));
      targetVersion = vPart?.toLowerCase();
    }

    if (!targetVersion || !/^v\d+$/.test(targetVersion)) {
      await provider.sendMessage(message.from, "❌ Please specify a valid version. e.g. 'revert NeuronPeak to v1'");
      return;
    }

    // Identify the site from intent params or slash command
    const siteQuery = intent.parameters.siteName || intent.parameters.siteId;
    if (siteQuery) {
      const siteMatches = this.workspaceManager.findSitesByQuery(siteQuery);
      if (siteMatches.length === 1) {
        sitePath = siteMatches[0].path;
        siteName = siteMatches[0].name || siteMatches[0].id;
      } else {
        await provider.sendMessage(message.from, "❌ Could not unambiguously find the site to revert.");
        return;
      }
    } else if (!sitePath) {
      // Fallback: try parsing slash command
      const parts = text.split(' ');
      const nonVersionParts = parts.filter(p => p !== '/revert' && !/^v\d+$/i.test(p));
      if (nonVersionParts.length > 0) {
        const cmdQuery = nonVersionParts.join(' ');
        const siteMatches = this.workspaceManager.findSitesByQuery(cmdQuery);
        if (siteMatches.length === 1) {
          sitePath = siteMatches[0].path;
          siteName = siteMatches[0].name || siteMatches[0].id;
        }
      }
    }

    if (!sitePath) {
      await provider.sendMessage(message.from, "❌ Please specify a site to revert. e.g. 'revert NeuronPeak to v1'");
      return;
    }

    if (session.isProcessing) {
      await provider.sendMessage(message.from, "⏳ I'm currently busy with another task. Please cancel it or wait until it finishes.");
      return;
    }

    session.isProcessing = true;
    session.processingId = Date.now();
    const myProcessingId = session.processingId;
    const platform = session.platform;
    const from = message.from;
    await sessionManager.saveSession(platform, from, session);

    // Fire-and-forget: don't await, attach .catch() to prevent unhandled rejections
    this.executeRevert(from, platform, myProcessingId, sitePath, targetVersion!, siteName, provider)
      .catch((err) => console.error('[GenerationRunner] Unhandled error in background revert task:', err));
  }

  private async executeRevert(to: string, platform: string, myProcessingId: number, sitePath: string, targetVersion: string, siteName: string, provider: MessagingProvider): Promise<void> {
    try {
      const { deployedUrl } = await this.generationRunner.revertAndDeploy(sitePath, targetVersion, async (status) => {
        const currentSession = await sessionManager.getSession(platform, to);
        if (currentSession.isProcessing && currentSession.processingId === myProcessingId) {
          await provider.sendMessage(to, `⏳ ${status}`).catch(() => {});
        } else {
          throw new Error('BUILD_CANCELLED');
        }
      });
      
      await provider.sendMessage(to, `✅ Successfully reverted ${siteName} to ${targetVersion}!\n\n🚀 Live URL: ${deployedUrl}`);
    } catch (e: any) {
      if (e.message === 'BUILD_CANCELLED') return;
      console.error('Revert failed:', e);
      await provider.sendMessage(to, '❌ Revert failed. Please check the version or try again.').catch(() => {});
    } finally {
      const finalSession = await sessionManager.getSession(platform, to);
      if (finalSession.processingId === myProcessingId) {
        finalSession.isProcessing = false;
        finalSession.processingId = undefined;
        finalSession.currentScene = 'IDLE';
        finalSession.sceneStep = 0;
        await sessionManager.saveSession(platform, to, finalSession);
      }
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
    if (session.isProcessing) return; 
    
    session.isProcessing = true;
    session.processingId = Date.now();
    const myProcessingId = session.processingId;
    const platform = session.platform;
    await sessionManager.saveSession(platform, to, session);

    const spec = session.spec as SiteSpec;
    spec.name = spec.name || ''; 
    spec.description = spec.description || 'A modern website';
    
    await provider.sendMessage(to, '🚀 Starting generation... This will take a minute.');
    
    // Fire-and-forget: don't await, attach .catch() to prevent unhandled rejections
    this.executeGeneration(to, platform, myProcessingId, spec, provider)
      .catch((err) => console.error('[GenerationRunner] Unhandled error in background generation task:', err));
  }

  private async executeGeneration(to: string, platform: string, myProcessingId: number, spec: SiteSpec, provider: MessagingProvider): Promise<void> {
    try {
      const { url, deployedUrl, expandedSpec, version } = await this.generationRunner.run(spec, async (status) => {
        const currentSession = await sessionManager.getSession(platform, to);
        if (currentSession.isProcessing && currentSession.processingId === myProcessingId) {
          await provider.sendMessage(to, `⏳ ${status}`).catch(() => {});
        } else {
          throw new Error('BUILD_CANCELLED');
        }
      });
      
      let msg = `✅ Success! "${expandedSpec.name}" is live!`;
      if (version) msg += `\n📦 Version: ${version}`;
      msg += `\n\n🔗 Preview: ${url}`;
      if (deployedUrl) msg += `\n🚀 Live URL: ${deployedUrl}`;
      await provider.sendMessage(to, msg);
    } catch (error: any) {
      if (error.message === 'BUILD_CANCELLED') return;
      console.error('Generation failed:', error);
      await provider.sendMessage(to, '❌ Something went wrong during generation. Please try again soon.').catch(() => {});
    } finally {
      const finalSession = await sessionManager.getSession(platform, to);
      if (finalSession.processingId === myProcessingId) {
        finalSession.isProcessing = false;
        finalSession.processingId = undefined;
        finalSession.currentScene = 'IDLE';
        finalSession.sceneStep = 0;
        await sessionManager.saveSession(platform, to, finalSession);
      }
    }
  }

  private async startUpdate(to: string, session: SessionData, provider: MessagingProvider) {
    if (session.isProcessing) return;

    const { sitePath, instruction, spec } = session;
    if (!sitePath) {
      await provider.sendMessage(to, "❌ No site identified for update.");
      return;
    }

    session.isProcessing = true;
    session.processingId = Date.now();
    const myProcessingId = session.processingId;
    const platform = session.platform;
    await sessionManager.saveSession(platform, to, session);

    await provider.sendMessage(to, `🔄 Updating your site...`);

    // Fire-and-forget: don't await, attach .catch() to prevent unhandled rejections
    this.executeUpdate(to, platform, myProcessingId, sitePath, instruction!, spec.assets as Asset[], provider)
      .catch((err) => console.error('[GenerationRunner] Unhandled error in background update task:', err));
  }

  private async executeUpdate(to: string, platform: string, myProcessingId: number, sitePath: string, instruction: string, assets: Asset[], provider: MessagingProvider): Promise<void> {
    try {
      const { deployedUrl, version } = await this.generationRunner.iterate(sitePath, instruction, async (status) => {
        const currentSession = await sessionManager.getSession(platform, to);
        if (currentSession.isProcessing && currentSession.processingId === myProcessingId) {
          await provider.sendMessage(to, `⏳ ${status}`).catch(() => {});
        } else {
          throw new Error('BUILD_CANCELLED');
        }
      }, assets);
      let msg = `✅ Updated!`;
      if (version) msg += ` 📦 Version: ${version}`;
      msg += ` 🚀 ${deployedUrl}`;
      await provider.sendMessage(to, msg);
    } catch (error: any) {
      if (error.message === 'BUILD_CANCELLED') return;
      console.error('Update failed:', error);
      await provider.sendMessage(to, '❌ Update failed.').catch(() => {});
    } finally {
      const finalSession = await sessionManager.getSession(platform, to);
      if (finalSession.processingId === myProcessingId) {
        finalSession.isProcessing = false;
        finalSession.processingId = undefined;
        finalSession.currentScene = 'IDLE';
        finalSession.sceneStep = 0;
        finalSession.instruction = undefined;
        await sessionManager.saveSession(platform, to, finalSession);
      }
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
