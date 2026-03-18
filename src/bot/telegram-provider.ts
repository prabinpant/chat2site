import { Telegraf } from 'telegraf';
import { MessagingProvider, MessageContent } from './messaging-service.js';

export class TelegramProvider implements MessagingProvider {
  constructor(private bot: Telegraf<any>) {}

  async sendMessage(to: string, content: string | MessageContent): Promise<void> {
    if (typeof content === 'string') {
      await this.bot.telegram.sendMessage(to, content);
    } else {
      if (content.text) {
        await this.bot.telegram.sendMessage(to, content.text);
      }
      if (content.mediaUrl) {
        if (content.mediaType === 'photo') {
          await this.bot.telegram.sendPhoto(to, content.mediaUrl);
        } else {
          await this.bot.telegram.sendDocument(to, content.mediaUrl);
        }
      }
    }
  }

  async downloadMedia(mediaId: string): Promise<Buffer> {
    try {
      let url: string;
      if (mediaId.startsWith('http')) {
        url = mediaId;
      } else {
        const link = await this.bot.telegram.getFileLink(mediaId);
        url = link.toString();
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to download media: ${response.statusText}`);
      
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      console.error('Error in TelegramProvider.downloadMedia:', error);
      throw error;
    }
  }
}
