import { config } from './config.js';
import { AIService } from './ai-service.js';
import { CodexService } from './codex-service.js';
import { GeminiService } from './gemini-service.js';

export class AIServiceFactory {
  static create(): AIService {
    const engine = config.aiEngine;
    console.log(`[AIServiceFactory] Creating ${engine} service...`);
    
    switch (engine) {
      case 'gemini':
        return new GeminiService();
      case 'codex':
      default:
        return new CodexService();
    }
  }
}
