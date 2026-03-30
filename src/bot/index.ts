import '../lib/config.js'; // MUST BE FIRST: Loads env vars
import { Telegraf } from 'telegraf';
import { TelegramProvider } from './telegram-provider.js';
import { coordinator } from './conversation-coordinator.js';
import { IncomingMessage } from './messaging-service.js';
import './webhook-server.js'; // Starts the WhatsApp webhook server
import { config } from '../lib/config.js';
import dns from 'dns';

// DNS Override to bypass poisoning
const TELEGRAM_IP = '149.154.166.110';
const originalLookup = dns.lookup;
(dns as any).lookup = (hostname: string, options: any, callback: any) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  if (hostname === 'api.telegram.org') {
    if (options?.all) {
      return callback(null, [{ address: TELEGRAM_IP, family: 4 }]);
    }
    return callback(null, TELEGRAM_IP, 4);
  }
  return originalLookup(hostname, options, callback);
};

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
      text: message.text || message.caption,
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

// Global error handlers to prevent process exit on background failures.
// These are the last line of defense — errors should be caught closer to the source.
process.on('unhandledRejection', (reason, promise) => {
  console.error(`[${new Date().toISOString()}] [WARN] Unhandled Rejection — server staying alive.`, reason);
});

process.on('uncaughtException', (error) => {
  console.error(`[${new Date().toISOString()}] [ERROR] Uncaught Exception — server staying alive.`, error);
  // Intentionally NOT calling process.exit() — the bot must stay alive.
});
