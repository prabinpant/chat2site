import { AIService } from './ai-service.js';
import { AIServiceFactory } from './ai-service-factory.js';

export type IntentType = 'GENERATE_SITE' | 'UPDATE_SITE' | 'LIST_SITES' | 'HELP' | 'CHAT' | 'CANCEL_BUILD' | 'UNKNOWN';

export interface Intent {
  type: IntentType;
  confidence: number;
  parameters: {
    description?: string;
    siteId?: string;
    siteName?: string;
    instruction?: string;
    replyText?: string;
    projectName?: string;
    designStyle?: string;
    subdomain?: string;
    isReady?: boolean;
    skipField?: string;
  };
}

export class IntentService {
  private aiService: AIService;

  constructor() {
    this.aiService = AIServiceFactory.create();
  }

  async classify(text: string, context?: string): Promise<Intent> {
    const systemPrompt = `
You are a classifier for a Website Builder Bot.
Identify the user's intent and extract relevant parameters.

### INTENT TYPES:
- GENERATE_SITE: User wants to build a new website.
- UPDATE_SITE: User wants to modify an existing website. This includes specific change requests ("change the header") or identifying a site by name/ID to update ("update my bakery site").
- LIST_SITES: User wants to see their projects.
- HELP: User asks for help or commands.
- CHAT: General conversation, greetings, or questions ("How are you?", "What can you do?").
- CANCEL_BUILD: User wants to stop/cancel the current build or generation process.
- UNKNOWN: None of the above.

### PARAMETERS TO EXTRACT (if applicable):
- description: Brief description of the actual site (for GENERATE_SITE or BUILD_SCENE). Do NOT extract generic intent phrases like "I want to build a site" - leave it empty unless there are actual topical details.
- projectName: Name for the project.
- designStyle: Preferred style (e.g. Modern, Minimalist, Cyberpunk).
- subdomain: Preferred Netlify subdomain.
- isReady: Set to true if the user implies they are ready to proceed with the build, decline to provide optional info, or just want to start immediately (e.g. "go ahead", "start", "build it", "done", "I don't have a name", "skip those", "yes").
- skipField: The name of a field the user explicitly wants to skip (e.g. "skip name"). Valid fields: projectName, designStyle, subdomain.
- siteId: ID of the site to update (for UPDATE_SITE).
- siteName: Name or natural reference of the site to update (e.g. "bakery", "my portfolio", "the law firm site").
- instruction: What to change (for UPDATE_SITE).
- replyText: A helpful conversational response (for CHAT).

### CONTEXT:
${context || 'No context provided.'}

Return JSON ONLY:
{
  "type": "IntentType",
  "confidence": 0.0-1.0,
  "parameters": {
    "description": "extracted site description for GENERATE_SITE",
    "projectName": "extracted site name if provided (e.g. 'DinoPark')",
    "designStyle": "extracted design style/vibe if provided (e.g. 'Cyberpunk', 'Modern Minimalist')",
    "subdomain": "extracted preferred subdomain if provided (e.g. 'dinopark-web')",
    "siteId": "extracted site ID for UPDATE_SITE",
    "instruction": "extracted update instruction for UPDATE_SITE",
    "replyText": "suggested friendly response if CHAT/HELP",
    "isReady": boolean,
    "skipField": "string"
  }
}

User Message: "${text}"
`;

    const response = await this.aiService.generateCode(systemPrompt);
    
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
