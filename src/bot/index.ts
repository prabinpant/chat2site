import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { TelegramProvider } from './telegram-provider.js';
import { coordinator } from './conversation-coordinator.js';
import { IncomingMessage } from './messaging-service.js';
import './webhook-server.js'; // Starts the WhatsApp webhook server

dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(token);
const telegramProvider = new TelegramProvider(bot);

bot.on('message', async (ctx) => {
  const message = ctx.message as any;
  const incoming: IncomingMessage = {
    from: ctx.chat.id.toString(),
    text: message.text,
    platform: 'telegram',
    messageId: ctx.message.message_id.toString(),
    timestamp: ctx.message.date,
  };

  if (message.photo) {
    const fileId = message.photo[message.photo.length - 1].file_id;
    const fileLink = await ctx.telegram.getFileLink(fileId);
    incoming.mediaUrl = fileLink.toString();
    incoming.mediaType = 'photo';
  }

  await coordinator.handleMessage(incoming, telegramProvider);
});

bot.launch().then(() => console.log('Telegram bot is running...'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
