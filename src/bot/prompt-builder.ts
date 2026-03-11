import { SiteSpec } from './types.js';

export class PromptBuilder {
  static build(spec: SiteSpec): string {
    const sectionsText = spec.sections 
      ? spec.sections.map(s => `• ${s.title}: ${s.description} (Layout: ${s.layoutHint || 'standard'})`).join('\n')
      : '- Hero section\n- Features section\n- Footer';

    const palette = spec.theme.palette || {
      background: 'ffffff',
      surface: 'f8fafc',
      accent: spec.theme.primaryColor,
      text: '0f172a'
    };

    const typography = spec.branding?.typography || {
      heading: 'Sans-serif',
      body: 'Sans-serif'
    };

    return `
Generate a single-file React component (App.tsx) for a premium website named "${spec.name}".

### Design Identity
- **Tone**: ${spec.branding?.tone || 'Professional & Modern'}
- **Aesthetic**: ${spec.branding?.aesthetic || 'Clean and minimal'}
- **Layout Strategy**: ${spec.theme.layoutStrategy || 'editorial-stacked'}
- **Spacing Ethos**: ${spec.theme.spacing || 'airy'}
- **Palette**: 
  - Background: #${palette.background}
  - Surface/Cards: #${palette.surface}
  - Accent: #${palette.accent}
  - Text: #${palette.text}
- **Typography**: Heading: ${typography.heading}, Body: ${typography.body}

### Site Narrative & Structure
${spec.description}

Requested Sections:
${sectionsText}

### Core Principles for the AI
1. **NEGATIVE SPACE**: Prioritize "breathing room". Use large margins (e.g., mt-32, py-24). Avoid cramming elements.
2. **LAYOUT MASTERY**: Avoid generic 1-column stacks. Use the requested strategy (${spec.theme.layoutStrategy}).
3. **IMAGERY**: Use high-quality placeholders from Unsplash (https://images.unsplash.com/...) relevant to these keywords: ${spec.imagery?.keywords.join(', ') || 'modern architecture, clean design'}. 
4. **COLOR & HIERARCHY**: Use the palette strictly. Background should be clean. Contrast should be intentional.
5. **MOTION**: Include subtle Framer-Motion style entry animations or smooth transitions.
6. **VISUAL POLISH**: Use delicate borders (border-slate-100), soft shadows (shadow-sm), and rounded corners (rounded-3xl).

### Technical Requirements
- Use React with TypeScript.
- Use Tailwind CSS for all styling (v3 syntax). Prefer utility classes.
- Use Lucide-react for elegant icons.
${spec.extraDependencies ? `- You have access to these extra packages: ${Object.keys(spec.extraDependencies).join(', ')}` : ''}
- Ensure the site is fully responsive and mobile-optimized.
- The entire site must be in one file: App.tsx.

Return ONLY the code for App.tsx. Ensure all imports are used.
`;
  }
}
