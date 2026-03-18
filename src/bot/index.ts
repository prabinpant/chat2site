import '../lib/config.js'; // MUST BE FIRST: Loads env vars
import { Telegraf } from 'telegraf';
import { TelegramProvider } from './telegram-provider.js';
import { coordinator } from './conversation-coordinator.js';
import { IncomingMessage } from './messaging-service.js';
import './webhook-server.js'; // Starts the WhatsApp webhook server
import { config } from '../lib/config.js';

const token = config.botToken;
if (!token) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(token);
const telegramProvider = new TelegramProvider(bot);

bot.on('message', async (ctx) => {
  try {
    const message = ctx.message as any;
    const incoming: IncomingMessage = {
      from: ctx.chat.id.toString(),
      text: message.text,
      platform: 'telegram',
      messageId: ctx.message.message_id.toString(),
      timestamp: ctx.message.date,
    };

    if (message.photo) {
      // Store the largest photo's file_id
      const fileId = message.photo[message.photo.length - 1].file_id;
      incoming.mediaUrl = fileId; // Store file_id, not the link
      incoming.mediaType = 'photo';
    } else if (message.voice) {
      incoming.voiceId = message.voice.file_id;
      incoming.voiceType = 'voice';
    } else if (message.audio) {
      incoming.voiceId = message.audio.file_id;
      incoming.voiceType = 'audio';
    }

    await coordinator.handleMessage(incoming, telegramProvider);
  } catch (error) {
    console.error('Error processing Telegram message:', error);
    // Optionally notify the user via provider if possible, but keep the bot running
  }
});

bot.launch().then(() => console.log('Telegram bot is running...'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Global error handlers to prevent process exit on background failures
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
