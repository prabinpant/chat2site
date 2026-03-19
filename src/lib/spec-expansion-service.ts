import { CodexService } from './codex-service.js';
import { SiteSpec, Asset } from '../bot/types.js';

export class SpecExpansionService {
  private codexService: CodexService;

  constructor() {
    this.codexService = new CodexService();
  }

  async expand(prompt: string, assets: Asset[] = [], referenceData?: any): Promise<SiteSpec> {
    const assetContext = assets.length > 0 
      ? `The user has provided the following visual assets:
${assets.map(a => `- Type: ${a.type}, Content: ${a.content}`).join('\n')}
Analyze these assets to influence your design decisions. If a logo is provided, extract its vibe/colors if possible. If images are provided, ensure the site's aesthetic complements them.`
      : 'No visual assets provided yet. Use your creative judgment.';

    const referenceContext = referenceData 
      ? `### REFERENCE MATERIAL STUDY:
The user provided an external reference (${referenceData.url}). 
Extracted Text Content (Summary):
"${referenceData.textContent.substring(0, 1000)}..."
Extracted Image References: ${referenceData.extractedImages.slice(0, 3).join(', ')}

Your instructions are to:
1. Extract the core design values (e.g., minimalist, brutalist, organic, playful).
2. Identify signature colors or typography vibes.
3. Incorporate these into the refined spec without copying blindly.`
      : '';

    const systemPrompt = `
You are a master UI/UX designer and Design Strategist.
Your goal is to turn a generic prompt into a high-fidelity, premium site specification.

### MISSION:
Analyze the input prompt and any reference materials. Do NOT just use a generic style. 
Instead, derive a unique **Design Persona** (e.g., "The Architectural Purist", "Neon-Noir Cyberpunk", "Organic Gardener") and a tailored **Style Guide** for this specific site.

Input Prompt: "${prompt}"
${referenceContext}
${assetContext}

Return ONLY a JSON object following this interface:
{
  "name": "A short and sweet brand name (max 15 characters)",
  "description": "Engaging description of the brand/persona",
  "persona": "Define a unique name for this persona (e.g. 'The Modern Minimalist')",
  "personaStyleGuide": "Detailed instructions on how to implement this persona (typography, spacing, vibe, shadow usage, etc.)",
  "features": ["3-5 high-value features"],
  "theme": {
    "primaryColor": "main_accent_color_hex",
    "darkMode": "boolean",
    "palette": {
      "background": "soft_base_background_hex",
      "surface": "slightly_contrasting_surface_hex",
      "accent": "vibrant_accent_hex",
      "text": "high_readability_text_hex"
    },
    "spacing": "Choose one: airy | standard | compact",
    "layoutStrategy": "Define a specific strategy (e.g. bento-grid, masonry, editorial-split)"
  },
  "sections": [
    { 
      "title": "Clear Section Title", 
      "description": "Specific content purpose and copy intent",
      "layoutHint": "Specific layout instructions (e.g. glassmorphic cards, parallax scroll)"
    }
  ],
  "branding": {
    "tone": "e.g. Sophisticated & Bold",
    "aesthetic": "Refined design aesthetic description",
    "typography": {
      "heading": "Specific Google Font or Category",
      "body": "Specific Google Font or Category"
    }
  },
  "imagery": {
    "style": "Specific visual style for placeholders",
    "keywords": ["5-7 specific keywords"]
  },
  "extraDependencies": {
    "package-name": "version"
  }
}

Guidelines:
1. Define a solid, memorable persona. Don't be generic.
2. If references are provided, let them weigh heavily on the persona's style.
3. Be generous with dependencies (framer-motion, lucide-react, etc. are standard).
4. Layout hints should be detailed, creative, and specific to the persona.
5. **CREATIVE RISK**: For each site, choose one "Visual Anchor" (e.g., "brutalist typography", "organic liquid shapes", "ultra-minimalist monochrome") and lean into it. AVOID predictable patterns.

Do not include markdown. Just valid JSON.
`;

    const response = await this.codexService.generateCode(systemPrompt);
    
    try {
      const jsonString = response.replace(/```json|```/g, '').trim();
      return JSON.parse(jsonString) as SiteSpec;
    } catch (e) {
      console.error('Failed to parse expanded spec JSON:', response);
      return {
        name: prompt.split(' ').slice(0, 2).join(' ') || 'My Site',
        description: prompt,
        features: ['Modern UI', 'Responsive Design'],
        theme: {
          primaryColor: '3b82f6',
          darkMode: false
        }
      } as SiteSpec;
    }
  }
}
