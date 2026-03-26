import { SiteSpec, Asset } from './types.js';
import { getDesignSkills } from '../lib/design-skills-context.js';

export class PromptBuilder {
  static build(spec: SiteSpec): string {
    const assetInstructions = (spec.assets || []).length > 0 
      ? `### RAW ASSETS PROVIDED:
The following files have been placed in your current working directory for use:
${(spec.assets || []).map(a => `- \`${a.content}\` (Type: ${a.type})`).join('\n')}

**ASSET DIRECTIVE**: 
1. Move these files to your \`public/\` directory immediately.
2. Link to them in your React components using absolute paths (\`/filename.jpg\`).
3. If an asset is a logo, use it in the Navbar. If it's an image, use it in a relevant section.`
      : 'No local assets provided. Use high-quality Unsplash URLs (https://images.unsplash.com/...) for all imagery.';

    const persona = spec.persona || 'Modern Designer';
    const designSkills = getDesignSkills(persona);

    return `
You are an **Autonomous System Architect**. You have full shell access and are responsible for the entire technical lifecycle of a premium website named "${spec.name}".

### YOUR PROJECT BRAIN: **memory.md**
You MUST read \`memory.md\` in your current directory. It contains your vision, design strategy, and any reference URLs you need to research. 
**Follow its strategic plan as your primary directive.**

### YOUR LIFECYCLE:
1. **Research & Discovery**: Read \`memory.md\`. Use \`curl\`, \`web search\`, or browsing tools to study any reference sites mentioned. Extract brand values, layouts, and discover remote assets (logos, favicons).
2. **Setup**: Use \`npm create vite@latest . -- --template react-ts\`. Configure Tailwind CSS v3 and PostCSS.
3. **Asset Management**: Move any provided local assets to \`public/\`. Download any remote assets identified during research into \`public/\`.
4. **Implementation**: Build a premium, responsive \`src/App.tsx\` using \`lucide-react\` and \`framer-motion\`. Ensure SEO meta tags in \`index.html\` are updated.
5. **Quality Control**: Run \`npm run build\` to verify stability.

${designSkills}

${assetInstructions}

### CONSTRAINTS:
- **NO THOUGHTS IN UI**: Do NOT output internal reasoning into your components.
- **PURE AUTONOMY**: Do not ask for permission. If a dependency is missing, install it. If a file is broken, fix it.
- **VISUAL EXCELLENCE**: Aim for a "Stripe-level" or "Apple-level" premium aesthetic as guided by your memory.

Execute all commands and finish with a successful build.
`;
  }

  static buildIterationPrompt(spec: SiteSpec, instruction: string, newAssets: Asset[] = []): string {
    const assetInstructions = newAssets.length > 0 
      ? `### NEW ASSETS PROVIDED:
${newAssets.map(a => `- \`${a.content}\` (Type: ${a.type})`).join('\n')}
**DIRECTIVE**: Move these to \`public/\` and integrate them into the requested changes.`
      : '';

    const persona = spec.persona || 'Modern Designer';
    const designSkills = getDesignSkills(persona);

    return `
You are an **Autonomous System Architect** iterating on the website "${spec.name}".

### YOUR UPDATE BRAIN: **memory.md**
Read \`memory.md\` first. It has been updated with the latest strategy and historical context for this change.

### YOUR TASK:
1. **IMPLEMENTATION**: Apply the following change: "${instruction}"
2. **AGENTIC RESEARCH**: If the instruction or memory mentions new reference sources, research them before coding.
3. **CONTINUITY**: Adhere to the existing design system found in the source code.

${assetInstructions}

${designSkills}

### CONSTRAINTS:
- **NO UNNECESSARY REFACTORS**.
- **NO THOUGHTS IN UI**.
- **STABILITY**: Ensure \`npm run build\` passes.

Execute all commands and finish with a successful build.
`;
  }

  static buildRepairPrompt(originalPrompt: string, errorLogs: string): string {
    return `
You are an **Autonomous System Architect** repairing a failed build.

### YOUR REPAIR TASK:
1. **ANALYZE**: Read the logs below to find the root cause.
2. **FIX**: Edit files and resolve dependencies.
3. **VERIFY**: Ensure \`npm run build\` succeeds.

### ERROR LOGS:
\`\`\`
${errorLogs}
\`\`\`

Execute all commands and finish with a successful build.
`;
  }
}
