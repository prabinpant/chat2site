import { Telegraf, Scenes, session } from 'telegraf';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import { GenerationRunner } from './generation-runner.js';
import { WorkspaceManager } from './workspace-manager.js';
import { SiteSpec, Asset } from './types.js';

dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('BOT_TOKEN must be provided!');
}

interface MySceneSession extends Scenes.WizardSessionData {
  spec: Partial<SiteSpec>;
  siteId?: string;
  instruction?: string;
}

interface MyContext extends Scenes.WizardContext<MySceneSession> {
}

const showPersonaMenu = async (ctx: MyContext, isRefined: boolean = false) => {
  const message = isRefined 
    ? '✨ Great assets! Now, let\'s refine your Design Persona to perfectly match your logo and images:'
    : '🎨 Choose a Design Persona for your site:';
  
  await ctx.reply(message, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Minimalist 🕊️', callback_data: 'Minimalist' }, { text: 'Cyberpunk 🌆', callback_data: 'Cyberpunk' }],
        [{ text: 'Corporate 🏢', callback_data: 'Corporate' }, { text: 'Modern ⚡', callback_data: 'Modern' }],
        [{ text: 'Retro 80s 📼', callback_data: 'Retro 80s' }, { text: 'Eco-Friendly 🌿', callback_data: 'Eco-Friendly' }],
        [{ text: 'Luxury ✨', callback_data: 'Luxury' }, { text: 'SaaS Layout 💻', callback_data: 'SaaS Landing' }],
        [{ text: 'Standard (None) 🚫', callback_data: 'None' }]
      ]
    }
  });
  return ctx.wizard.next();
};

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
    
    return showPersonaMenu(ctx);
  },
  async (ctx) => {
    // If we're here, it's because description was missing. Collect it.
    const text = (ctx.message as any)?.text;
    if (text) {
      ctx.scene.session.spec.description = text;
    }
    return showPersonaMenu(ctx);
  },
  async (ctx) => {
    // Handle both message text and callback query for persona selection
    let selection = '';
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      selection = ctx.callbackQuery.data;
      await ctx.answerCbQuery();
    } else if (ctx.message && 'text' in ctx.message) {
      selection = ctx.message.text;
    }

    if (selection && selection !== 'None') {
      ctx.scene.session.spec.persona = selection;
    }

    await ctx.reply(`Selected Style: ${selection || 'Standard'}\n\nWhat should we call this project?`, {
      reply_markup: { remove_keyboard: true }
    });
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
      return showPersonaMenu(ctx, true);
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
    // Handle refined persona selection
    let selection = '';
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      selection = ctx.callbackQuery.data;
      await ctx.answerCbQuery();
    } else if (ctx.message && 'text' in ctx.message) {
      selection = ctx.message.text;
    }

    if (selection && selection !== 'None') {
      ctx.scene.session.spec.persona = selection;
    }

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

async function startUpdate(ctx: MyContext) {
  const { siteId, instruction, spec } = ctx.scene.session;
  if (!siteId || !instruction) return ctx.scene.leave();

  const workspaceManager = new WorkspaceManager();
  const sitePath = workspaceManager.findSiteById(siteId);

  if (!sitePath) {
    await ctx.reply(`❌ Could not find a site with ID "${siteId}".`);
    return ctx.scene.leave();
  }

  await ctx.reply(`🔄 Starting update for "${siteId}"...\nInstruction: ${instruction}${spec.assets?.length ? ` (+ ${spec.assets.length} new images)` : ''}`);

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
      const { deployedUrl } = await generationRunner.iterate(sitePath, instruction, updateStatus, spec.assets as Asset[]);
      await ctx.reply(`✅ Successfully updated "${siteId}"!\n🚀 Live URL: ${deployedUrl}`);
    } catch (error) {
      console.error('Update failed:', error);
      await ctx.reply('❌ Sorry, the update failed.');
    }
  })();

  return ctx.scene.leave();
}

