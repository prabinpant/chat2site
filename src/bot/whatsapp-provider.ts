import { MessagingProvider, MessageContent } from './messaging-service.js';

export class WhatsAppProvider implements MessagingProvider {
  private accessToken: string;
  private phoneNumberId: string;
  private version: string;

  constructor() {
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || '';
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
    this.version = process.env.WHATSAPP_API_VERSION || 'v22.0';

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
}
