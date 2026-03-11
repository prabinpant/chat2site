import { SiteSpec } from './types.js';

export class PromptBuilder {
  static build(spec: SiteSpec): string {
    const sectionsText = spec.sections 
      ? spec.sections.map(s => `• ${s.title}: ${s.description}`).join('\n')
      : '- Hero section\n- Features section\n- Footer';

    const brandingText = spec.branding 
      ? `Tone: ${spec.branding.tone}\nAesthetic: ${spec.branding.aesthetic}`
      : 'Modern, clean, and professional.';

    return `
Generate a single-file React component (App.tsx) for a website named "${spec.name}".

Context & Branding:
${spec.description}
${brandingText}

Requested Sections & Storytelling:
${sectionsText}

Key Features:
${spec.features.map(f => `- ${f}`).join('\n')}

Technical Requirements:
- Use React with TypeScript.
- Use Tailwind CSS for all styling (prefer utility classes).
- Use Lucide-react for high-quality icons.
- Implement smooth micro-interactions and transitions where appropriate.
- Primary color: #${spec.theme.primaryColor}
- Dark mode: ${spec.theme.darkMode ? 'Supported' : 'Light theme only'}

Visual Polish Guidelines:
- Prioritize high-end aesthetics: generous white space, consistent padding, and elegant typography.
- Avoid generic layouts. Use creative grid systems or flexbox patterns.
- Ensure the interface feels "alive" with subtle hover states or entry animations.
- The entire site must be contained in a single App.tsx file.

Return ONLY the code for App.tsx. Ensure all imports are used.
`;
  }
}
