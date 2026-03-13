import twilio from 'twilio';
import { MessagingProvider, MessageContent } from './messaging-service.js';

export class WhatsAppProvider implements MessagingProvider {
  private client: twilio.Twilio;
  private from: string;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    this.from = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'; // Default Twilio Sandbox number

    if (!accountSid || !authToken) {
      throw new Error('TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN must be provided!');
    }

    this.client = twilio(accountSid, authToken);
  }

  async sendMessage(to: string, content: string | MessageContent): Promise<void> {
    const recipient = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
    
    if (typeof content === 'string') {
      await this.client.messages.create({
        body: content,
        from: this.from,
        to: recipient,
      });
    } else {
      await this.client.messages.create({
        body: content.text,
        mediaUrl: content.mediaUrl ? [content.mediaUrl] : undefined,
        from: this.from,
        to: recipient,
      });
    }
  }

  async downloadMedia(mediaUrl: string): Promise<Buffer> {
    // For WhatsApp/Twilio, the mediaId is usually a full URL or we use the URL directly
    const response = await fetch(mediaUrl, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')}`
      }
    });
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
}
