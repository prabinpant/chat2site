import { AIService } from './ai-service.js';
import { AIServiceFactory } from './ai-service-factory.js';
import { SiteSpec, Asset } from '../bot/types.js';

export class SpecExpansionService {
  private aiService: AIService;

  constructor() {
    this.aiService = AIServiceFactory.create();
  }

  async expand(prompt: string, assets: Asset[] = [], referenceData?: any): Promise<SiteSpec> {
    const assetContext = assets.length > 0 
      ? `The user has provided the following visual assets:
${assets.map(a => `- Type: ${a.type}, Content: ${a.content}${a.usageHint ? `, Usage Hint: ${a.usageHint}` : ''}`).join('\n')}
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
3. **CRITICAL REVAMP RULE**: Extract and USE the actual textual content, copy, and structural meaning from the reference site.
4. **NO LINKING TO ORIGINAL**: DO NOT just link back to the original site. The original site is considered destroyed/replaced. Everything necessary must live on this new site.
5. **NO FAKE CONTENT**: DO NOT make up random placeholder content if the reference site provides it. Use the provided content exactly, but elevate the presentation.`
      : '';

    const systemPrompt = `
You are a master UI/UX designer and Design Strategist.
Your goal is to turn a user's prompt into a high-fidelity, premium site specification.

### CORE DESIGN PHILOSOPHY:
You are designing an award-winning, striking, and modern website. We actively REJECT traditional "generic SaaS" layouts, boring Bootstrap grids, and dashboard-style card components. 
Instead, we build with:
- **Composition**: Full-bleed imagery, typography as art, and rigorous spacing.
- **Cardless by Default**: Layouts that break out of boxes.
- **Strong Visual Anchors**: Massive heroes, bold shapes, organic fluidity, or brutalist edges.
Your generated persona, style guide, layout hints, and imagery descriptors MUST reflect this high-end ambition.

### ORIGINAL USER PROMPT (HIGHEST PRIORITY):
"""
${prompt}
"""

> [!CRITICAL]
> The user's raw prompt above is the ABSOLUTE GROUND TRUTH. 
> - Every name, data point, piece of copy, feature, or constraint mentioned by the user MUST be preserved EXACTLY.
> - Do NOT rephrase, reinterpret, or replace any user-provided data with generic alternatives.
> - Do NOT invent, add, or suggest sections, features, pages, or components the user did not ask for.
> - If the user says "a bakery landing page with a menu and contact form", the spec must have exactly those sections — not a blog, testimonials, team section, or FAQ unless the user mentioned them.
> - If the user provides specific text, names, prices, or details, use them verbatim in the spec.
> - Your job is to REFINE and ELEVATE what the user asked for, not to expand scope.

${referenceContext}
${assetContext}

### YOUR MISSION:
Analyze the original user prompt above and derive:
1. A unique, creative **Design Persona** tailored to this specific site's domain, audience, and tone (e.g., "The Artisan Baker", "Neon-Noir Cyberpunk", "The Zen Practitioner"). Be creative and domain-specific. Do NOT use generic names.
2. A detailed **Style Guide** that implements this persona (typography choices, spacing philosophy, shadow usage, color rationale, visual energy).

Return ONLY a JSON object following this interface:
{
  "name": "A short and sweet brand name (max 15 characters) — USE the user's name if they provided one",
  "preferredSubdomain": "A clean, URL-friendly slug based on the project purpose (e.g. 'artisan-bakery', 'cyber-portfolio')",
  "description": "Engaging description of the brand/purpose — derived from the user's prompt, not invented",
  "persona": "A unique creative persona name derived from the user's domain and tone",
  "personaStyleGuide": "Detailed instructions on how to implement this persona (typography, spacing, vibe, shadow usage, color rationale, etc.)",
  "features": ["Only features the user asked for or that are directly implied by their request — max 5"],
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
      "title": "Section Title — must map to what the user asked for", 
      "description": "Specific content purpose using the user's actual data/copy if provided",
      "layoutHint": "Specific layout instructions (e.g. glassmorphic cards, parallax scroll)"
    }
  ],
  "branding": {
    "tone": "e.g. Sophisticated & Bold — derived from the user's domain",
    "aesthetic": "Refined design aesthetic description",
    "typography": {
      "heading": "Specific Google Font or Category",
      "body": "Specific Google Font or Category"
    }
  },
  "imagery": {
    "style": "Specific visual style for placeholders",
    "keywords": ["5-7 specific keywords relevant to the user's domain"]
  },
  "extraDependencies": {
    "package-name": "version"
  }
}

### GUIDELINES:
1. Generate a creative, memorable persona that fits the user's domain. Do NOT be generic (e.g., instead of "Bank Persona", use "The Brutalist Fintech Rebel").
2. If references are provided, let them weigh heavily on the persona's style.
3. Be generous with dependencies (framer-motion, lucide-react, etc. are standard).
4. Layout hints should be detailed, creative, and specific to the persona (e.g., "full-bleed hero with edge-to-edge image", "asymmetric bento grid", "cardless open typography layout").
5. **CREATIVE RISK**: Choose one "Visual Anchor" (e.g., "brutalist typography", "organic liquid shapes", "ultra-minimalist monochrome") and lean into it. AVOID predictable and traditional UI patterns.
6. **PRESERVE HARD DATA**: If the input prompt contains specific names, text, rules, or copy, ensure the \`sections\` map to these precise requirements — NOT generic placeholder intent.
7. **NO SCOPE CREEP**: Only include sections and features the user explicitly asked for or that are absolutely essential (e.g., a hero section). Do NOT pad the spec with extra sections.
8. **ASSET MAPPING**: If user provided assets, suggest which section each asset best fits by including asset context in section descriptions.

Do not include markdown. Just valid JSON.
`;

    const response = await this.aiService.generateCode(systemPrompt);
    
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
