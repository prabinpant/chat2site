import { MessagingProvider, MessageContent } from './messaging-service.js';
import { config } from '../lib/config.js';

export class WhatsAppProvider implements MessagingProvider {
  private accessToken: string;
  private phoneNumberId: string;
  private version: string;

  constructor() {
    this.accessToken = config.whatsappAccessToken || '';
    this.phoneNumberId = config.whatsappPhoneNumberId || '';
    this.version = config.whatsappApiVersion || 'v22.0';

    if (!this.accessToken || !this.phoneNumberId) {
      throw new Error('WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID must be provided!');
    }
  }

  async sendMessage(to: string, content: string | MessageContent): Promise<void> {
    const recipient = to.replace('whatsapp:', '').replace('+', '');
    const url = `https://graph.facebook.com/${this.version}/${this.phoneNumberId}/messages`;

    let body: any = {
      messaging_product: 'whatsapp',
      to: recipient,
    };

    if (typeof content === 'string') {
      body.type = 'text';
      body.text = { body: content };
    } else {
      if (content.mediaUrl) {
        body.type = content.mediaType === 'photo' ? 'image' : 'document';
        body[body.type] = { link: content.mediaUrl, caption: content.text };
      } else if (content.text) {
        body.type = 'text';
        body.text = { body: content.text };
      }
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      if (error.error?.type === 'OAuthException' && (error.error?.code === 190 || error.error?.error_subcode === 463)) {
        console.error('CRITICAL: WhatsApp Access Token has expired or is invalid. Please update WHATSAPP_ACCESS_TOKEN in .env');
        throw new Error('WhatsApp session expired. Please contact the administrator to refresh the token.');
      }
      throw new Error(`Meta API error: ${JSON.stringify(error)}`);
    }
  }

  async downloadMedia(mediaId: string): Promise<Buffer> {
    // 1. Get media URL using mediaId
    const urlResponse = await fetch(`https://graph.facebook.com/${this.version}/${mediaId}`, {
      headers: { 'Authorization': `Bearer ${this.accessToken}` },
    });
    
    if (!urlResponse.ok) {
      throw new Error(`Failed to get media URL from Meta: ${urlResponse.statusText}`);
    }
    
    const { url } = await urlResponse.json();

    // 2. Download the actual media
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${this.accessToken}` },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to download media from Meta: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async sendTypingIndicator(to: string): Promise<void> {
    // WhatsApp Cloud API doesn't have a direct "typing" indicator in the same way as Telegram 
    // for standard messages without specific business tools.
    console.log(`[WhatsApp] Typing indicator requested for ${to}`);
  }
}
