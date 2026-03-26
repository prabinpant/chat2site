import { AIService } from './ai-service.js';
import { AIServiceFactory } from './ai-service-factory.js';
import { SiteSpec, Asset } from '../bot/types.js';

export class SpecExpansionService {
  private aiService: AIService;

  constructor() {
    this.aiService = AIServiceFactory.create();
  }

  async expand(
    prompt: string, 
    assets: Asset[] = [], 
    referenceUrls: string[] = [],
    previousMemory?: string
  ): Promise<SiteSpec> {
    const assetContext = assets.length > 0 
      ? `### PROVIDED ASSETS:\nThe user has provided local files at these paths:\n${assets.map(a => `- ${a.content} (Type: ${a.type})`).join('\n')}\n(Note: The Architect must move these to /public and use them).`
      : 'No visual assets provided yet.';

    const referenceContext = referenceUrls.length > 0 
      ? `### REFERENCE SITES (DETECTED):\n${referenceUrls.map(url => `- ${url}`).join('\n')}`
      : 'No specific reference sites provided.';

    const memoryContext = previousMemory
      ? `### PREVIOUS MEMORY:\nYou are updating an existing site. Here is its previous brain:\n"""\n${previousMemory}\n"""`
      : '### NEW PROJECT:\nYou are starting a fresh project.';

    const systemPrompt = `
You are a **Prompt Context Builder** for an AI-driven site generation pipeline.
Your job is to transform raw user requests, assets, and references into a strategic "Memory" that will guide a Build Architect.

### YOUR INPUTS:
1. **User Prompt**: "${prompt}"
2. ${assetContext}
3. ${referenceContext}
4. ${memoryContext}

### YOUR TASKS:
1. **AI Identity Discovery**: Generate a unique, creative, and URL-friendly \`id\` and \`preferredSubdomain\` (slug) based on the project purpose.
2. **Memory Synthesis**: Create a comprehensive Markdown document (\`memory.md\`) that captures:
   - **The Vision**: What is the ultimate goal?
   - **Design Strategist's Plan**: Step-by-step instructions for the Architect.
   - **Persona & Tone**: Detailed creative voice and design identity.
   - **History**: If this is an update, summarize what has already been built and what needs to change.
   - **Comparative Research Directives**: If reference URLs are provided, specify exactly what visual/structural elements the Architect should extract from EACH site. Ensure they are instructed to use their own tools to visit these sites.
3. **Structured Meta**: Pick a Sweet Brand Name (max 30 characters).

### OUTPUT FORMAT:
Return ONLY a valid JSON object following this interface:
{
  "id": "A unique, URL-safe slug",
  "name": "The Brand Name",
  "preferredSubdomain": "The deployment slug",
  "memory": "The FULL Markdown content for memory.md"
}

IMPORTANT: The \`referenceUrls\` detected in your input must ONLY be present in your \`memory.md\` strategy. They must NOT be in the JSON output. The Architect will find them in memory.
`;

    const response = await this.aiService.generateCode(systemPrompt);
    
    try {
      const jsonString = response.replace(/```json|```/g, '').trim();
      return JSON.parse(jsonString) as SiteSpec;
    } catch (e) {
      console.error('Failed to parse expanded memory spec JSON:', response);
      return {
        id: `site-${Date.now()}`,
        name: 'My Site',
        preferredSubdomain: 'my-site',
        memory: `# Site Memory\n\nPrompt: ${prompt}\n\nFailed to generate full memory. Proceed with basic intent.`
      } as SiteSpec;
    }
  }
}
