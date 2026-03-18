import { IncomingMessage, MessagingProvider, SessionData } from './messaging-service.js';
import { sessionManager } from './session-manager.js';
import { GenerationRunner } from './generation-runner.js';
import { WorkspaceManager } from './workspace-manager.js';
import { SiteSpec, Asset } from './types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { intentService } from '../lib/intent-service.js';
import { transcriptionService } from '../lib/transcription-service.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(process.cwd(), 'temp-uploads');

export class ConversationCoordinator {
  private generationRunner = new GenerationRunner();
  private workspaceManager = new WorkspaceManager();

  async handleMessage(message: IncomingMessage, provider: MessagingProvider): Promise<void> {
    const session = await sessionManager.getSession(message.platform, message.from);
    
    // If it's a voice message, transcribe it first
    if (message.voiceId) {
      try {
        const audioBuffer = await provider.downloadMedia(message.voiceId);
        const tempPath = path.join(UPLOADS_DIR, `voice_${Date.now()}_${message.from}.ogg`);
        await fs.mkdir(UPLOADS_DIR, { recursive: true });
        await fs.writeFile(tempPath, audioBuffer);
        
        const transcribedText = await transcriptionService.transcribe(tempPath);
        message.text = transcribedText;
        
        // Cleanup temp file
        await fs.unlink(tempPath).catch(e => console.error('Failed to unlink temp voice file:', e));
      } catch (error) {
        console.error('Transcription failed:', error);
        await provider.sendMessage(message.from, "⚠️ I heard your voice message but couldn't transcribe it. Could you please type it instead?");
        return;
      }
    }

    const text = message.text?.trim() || '';

    // If an active scene is running, prioritize its flow
    if (session.currentScene === 'BUILD_SCENE') {
      await this.runBuildScene(message, session, provider);
      await sessionManager.saveSession(message.platform, message.from, session);
      return;
    }

    if (session.currentScene === 'UPDATE_SCENE') {
      await this.runUpdateScene(message, session, provider);
      await sessionManager.saveSession(message.platform, message.from, session);
      return;
    }

    // New conversation / No active scene: Use Intent Classification
    const intent = await intentService.classify(text);
    console.log(`[Intent] Classified as: ${intent.type} (confidence: ${intent.confidence})`);

    switch (intent.type) {
      case 'GENERATE_SITE':
        session.currentScene = 'BUILD_SCENE';
        session.sceneStep = 0;
        session.spec = {
          description: intent.parameters.description || text,
          assets: [],
          features: ['Modern UI', 'Responsive Design', 'Fast Performance'],
          theme: { primaryColor: '3b82f6', darkMode: false }
        };
        await provider.sendMessage(message.from, `✨ Sure! I can help you build that.`);
        await this.runBuildScene(message, session, provider);
        break;

      case 'UPDATE_SITE':
        session.currentScene = 'UPDATE_SCENE';
        session.sceneStep = 0;
        session.siteId = intent.parameters.siteId;
        session.instruction = intent.parameters.instruction;
        session.spec = { assets: [] };
        
        if (session.siteId && session.instruction) {
          await provider.sendMessage(message.from, `🔄 Okay, updating site ${session.siteId}...`);
          await this.runUpdateScene(message, session, provider);
        } else {
          await provider.sendMessage(message.from, `I see you want to update a site. Which one should I modify?`);
          session.sceneStep = 2; // Jump to siteId collection
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
        // Handle explicit commands as fallback
        if (text.startsWith('/build')) {
            session.currentScene = 'BUILD_SCENE';
            session.sceneStep = 0;
            session.spec = { description: text.replace('/build', '').trim(), assets: [], features: [], theme: { primaryColor: '3b82f6', darkMode: false } };
            await this.runBuildScene(message, session, provider);
        } else if (text.startsWith('/list')) {
            await this.listSites(message, provider);
        } else {
            await provider.sendMessage(message.from, "🤖 I can help you build or update websites! Just tell me what you need.");
        }
        break;
    }

    await sessionManager.saveSession(message.platform, message.from, session);
  }

  private async runBuildScene(message: IncomingMessage, session: SessionData, provider: MessagingProvider): Promise<void> {
    const text = message.text;
    
    switch (session.sceneStep) {
      case 0: // Collect description
        if (!session.spec.description) {
          await provider.sendMessage(message.from, 'What would you like to build? (e.g., "A modern law firm landing page")');
          session.sceneStep = 1;
        } else {
          await this.showPersonaMenu(message.from, provider);
          session.sceneStep = 2;
        }
        break;
      case 1: // Handle description input
        session.spec.description = text || '';
        await this.showPersonaMenu(message.from, provider);
        session.sceneStep = 2;
        break;
      case 2: // Handle persona selection
        session.spec.persona = text || 'Modern';
        await provider.sendMessage(message.from, `Selected Style: ${session.spec.persona}. What should we call this project?`);
        session.sceneStep = 3;
        break;
      case 3: // Collect name
        session.spec.name = text || 'My Site';
        await provider.sendMessage(message.from, 'Preferred deployment URL? (or say skip)');
        session.sceneStep = 4;
        break;
      case 4: // Collect subdomain
        if (text && !text.toLowerCase().includes('skip')) {
          session.spec.preferredSubdomain = text.toLowerCase().replace(/[^a-z0-9-]/g, '');
        }
        await provider.sendMessage(message.from, 'Got it. Now, do you have a logo? Send an image or description. Or say skip');
        session.sceneStep = 5;
        break;
      case 5: // Handle logo
        if (message.mediaUrl) {
          const localPath = await this.handleMediaUpload(message.mediaUrl, provider, 'logo');
          session.spec.assets?.push({ type: 'logo', source: 'file', content: localPath });
          await provider.sendMessage(message.from, 'Logo received! Any other images? Send them or say done.');
        } else if (text && !text.toLowerCase().includes('skip')) {
          session.spec.assets?.push({ type: 'logo', source: 'text', content: text });
          await provider.sendMessage(message.from, 'Description saved. Any other images? Send them or say done.');
        } else {
          await provider.sendMessage(message.from, 'No logo. Any other images? Send them or say done.');
        }
        session.sceneStep = 6;
        break;
      case 6: // Handle additional images
        if (text?.toLowerCase().includes('done')) {
          await this.startGeneration(message.from, session, provider);
        } else if (message.mediaUrl) {
          const localPath = await this.handleMediaUpload(message.mediaUrl, provider, 'image');
          session.spec.assets?.push({ type: 'image', source: 'file', content: localPath });
          await provider.sendMessage(message.from, 'Image added! Add more or say done.');
        } else if (text) {
          session.spec.assets?.push({ type: 'image', source: 'text', content: text });
          await provider.sendMessage(message.from, 'Image description added! Add more or say done.');
        }
        break;
    }
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
      case 1: // Image collection
        if (text?.toLowerCase().includes('done')) {
          await this.startUpdate(message.from, session, provider);
        } else if (message.mediaUrl) {
          const localPath = await this.handleMediaUpload(message.mediaUrl, provider, 'update');
          session.spec.assets?.push({ type: 'image', source: 'file', content: localPath });
          await provider.sendMessage(message.from, 'Image received! More or say done.');
        } else if (text) {
          session.spec.assets?.push({ type: 'image', source: 'text', content: text });
          await provider.sendMessage(message.from, 'Description added. More or say done.');
        }
        break;
      case 2: // Collect siteId if not in command
        session.siteId = text;
        await provider.sendMessage(message.from, 'What changes?');
        session.sceneStep = 3;
        break;
      case 3: // Collect instruction
        session.instruction = text;
        await provider.sendMessage(message.from, 'Images? Upload or say done.');
        session.sceneStep = 1;
        break;
    }
  }

