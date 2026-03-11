import { CodexService } from './codex-service.js';
import { SiteSpec } from '../bot/types.js';

export class SpecExpansionService {
  private codexService: CodexService;

  constructor() {
    this.codexService = new CodexService();
  }

  async expand(prompt: string): Promise<SiteSpec> {
    const systemPrompt = `
You are a master UI/UX designer specializing in high-end, premium web experiences.
Your goal is to turn a generic prompt into a sophisticated, minimalist, and creative site specification.
Avoid clutter. Prioritize breathing room, clear hierarchy, and unique layouts.

Input Prompt: "${prompt}"

Return ONLY a JSON object following this interface:
{
  "name": "A creative, unique name",
  "description": "Engaging description of the brand/persona",
  "features": ["3-5 high-value features"],
  "theme": {
    "primaryColor": "main_accent_color_hex",
    "darkMode": false,
    "palette": {
      "background": "soft_base_background_hex",
      "surface": "slightly_contrasting_surface_hex",
      "accent": "vibrant_accent_hex",
      "text": "high_readability_text_hex"
    },
    "spacing": "Choose one: airy | standard | compact",
    "layoutStrategy": "Choose one: bento-grid | editorial-stacked | fluid-storytelling"
  },
  "sections": [
    { 
      "title": "Clear Section Title", 
      "description": "Specific content purpose",
      "layoutHint": "e.g., asymmetrical split | full-width feature | 3-column masonry"
    }
  ],
  "branding": {
    "tone": "e.g. Sophisticated & Quiet-Luxury",
    "aesthetic": "e.g. Soft-shadow glassmorphism with delicate typography",
    "typography": {
      "heading": "Suggest a Google Font category (e.g. Serif Display, Geometric Sans)",
      "body": "Suggest a Google Font category"
    }
  },
  "imagery": {
    "style": "e.g. Minimalist architectural photography | Abstract 3D gradients",
    "keywords": ["5 specific keywords for image generation"]
  }
}

Guidelines:
1. Palette must be Harmonious. Use sophisticated colors (soft neutrals, deep accents).
2. Layout Strategy should prevent generic "box" look.
3. Sections should flow like a story.
4. If imagery is needed, provide precise keywords.

Do not include markdown. Just valid JSON.
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
