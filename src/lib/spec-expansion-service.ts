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
1. **AI Identity Discovery**: Generate a unique, creative, and URL-friendly slug (e.g., 'mystic-spa') to be used as BOTH the \`id\` and \`preferredSubdomain\`. Avoid UUIDs or generic ID strings.
2. **Memory Synthesis**: Create a comprehensive Markdown document (\`memory.md\`) that captures:
   - **The Vision**: What is the ultimate goal?
   - **Persona & Tone**: Detailed creative voice and design identity.
   - **Historical Context**: For updates, summarize what has already been built.
   - **Comparative Research Directives**: Specific instructions for the Architect to visit reference sites and extract REAL data (not meta-commentary). This includes:
      *   **Brand Identity**: Core messaging, service lists, and tone.
      *   **Favicon**: Identify the reference site's favicon URL (usually at \`/favicon.ico\`) for use.
      *   **SEO Titles**: Extract the high-ranking page titles and meta-descriptions used by the competition.
   - **Marketing Copy Strategy**: Provide professional, ready-to-use copy suggestions for major sections.

### CRITICAL CONTENT RULES:
- **NATURAL & CUSTOMER-FACING**: All suggested copy must be fully customer-facing, natural, and believable. Avoid generic filler and internal/agency-style phrasing.
- **NO META-COMMENTARY**: Remove all meta, strategic, or AI-generated language (e.g., structure, SEO, positioning, audience targeting). Never use phrases like "The site needs to sell trust" or "According to the reference site" in your suggested copy.
- **BRAND EMBODIMENT**: Write as if a real brand is speaking directly to a visitor. Use the FIRST PERSON ("We", "I", "Our"). Focus only on what the user experiences, why it matters, and what they should do next.
- **DELIVER, DON'T EXPLAIN**: If any line sounds like it’s explaining the content instead of delivering it, rewrite or remove it.
- **PURE STRATEGY SEPARATION**: Clearly mark what is INTERNAL STRATEGY (for the Architect's eyes only) and what is SUGGESTED UI COPY. Use Markdown headers to separate these.
3. **Structured Meta**: Pick a Sweet Brand Name (max 30 characters).

### OUTPUT FORMAT:
Return ONLY a valid JSON object following this interface:
{
  "id": "A unique, creative, and URL-friendly slug",
  "name": "The Brand Name",
  "preferredSubdomain": "The deployment slug",
  "memory": "The FULL Markdown content for memory.md"
}
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