  private async showPersonaMenu(to: string, provider: MessagingProvider) {
    await provider.sendMessage(to, '🎨 Choose a Design Style: Minimalist, Cyberpunk, Corporate, Modern, Retro, Eco-Friendly, Luxury, SaaS, or any other vibe you prefer.');
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
    const spec = session.spec as SiteSpec;
    spec.name = spec.name || spec.description.split(' ').slice(0, 2).join(' ') || 'My Site';
    
    await provider.sendMessage(to, '🚀 Starting generation... This will take a minute.');
    
    try {
      const { url, deployedUrl, expandedSpec } = await this.generationRunner.run(spec, async (status) => {
        await provider.sendMessage(to, `⏳ ${status}`);
      });
      
      let msg = `✅ Success! "${expandedSpec.name}" is live!\n\n🔗 Preview: ${url}`;
      if (deployedUrl) msg += `\n🚀 Live URL: ${deployedUrl}`;
      await provider.sendMessage(to, msg);
    } catch (error) {
      await provider.sendMessage(to, '❌ Something went wrong.');
    }
    
    session.currentScene = 'IDLE';
    session.sceneStep = 0;
  }

  private async startUpdate(to: string, session: SessionData, provider: MessagingProvider) {
    const { siteId, instruction, spec } = session;
    const sitePath = this.workspaceManager.findSiteById(siteId!);

    if (!sitePath) {
      await provider.sendMessage(to, `❌ Site ${siteId} not found.`);
      return;
    }

    await provider.sendMessage(to, `🔄 Updating ${siteId}...`);

    try {
      const { deployedUrl } = await this.generationRunner.iterate(sitePath, instruction!, async (status) => {
        await provider.sendMessage(to, `⏳ ${status}`);
      }, spec.assets as Asset[]);
      await provider.sendMessage(to, `✅ Updated! 🚀 ${deployedUrl}`);
    } catch (error) {
      await provider.sendMessage(to, '❌ Update failed.');
    }
    session.currentScene = 'IDLE';
    session.sceneStep = 0;
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
