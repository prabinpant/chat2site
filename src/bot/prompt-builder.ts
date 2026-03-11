import { SiteSpec } from './types.js';

export class PromptBuilder {
  static build(spec: SiteSpec): string {
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

    const logoAsset = spec.assets?.find(a => a.type === 'logo');
    const galleryAssets = spec.assets?.filter(a => a.type === 'image') || [];

    return `
You are an **Autonomous System Architect**. You have full shell access to the current directory.
Your task is to build a premium, high-fidelity website named "${spec.name}" from scratch.

### YOUR LIFECYCLE:
1. **Initialize**: Use \`npm create vite@latest . -- --template react-ts\`. Handle the Vite 8 experimental prompt by choosing the stable (No) option.
2. **Configure Design**: 
   - Configure Tailwind CSS v3 and PostCSS. 
   - Set up \`tailwind.config.js\`, \`postcss.config.js\`, and \`src/index.css\` with standard Tailwind directives.
3. **Manage Dependencies**: Install all required packages including \`lucide-react\`, \`framer-motion\`, \`clsx\`, \`tailwind-merge\`, and any other packages you deemed necessary: [${Object.keys(spec.extraDependencies || {}).join(', ')}].
4. **Generate & Polish**:
   - Delete default Vite boilerplate (\`App.css\`, \`assets/\`).
   - Create a premium, responsive \`src/App.tsx\` that implements the design identity below.
5. **Final Build**: Run \`npm run build\` to ensure the production bundle is generated in the \`dist/\` folder.

**NOTE**: Your terminal terminal output is being streamed LIVE to the user. Provide clear status updates for each step to guide them through your progress.

### Design Identity to Implement:
- **Tone**: ${spec.branding?.tone || 'Professional & Modern'}
- **Palette**: 
  - Background: #${palette.background}
  - Surface/Cards: #${palette.surface}
  - Accent: #${palette.accent}
  - Text: #${palette.text}
- **Typography**: Heading: ${typography.heading}, Body: ${typography.body}

### Site Structure:
${(spec.sections || []).map(s => `- ${s.title}: ${s.description} (Layout: ${s.layoutHint || 'standard'})`).join('\n')}

### Assets & Imagery:
${logoAsset ? `- **LOGO**: Use the provided logo asset at \`${logoAsset.content}\`. ${logoAsset.source === 'text' ? `Description: ${logoAsset.content}` : 'This is a local file in the public/ directory.'}` : '- **LOGO**: Create a sophisticated text-based logo or use a Lucide icon if no logo is provided.'}
${galleryAssets.length > 0 ? galleryAssets.map((a, i) => `- **IMAGE ${i+1}**: Use \`${a.content}\`. ${a.source === 'text' ? `Description: ${a.content}` : 'Local file in public/ folder.'}`).join('\n') : '- **IMAGERY**: Use Unsplash URLs (https://images.unsplash.com/...) with context-aware keywords.'}

### Visual Principles:
- **NEGATIVE SPACE**: Use massive margins and padding. 
- **MOTION**: Use Framer Motion for sophisticated entrance animations.
- **POLISH**: Use glassmorphism, soft gradients, and delicate borders.

Execute all commands, write all files, and finish with a successful build.
`;
  }
}
