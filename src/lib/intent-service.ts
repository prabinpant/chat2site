import { AIService } from './ai-service.js';
import { AIServiceFactory } from './ai-service-factory.js';

export type IntentType = 'GENERATE_SITE' | 'UPDATE_SITE' | 'LIST_SITES' | 'LIST_VERSIONS' | 'REVERT_VERSION' | 'HELP' | 'CHAT' | 'CANCEL_BUILD' | 'UNKNOWN';

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
    version?: string;
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
- LIST_VERSIONS: User wants to see the versions/history of a specific site (e.g. "show versions of NeuronPeak", "what versions does my blog have").
- REVERT_VERSION: User wants to revert/rollback a site to a specific version (e.g. "revert NeuronPeak to v1", "go back to version 2 of my blog").
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
- version: The target version string (for REVERT_VERSION, e.g. "v1", "v2").

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
    "skipField": "string",
    "version": "target version string for REVERT_VERSION (e.g. 'v1')"
  }
}

User Message: "${text}"
`;

    const response = await this.aiService.generateCode(systemPrompt);
    
    try {
      let jsonString = response.replace(/```json|```/g, '').trim();
      
      // If there's prefix text (like "YOLO mode is enabled..."), try to find the actual JSON object
      if (!jsonString.startsWith('{')) {
        const startIndex = jsonString.indexOf('{');
        const endIndex = jsonString.lastIndexOf('}');
        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
          jsonString = jsonString.substring(startIndex, endIndex + 1);
        }
      }
      
      return JSON.parse(jsonString) as Intent;
    } catch (e) {
      console.error('Failed to parse intent JSON. Response was:\n', response);
      return {
        type: 'UNKNOWN',
        confidence: 0,
        parameters: {}
      };
    }
  }
}

export const intentService = new IntentService();
