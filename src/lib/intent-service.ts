import { CodexService } from './codex-service.js';

export type IntentType = 'GENERATE_SITE' | 'UPDATE_SITE' | 'LIST_SITES' | 'HELP' | 'CHAT' | 'UNKNOWN';

export interface Intent {
  type: IntentType;
  confidence: number;
  parameters: {
    description?: string;
    siteId?: string;
    instruction?: string;
    replyText?: string;
  };
}

export class IntentService {
  private codexService: CodexService;

  constructor() {
    this.codexService = new CodexService();
  }

  async classify(text: string, context?: string): Promise<Intent> {
    const systemPrompt = `
You are an AI Intent Classifier for a website builder bot.
Classify the user's message into one of these intents:
- GENERATE_SITE: User wants to build a new website.
- UPDATE_SITE: User wants to modify an existing website.
- LIST_SITES: User wants to see their existing websites.
- HELP: User asks for help or how to use the bot.
- CHAT: General greeting or non-functional conversation.
- UNKNOWN: None of the above.

Current Conversation Context (if any):
${context || 'No active scene.'}

Format your response as a JSON object:
{
  "type": "INTENT_TYPE",
  "confidence": 0.0-1.0,
  "parameters": {
    "description": "extracted site description for GENERATE_SITE",
    "siteId": "extracted site ID for UPDATE_SITE",
    "instruction": "extracted update instruction for UPDATE_SITE",
    "replyText": "suggested friendly response if CHAT/HELP"
  }
}

User Message: "${text}"
`;

    const response = await this.codexService.generateCode(systemPrompt);
    
    try {
      const jsonString = response.replace(/```json|```/g, '').trim();
      return JSON.parse(jsonString) as Intent;
    } catch (e) {
      console.error('Failed to parse intent JSON:', response);
      return {
        type: 'UNKNOWN',
        confidence: 0,
        parameters: {}
      };
    }
  }
}

export const intentService = new IntentService();
