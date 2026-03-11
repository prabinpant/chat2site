import { SiteSpec } from './types.js';

export class PromptBuilder {
  static build(spec: SiteSpec): string {
    return `
Generate a single-file React component (App.tsx) for a website named "${spec.name}".
Description: ${spec.description}
Features to include:
${spec.features.map(f => `- ${f}`).join('\n')}

Technical Requirements:
- Use React with TypeScript.
- Use Tailwind CSS for styling.
- The design should be modern, clean, and professional.
- Use Lucide-react for icons if needed.
- Include a Hero section, Features section, and a Footer.
- Primary color: ${spec.theme.primaryColor}
- Dark mode support: ${spec.theme.darkMode ? 'Enabled' : 'Disabled'}

Return ONLY the code for App.tsx. Do not include any explanations or markdown blocks.
Ensure that ALL imported modules (like React and Lucide icons) are actually used in the code to avoid TypeScript build errors.
The code must be valid, complete, and ready for a production build.
`;
  }
}
