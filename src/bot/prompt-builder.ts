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
        logoInstruction = `- **LOGO**: A logo file has been placed at \`${logoAsset.content}\` in the public folder. Use it in the appropriate brand position.`;
      }
    }

    const galleryInstructions = galleryAssets.length > 0 
      ? galleryAssets.map((a, i) => {
          const hint = a.usageHint ? ` (suggested use: ${a.usageHint})` : '';
          if (a.source === 'text') {
            return `- **IMAGE ${i+1}**${hint}: Description: "${a.content}".`;
          } else {
            return `- **IMAGE ${i+1}**${hint}: Local asset at \`${a.content}\`. Use it ONLY where contextually appropriate — do not reuse the same image across multiple sections.`;
          }
        }).join('\n')
      : '- **NO IMAGES PROVIDED**: Use high-quality Unsplash URLs (https://images.unsplash.com/...) with context-aware keywords relevant to each section\'s content. Choose different images for different sections.';

    const designSkills = getDesignSkills(spec.persona);

    return `
You are an **Autonomous System Architect**. You have full shell access to the current directory.
Your task is to build a premium, high-fidelity website named "${spec.name}" from scratch.

### ORIGINAL USER REQUEST (HIGHEST PRIORITY):
"""
${spec.description}
"""
> This is the user's exact request. Every piece of data, name, copy, and requirement here is ABSOLUTE TRUTH.
> - Use all names, text, prices, and details VERBATIM.
> - Do NOT hallucinate content not present in this request.
> - Do NOT add sections, features, or components the user did not ask for.
> - Build ONLY what was requested, elevated to premium quality.

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

**NOTE**: Your terminal output is being streamed LIVE to the user. Provide clear status updates for each step.

${designSkills}

### Design Identity to Implement:
- **Tone**: ${spec.branding?.tone || 'Professional & Modern'}
${spec.persona ? `- **Design Persona**: ${spec.persona}` : ''}
${spec.personaStyleGuide ? `- **Persona Style Guide**: ${spec.personaStyleGuide}` : '- **Style Guide**: Maintain a clean, professional React/Tailwind design.'}
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

**ASSET STRATEGY**:
- Each provided asset should be used ONCE in its most contextually appropriate location. Do NOT place the same image across multiple sections.
- If a section needs an image but none was provided for it, use a high-quality Unsplash URL with keywords relevant to that specific section's content.
- When referencing local assets from the \`public/\` folder, explore the folder to verify file names and extensions. Fix any path issues yourself — do not leave broken image references.

### Visual Anchor: Asset Matching
${logoAsset || galleryAssets.length > 0 ? `
- **INCORPORATION**: You have been provided with specific brand assets. Analyze the palette, style, and "vibe" of the logo and images.
- **COHESION**: Your design (colors, spacing, typography) MUST be a sophisticated extension of these assets. 
- **ALIGNMENT**: If the logo is minimalist, keep the UI minimalist. If the images are vibrant/organic, use similar gradients and shapes.
` : '- **GENERIC ALIGNMENT**: Since no custom assets were provided, follow the Persona Style Guide strictly to create a cohesive brand from scratch.'}

### Frontend Design Principles:
- **One Composition**: The first viewport must read as a single composition, not a dashboard. On landing pages, the hero image should be a dominant edge-to-edge visual plane or background unless the design system clearly requires something else. Do not use generic hero overlays (floating badges, stickers) on top of media.
- **Brand First**: The brand or product name must be a hero-level signal. Focus the first viewport on the brand, one headline, a short supporting sentence, and one CTA group.
- **Cards Rule**: Default to no cards. Never use cards in the hero. Cards are allowed only when they are the container for a user interaction.
- **One Job Per Section**: Each section should have one purpose, one headline, and usually one short supporting sentence. Do not clutter sections with pill clusters, stat strips, or overlapping blocks.
- **Design System Adherence**: Establish a clear design system with variables for background, surface, primary text, muted text, and accent. Define typography roles (display, headline, body).
- **Structure as Narrative**: Structure the page as a narrative: Hero -> Supporting imagery -> Context/Detail -> Social proof -> Final CTA.
- **Ground Content**: Ground the design in real content from the user's request. Avoid generic placeholder patterns.
- **DESIGN COMMITMENT**: Follow the "${spec.persona || 'Modern Minimalist'}" identity with extreme conviction.
- **ANTI-PATTERN**: AVOID the "generic AI startup" look (purple gradients on white, standard Inter font, 3-column feature grid) unless specifically required.

Execute all commands, write all files, and finish with a successful build.
`;
  }

  static buildIterationPrompt(spec: SiteSpec, instruction: string, newAssets: Asset[] = []): string {
    const assetInstructions = newAssets.map((a, i) => {
      const hint = a.usageHint ? ` (suggested use: ${a.usageHint})` : '';
      if (a.source === 'text') return `- **NEW IMAGE ${i+1}**${hint}: Description: "${a.content}".`;
      return `- **NEW IMAGE ${i+1}**${hint}: Local asset at \`${a.content}\`. Use it where contextually appropriate.`;
    }).join('\n');

    const designSkills = getDesignSkills(spec.persona);

    return `
You are an **Autonomous System Architect** iterating on an existing Vite/React website named "${spec.name}".
The project is already initialized and configured in the current directory.

### YOUR TASK:
1. **STUDY THE PROJECT**: Before making any changes, explore the existing project completely — read the source files, check the \`public/\` folder for assets, understand the design system, component structure, and routing.
2. **IMPLEMENTATION**: Apply the following **specific** changes/modifications as requested by the user:
> "${instruction}"

${newAssets.length > 0 ? `### NEW ASSETS PROVIDED:
${assetInstructions}

**ASSET STRATEGY**: 
1. Use each new asset ONLY where the user's instruction indicates or where it contextually fits best.
2. Do NOT insert new assets across the whole site. Find the single most logical placement.
3. Leave all existing images UNTOUCHED unless the user explicitly asks to replace them.
4. Do NOT use a new image as a global background unless explicitly asked.
` : ''}

**SELF-RESOLUTION DIRECTIVE**:
- If you encounter broken images, incorrect asset paths, missing file extensions, or any asset-related issues while working, FIX THEM YOURSELF by inspecting the \`public/\` folder and correcting references in the code.
- If an image is needed for a section but no suitable local asset exists and none was provided, use a relevant high-quality Unsplash URL (https://images.unsplash.com/...) with keywords relevant to that section's content.
- Do not leave broken \`<img>\` tags or placeholder asset references.

${designSkills}

### DESIGN CONTINUITY:
1. **RESPECT THE AESTHETIC**: Deeply analyze and adhere to the existing color palette, typography (font-families, sizes, weights), spacing, and visual "vibe" found in the provided source code.
2. **STYLE MATCHING**: Any new components or sections MUST be stylistically seamless with the rest of the site. If the site is minimal, keep new additions minimal. If it's vibrant, match that energy.
3. **NO UNSOLICITED CHANGES**: Do NOT change the theme, primary colors, or fonts unless the user explicitly asked to modify the design identity.

### CRITICAL CONSTRAINTS:
1. **DO NOT OVERCOMPLICATE**: Implement EXACTLY what the user requested. Do not invent new features, complex state, or animations unless explicitly asked.
2. **TARGETED MODIFICATIONS ONLY**: ONLY modify the specific components, sections, or logic mentioned in the user's request. Leave everything else EXACTLY as it is.
3. **NO UNNECESSARY REFACTORS**: Do not refactor, rename, or restructure existing code unless strictly required.
4. **PRESERVE UNRELATED SECTIONS**: If the user asks to change a specific section, do NOT touch other sections.
5. **PRESERVE ASSETS**: Do NOT delete or rename existing files in the \`public/\` folder unless instructed.
6. **NO RE-INITIALIZATION**: Do NOT run \`npm create vite\`.
7. **STABILITY**: Ensure the site remains functional. After making changes, run \`npm run build\` to verify.

Execute all commands necessary, write the complete modified files, and finish with a successful build.
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
- If errors relate to asset paths or missing images, inspect the \`public/\` folder and fix references accordingly.

Execute all commands, write all required files, and finish with a successful build.
`;
  }
}
