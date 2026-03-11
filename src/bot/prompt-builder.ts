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

    let logoInstruction = '- **LOGO**: Create a sophisticated text-based logo or use a Lucide icon if no logo is provided.';
    if (logoAsset) {
      if (logoAsset.source === 'text') {
        logoInstruction = `- **LOGO**: Use the provided logo description: "${logoAsset.content}".`;
      } else {
        logoInstruction = `- **LOGO**: Use the provided local logo at \`${logoAsset.content}\`. Reference it in your code as \`<img src="${logoAsset.content}" />\`.`;
      }
    }

    const galleryInstructions = galleryAssets.length > 0 
      ? galleryAssets.map((a, i) => {
          if (a.source === 'text') {
            return `- **IMAGE ${i+1}**: Description: "${a.content}".`;
          } else {
            return `- **IMAGE ${i+1}**: Use local asset \`${a.content}\`. Reference as \`<img src="${a.content}" />\`.`;
          }
        }).join('\n')
      : '- **IMAGERY**: Use Unsplash URLs (https://images.unsplash.com/...) with context-aware keywords.';

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
${logoInstruction}
${galleryInstructions}

**CRITICAL**: When using local assets from the \`public/\` folder, ALWAYS include the leading forward slash and the full extension (e.g., \`.png\`, \`.jpg\`). Reference them as absolute paths from the root, for example: \`<img src="/logo.png" />\`. Do NOT use relative paths like \`./public/...\` or omit the extension.

### Visual Principles:
- **NEGATIVE SPACE**: Use massive margins and padding. 
- **MOTION**: Use Framer Motion for sophisticated entrance animations.
- **POLISH**: Use glassmorphism, soft gradients, and delicate borders.

Execute all commands, write all files, and finish with a successful build.
`;
  }
  static buildIterationPrompt(spec: SiteSpec, instruction: string): string {
    return `
You are an **Autonomous System Architect** iterating on an existing Vite/React website named "${spec.name}".
The project is already initialized and configured in the current directory.

### YOUR TASK:
Apply the following **specific** changes/modifications as requested by the user:
> "${instruction}"

### CRITICAL SAFETY & ISOLATION CONSTRAINTS:
1. **TARGETED MODIFICATIONS ONLY**: Only change the components and logic directly related to the user's request. DO NOT perform unrelated refactors or change stable parts of the code.
2. **PRESERVE ASSETS**: DO NOT delete or rename files in the \`public/\` folder. The existing logo and images must remain accessible at their current paths.
3. **READ BEFORE WRITE**: Use the shell to read the current \`src/App.tsx\` and other relevant files before modifying them. Ensure you understand the current implementation to avoid breaking logic.
4. **NO RE-INITIALIZATION**: Do NOT run \`npm create vite\`. The project structure is already set.
5. **ISOLATION**: You are restricted to the current directory. DO NOT attempt to access or modify files outside of this folder.
6. **STABILITY**: Ensure the site remains functional. After making changes, run \`npm run build\` to verify that your modifications did not break the build.

### Design Identity Ref (Maintain Consistency):
- **Tone**: ${spec.branding?.tone || 'Modern'}
- **Palette**: Accent: #${spec.theme.primaryColor}

Execute all commands, write all required files, and finish with a successful build.
`;
  }
}
