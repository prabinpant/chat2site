import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import path from 'path';
import { GenerationRunner } from './generation-runner.js';

dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(token);
const generationRunner = new GenerationRunner();

bot.start((ctx) => ctx.reply('Welcome! Send /build <your-prompt> to start building your React website.'));

bot.command('build', async (ctx) => {
  const prompt = ctx.message.text.split(' ').slice(1).join(' ');
  if (!prompt) {
    return ctx.reply('Please provide a prompt! Example: /build a clean landing page for a startup');
  }

  // Acknowledge immediately to avoid Telegram/Middleware timeouts
  await ctx.reply(`🚀 Starting generation for: "${prompt}"...\nThis may take a minute or two. I'll notify you when it's ready!`);

  // Run in background
  (async () => {
    let progressMessageId: number | undefined;

    const updateStatus = async (status: string) => {
      try {
        if (!progressMessageId) {
          const msg = await ctx.reply(status);
          progressMessageId = msg.message_id;
        } else {
          await ctx.telegram.editMessageText(ctx.chat.id, progressMessageId, undefined, status);
        }
      } catch (e) {
        console.warn('Failed to update status message', e);
      }
    };

    try {
      // For now, parsing a simple prompt into a spec
      const spec = {
        name: prompt.split(' ').slice(0, 2).join(' ') || 'My Site',
        description: prompt,
        features: ['Modern UI', 'Responsive Design', 'Fast Performance'],
        theme: {
          primaryColor: '3b82f6', // default blue
          darkMode: false,
        }
      };

      const { sitePath, url, deployedUrl } = await generationRunner.run(spec, updateStatus);
      
      const absolutePath = path.resolve(sitePath);
      let successMessage = `✅ Success! Your site is live!\n\n🔗 Local Preview: ${url}\n📂 Local Path: ${absolutePath}`;
      
      if (deployedUrl) {
        successMessage += `\n🚀 Netlify URL: ${deployedUrl}`;
      }
      
      successMessage += `\n\nI've already installed dependencies and started the dev server for you!`;
      await ctx.reply(successMessage);
    } catch (error) {
      console.error('Generation failed:', error);
      await ctx.reply('❌ Sorry, something went wrong during generation. Check the logs for details.');
    }
  })();
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

console.log('Bot is running...');
