import { CodexService } from './codex-service.js';
import { SiteSpec } from '../bot/types.js';

export class SpecExpansionService {
  private codexService: CodexService;

  constructor() {
    this.codexService = new CodexService();
  }

  async expand(prompt: string): Promise<SiteSpec> {
    const systemPrompt = `
You are a creative UI/UX designer and site architect. 
Your task is to take a generic website prompt and expand it into a detailed, high-quality site specification.
Be creative and avoid generic "features" lists. Think about sections that would make this specific site unique and premium.

Input Prompt: "${prompt}"

Return ONLY a JSON object following this interface:
{
  "name": "Creative site name",
  "description": "Engaging site description",
  "features": ["Specific feature 1", "Specific feature 2", ...],
  "theme": {
    "primaryColor": "hex_code_without_hash",
    "darkMode": false
  },
  "sections": [
    { "title": "Section Title", "description": "What should be in this section" },
    ...
  ],
  "branding": {
    "tone": "e.g. Elegant and minimalist / Energetic and bold",
    "aesthetic": "e.g. Glassmorphism with soft shadows / Swiss brutalism with high contrast"
  }
}

Do not include markdown formatting or explanations. Just the JSON.
`;

    const response = await this.codexService.generateCode(systemPrompt);
    
    try {
      // Sometimes LLMs wrap JSON in code blocks even if told not to
      const jsonString = response.replace(/```json|```/g, '').trim();
      return JSON.parse(jsonString) as SiteSpec;
    } catch (e) {
      console.error('Failed to parse expanded spec JSON:', response);
      // Fallback to a basic spec if parsing fails
      return {
        name: prompt.split(' ').slice(0, 2).join(' ') || 'My Site',
        description: prompt,
        features: ['Modern UI', 'Responsive Design'],
        theme: {
          primaryColor: '3b82f6',
          darkMode: false
        }
      };
    }
  }
}
