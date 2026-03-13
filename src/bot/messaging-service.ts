import { SiteSpec } from './types.js';

export interface MessageContent {
  text?: string;
  mediaUrl?: string;
  mediaType?: 'photo' | 'document';
}

export interface IncomingMessage extends MessageContent {
  from: string;
  platform: 'telegram' | 'whatsapp';
  messageId: string;
  timestamp: number;
}

export interface MessagingProvider {
  sendMessage(to: string, content: string | MessageContent): Promise<void>;
  downloadMedia(mediaId: string): Promise<Buffer>;
}

export interface SessionData {
  platform: 'telegram' | 'whatsapp';
  userId: string;
  currentScene: string;
  sceneStep: number;
  spec: Partial<SiteSpec>;
  siteId?: string;
  instruction?: string;
  lastUpdate: number;
}
