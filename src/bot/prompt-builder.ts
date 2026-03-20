import { SiteSpec, Asset } from './types.js';
import { getDesignSkills } from '../lib/design-skills-context.js';

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

    const designSkills = getDesignSkills(spec.persona);

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

${designSkills}

### Design Identity to Implement:
- **Tone**: ${spec.branding?.tone || 'Professional & Modern'}
${spec.persona ? `- **Design Persona**: ${spec.persona}\n- **Persona Style Guide**: ${spec.personaStyleGuide || this.getPersonaInstructions(spec.persona)}` : ''}
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

### Visual Anchor: Asset Matching
${logoAsset || galleryAssets.length > 0 ? `
- **INCORPORATION**: You have been provided with specific brand assets. Analyze the palette, style, and "vibe" of the logo and images.
- **COHESION**: Your design (colors, spacing, typography) MUST be a sophisticated extensions of these assets. 
- **ALIGNMENT**: If the logo is minimalist, keep the UI minimalist. If the images are vibrant/organic, use similar gradients and shapes.
` : '- **GENERIC ALIGNMENT**: Since no custom assets were provided, follow the Persona Style Guide strictly to create a cohesive brand from scratch.'}

### Visual Principles:
- **DESIGN COMMITMENT**: Follow the "${spec.persona || 'Modern Minimalist'}" identity with extreme conviction.
- **SURPRISE ME**: Do not fall back to generic layouts. Use unexpected grid placements, overlapping elements, or custom-designed UI components that specifically fit this persona.
- **MOTION & DEPTH**: Use Framer Motion and creative CSS (glassmorphism, gradients, noise) ONLY as dictated by the Persona Style Guide.
- **ANTI-PATTERN**: AVOID the "generic AI startup" look (purple gradients on white, standard Inter font, 3-column feature grid) unless specifically required.

Execute all commands, write all files, and finish with a successful build.
`;
  }
  static buildIterationPrompt(spec: SiteSpec, instruction: string, currentCode: string, newAssets: Asset[] = []): string {
    const assetInstructions = newAssets.map((a, i) => {
      if (a.source === 'text') return `- **NEW IMAGE ${i+1}**: Description: "${a.content}".`;
      return `- **NEW IMAGE ${i+1}**: Use local asset \`${a.content}\`. Reference as \`<img src="${a.content}" />\`.`;
    }).join('\n');

    const designSkills = getDesignSkills(spec.persona);

    return `
You are an **Autonomous System Architect** iterating on an existing Vite/React website named "${spec.name}".
The project is already initialized and configured in the current directory.

### CURRENT SOURCE CODE (src/App.tsx):
\`\`\`tsx
${currentCode}
\`\`\`

### YOUR TASK:
Apply the following **specific** changes/modifications as requested by the user:
> "${instruction}"

${newAssets.length > 0 ? `### NEW ASSETS PROVIDED:
${assetInstructions}
Note: These assets are already placed in the \`public/\` directory. Reference them in your components as shown above.\n` : ''}

${designSkills}

### DESIGN CONTINUITY:
1. **RESPECT THE AESTHETIC**: Deeply analyze and adhere to the existing color palette, typography (font-families, sizes, weights), spacing, and visual "vibe" found in the provided source code.
2. **STYLE MATCHING**: Any new components or sections MUST be stylistically seamless with the rest of the site. If the site is minimal, keep new additions minimal. If it's vibrant/Cyberpunk, match that energy accurately.
3. **NO UNSOLICITED CHANGES**: Do NOT change the theme, primary colors, or fonts unless the user explicitly asked to modify the design identity.

### CRITICAL SAFETY & ISOLATION CONSTRAINTS:
1. **TARGETED MODIFICATIONS ONLY**: Only change the components and logic directly related to the user's request. DO NOT perform unrelated refactors or change stable parts of the code.
2. **STUDY THE SOURCE**: You have been provided with the current content of \`src/App.tsx\`. Use it as a reference to ensure your changes are integrated seamlessly without breaking existing functionality.
3. **PRESERVE UNRELATED SECTIONS**: If the user asks to change the Header, DO NOT touch the Footer or Hero sections unless strictly necessary for the change.
4. **PRESERVE ASSETS**: DO NOT delete or rename files in the \`public/\` folder.
5. **NO RE-INITIALIZATION**: Do NOT run \`npm create vite\`.
6. **STABILITY**: Ensure the site remains functional. After making changes, run \`npm run build\` to verify.

Execute all commands, write all required files, and finish with a successful build.
`;
  }

  static buildRepairPrompt(errorLogs: string): string {
    return `
You are an **Autonomous System Architect** tasked with repairing a failed build.
The previous build attempt failed with the following errors:

\`\`\`
${errorLogs}
\`\`\`

### YOUR REPAIR TASK:
1. **ANALYZE**: Read the error logs carefully to identify the root cause (e.g., missing imports, syntax errors, conflicting dependencies, or missing files).
2. **FIX**: Use the shell to read the problematic files, apply the necessary fixes, and ensure all imports and logic are correct.
3. **VERIFY**: Run \`npm run build\` again to verify that your changes fixed the issue.

### CONSTRAINTS:
- DO NOT re-initialize the project.
- DO NOT touch unrelated files.
- Stay focused on solving the specific errors shown in the logs.

Execute all commands, write all required files, and finish with a successful build.
`;
  }

  private static getPersonaInstructions(persona: string): string {
    const guides: Record<string, string> = {
      'Minimalist': 'Use vast white space, thin typography (Inter/system-ui), subtle grays, and a single accent color. Avoid heavy shadows or complex gradients.',
      'Cyberpunk': 'Use a dark/black background by default. Incorporate neon accent colors (#00ff00, #ff00ff, #00ffff). Add glitch effects, glassmorphism, and neon glow/shadows.',
      'Corporate': 'Use clean, structured layouts. Trustworthy blues and grays. Sharp edges, professional sans-serif fonts, and clear call-to-action buttons.',
      'Modern': 'Use rounded corners, soft shadows, vibrant gradients, and fluid animations (Framer Motion). Follow current landing page trends like bento grids or glass cards.',
      'Retro 80s': 'Use vibrant neon pinks, purples, and yellows. Incorporate grid patterns, pixel art elements, bold/blocky typography, and VHS-style glitch overlays.',
      'Eco-Friendly': 'Use earthy tones (sage green, soft browns, creams). Incorporate organic, rounded shapes, leaf/nature icons, and paper-like textures. Use high-quality environmental imagery.',
      'Luxury': 'Use a sophisticated color palette (Gold on Black, or Cream on Deep Navy). Use elegant Serif typography (Playfair Display style), thin borders, and high-fashion/minimalist imagery.',
      'SaaS Landing': 'Use the "Linear" or "Stripe" look: Deep dark backgrounds with subtle purple/blue gradients. Use sleek bento box layouts, clean sans-serif fonts, and subtle micro-shadows for depth.'
    };
    return guides[persona] || 'Maintain a clean, professional React/Tailwind design.';
  }
}
