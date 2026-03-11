import { Telegraf, Scenes, session } from 'telegraf';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import { GenerationRunner } from './generation-runner.js';
import { SiteSpec, Asset } from './types.js';

dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('BOT_TOKEN must be provided!');
}

interface MySceneSession extends Scenes.WizardSessionData {
  spec: Partial<SiteSpec>;
}

interface MyContext extends Scenes.WizardContext<MySceneSession> {
}

const buildScene = new Scenes.WizardScene<MyContext>(
  'BUILD_SCENE',
  async (ctx) => {
    const text = (ctx.message as any)?.text;
    const prompt = text?.startsWith('/build') ? text.split(' ').slice(1).join(' ') : text;
    
    ctx.scene.session.spec = {
      description: prompt || '',
      assets: [],
      features: ['Modern UI', 'Responsive Design', 'Fast Performance'],
      theme: {
        primaryColor: '3b82f6',
        darkMode: false,
      }
    };

    if (!ctx.scene.session.spec.description) {
      await ctx.reply('What would you like to build? (e.g., "A modern law firm landing page")');
      return ctx.wizard.next();
    }
    
    await ctx.reply('Cool! What should we call this project? (Type a name or /skip)');
    return ctx.wizard.selectStep(2);
  },
  async (ctx) => {
    ctx.scene.session.spec.description = (ctx.message as any)?.text;
    await ctx.reply('Cool! What should we call this project? (Type a name or /skip)');
    return ctx.wizard.next();
  },
  async (ctx) => {
    const name = (ctx.message as any)?.text;
    if (name && name !== '/skip') {
      ctx.scene.session.spec.name = name;
    }
    await ctx.reply('Preferred deployment URL? (e.g., "my-awesome-site" for my-awesome-site.netlify.app or /skip)');
    return ctx.wizard.next();
  },
  async (ctx) => {
    const subdomain = (ctx.message as any)?.text;
    if (subdomain && subdomain !== '/skip') {
      ctx.scene.session.spec.preferredSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
    }
    await ctx.reply('Got it. Now, do you have a logo? You can upload an image file, or describe what kind of logo you want (text). Or /skip');
    return ctx.wizard.next();
  },
  async (ctx) => {
    const message = ctx.message as any;
    if (message.photo) {
      const fileId = message.photo[message.photo.length - 1].file_id;
      const fileUrl = await ctx.telegram.getFileLink(fileId);
      ctx.scene.session.spec.assets?.push({
        type: 'logo',
        source: 'file',
        content: fileUrl.toString(),
      });
      await ctx.reply('Logo received! Any other images you want to add? Upload them one by one, or describe them. Send /done when you are ready to build.');
    } else if (message.text && message.text !== '/skip') {
      ctx.scene.session.spec.assets?.push({
        type: 'logo',
        source: 'text',
        content: message.text,
      });
      await ctx.reply('Description saved. Any other images? Upload them or describe them. Send /done to finish.');
    } else {
      await ctx.reply('No logo. Any other images? Upload them or describe them. Send /done to finish.');
    }
    return ctx.wizard.next();
  },
  async (ctx) => {
    const message = ctx.message as any;
    if (message.text === '/done') {
      return startGeneration(ctx);
    }

    if (message.photo) {
      const fileId = message.photo[message.photo.length - 1].file_id;
      const fileUrl = await ctx.telegram.getFileLink(fileId);
      ctx.scene.session.spec.assets?.push({
        type: 'image',
        source: 'file',
        content: fileUrl.toString(),
      });
      await ctx.reply('Image added! Add more or send /done.');
    } else if (message.text && message.text !== '/done') {
      ctx.scene.session.spec.assets?.push({
        type: 'image',
        source: 'text',
        content: message.text,
      });
      await ctx.reply('Image description added! Add more or send /done.');
    }
    return;
  },
  async (ctx) => {
    return startGeneration(ctx);
  }
);

async function startGeneration(ctx: MyContext) {
  const spec = ctx.scene.session.spec as SiteSpec;
  spec.name = spec.name || spec.description.split(' ').slice(0, 2).join(' ') || 'My Site';
  
  await ctx.reply('🚀 All set! Starting generation... This will take a minute.');
  
  const generationRunner = new GenerationRunner();
  const chatId = ctx.chat?.id;
  if (!chatId) return ctx.scene.leave();

  // Run in background
  (async () => {
    let progressMessageId: number | undefined;
    const updateStatus = async (status: string) => {
      try {
        if (!progressMessageId) {
          const msg = await ctx.reply(status);
          progressMessageId = msg.message_id;
        } else {
          await ctx.telegram.editMessageText(chatId, progressMessageId, undefined, status);
        }
      } catch (e) { console.warn('Status update failed', e); }
    };

    try {
      const { sitePath, url, deployedUrl, expandedSpec } = await generationRunner.run(spec, updateStatus);
      
      let successMessage = `✅ Success! "${expandedSpec.name}" is live!\n\n🔗 Preview: ${url}`;
      if (deployedUrl) successMessage += `\n🚀 Live URL: ${deployedUrl}`;
      successMessage += `\n\nI've set up everything for you!`;
      
      await ctx.reply(successMessage);
    } catch (error) {
      console.error('Generation failed:', error);
      await ctx.reply('❌ Sorry, something went wrong.');
    }
  })();

  return ctx.scene.leave();
}

const bot = new Telegraf<MyContext>(token);
const stage = new Scenes.Stage<MyContext>([buildScene]);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => ctx.reply('Welcome! Send /build to start building your React website.'));
bot.command('build', (ctx) => ctx.scene.enter('BUILD_SCENE'));

bot.launch().then(() => console.log('Bot is running...'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