const updateScene = new Scenes.WizardScene<MyContext>(
  'UPDATE_SCENE',
  async (ctx) => {
    const text = (ctx.message as any)?.text || '';
    const parts = text.split(' ');
    
    // Check if siteId was passed via /update <siteId> <instr>
    if (parts[0] === '/update' && parts.length >= 3) {
      ctx.scene.session.siteId = parts[1];
      ctx.scene.session.instruction = parts.slice(2).join(' ');
      ctx.scene.session.spec = { assets: [] };
      await ctx.reply('Got the instructions! Do you want to upload any images for this update? Send them now, or send /done to proceed with just the text.');
      return ctx.wizard.next();
    }

    await ctx.reply('Which site would you like to update? (Provide the ID, e.g., "my-site")');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!ctx.scene.session.siteId) {
      ctx.scene.session.siteId = (ctx.message as any)?.text;
      await ctx.reply('What changes would you like to make?');
      return ctx.wizard.next();
    }
    // If we're here, we are already in asset collection
    return handleUpdateAsset(ctx);
  },
  async (ctx) => {
    if (!ctx.scene.session.instruction) {
      ctx.scene.session.instruction = (ctx.message as any)?.text;
      ctx.scene.session.spec = { assets: [] };
      await ctx.reply('Images to add? Upload them now or send /done to finish.');
      return ctx.wizard.next();
    }
    return handleUpdateAsset(ctx);
  },
  async (ctx) => {
    return handleUpdateAsset(ctx);
  }
);

async function handleUpdateAsset(ctx: MyContext) {
  const message = ctx.message as any;
  if (message?.text === '/done') {
    return startUpdate(ctx);
  }

  if (message?.photo) {
    const fileId = message.photo[message.photo.length - 1].file_id;
    const fileUrl = await ctx.telegram.getFileLink(fileId);
    ctx.scene.session.spec.assets?.push({
      type: 'image',
      source: 'file',
      content: fileUrl.toString(),
    });
    await ctx.reply(`Image ${ctx.scene.session.spec.assets?.length} received! Send more or /done.`);
  } else if (message?.text) {
    ctx.scene.session.spec.assets?.push({
      type: 'image',
      source: 'text',
      content: message.text,
    });
    await ctx.reply('Image description added. Send more or /done.');
  }
  return;
}

const bot = new Telegraf<MyContext>(token);
const stage = new Scenes.Stage<MyContext>([buildScene, updateScene]);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => ctx.reply('Welcome! Send /build to start building your React website. Use /update <siteId> <instructions> to modify a site.'));
bot.command('build', (ctx) => ctx.scene.enter('BUILD_SCENE'));

bot.command('help', (ctx) => {
  ctx.reply(
    '📖 **Help Guide**\n\n' +
    '🚀 `/build` - Start the interactive builder. You\'ll pick a design persona, provide a description, and can upload a logo/images.\n\n' +
    '🔄 `/update <siteId> <instructions>` - Modify an existing site. **NEW:** After sending your instructions, you can upload new images to be added to the project!\n\n' +
    '📑 `/list` - See all your generated sites and their IDs.\n\n' +
    '💡 **Tip**: When updating, you can send multiple images and finish with `/done`.',
    { parse_mode: 'Markdown' }
  );
});

bot.command('list', async (ctx) => {
  const workspaceManager = new WorkspaceManager();
  const sites = workspaceManager.listSites();

  if (sites.length === 0) {
    return ctx.reply('📂 You haven\'t built any sites yet! Use /build to get started.');
  }

  let message = '📑 Your Sites:\n\n';
  sites.forEach((site, i) => {
    message += `${i + 1}. **${site.name}**\n   🆔 ID: \`${site.id}\`\n   🔗 ${site.url}\n\n`;
  });

  message += 'You can use `/update <siteId> <instructions>` to modify any of these.';
  await ctx.reply(message, { parse_mode: 'Markdown' });
});

bot.command('update', (ctx) => ctx.scene.enter('UPDATE_SCENE'));

// Fallback for irrelevant messages or commands
bot.on('message', (ctx) => {
  // Only reply if we are not in an active scene
  if (!ctx.scene.current) {
    ctx.reply(
      "🤖 I'm sorry, I didn't quite get that.\n\n" +
      "Here's how you can use me:\n" +
      "🚀 /build - Create a new React website (supports personas & images)\n" +
      "🔄 /update <siteId> - Modify a site (supports text + image uploads)\n" +
      "📑 /list - See all your generated sites\n" +
      "❓ /help - Get detailed command info\n\n" +
      "Try sending /build to start your first project!",
      { parse_mode: 'Markdown' }
    );
  }
});

bot.launch().then(() => console.log('Bot is running...'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
