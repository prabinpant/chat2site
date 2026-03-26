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
2. Link to them in your React components using absolute paths (\`/filename.jpg\`).`
      : 'No local assets provided. Use high-quality Unsplash URLs (https://images.unsplash.com/...) for all imagery.';

    const persona = spec.persona || 'Modern Designer';
    const designSkills = getDesignSkills(persona);

    return `
You are an **Autonomous System Architect**. You have full shell access and are responsible for the entire technical lifecycle of a premium website named "${spec.name}".

### YOUR PROJECT BRAIN: **memory.md**
You MUST read \`memory.md\` in your current directory. It contains your vision, design strategy, and any reference URLs you need to research. 
**Follow its strategic plan as your primary directive.**

### YOUR LIFECYCLE:
1. **Research & Discovery**: Read \`memory.md\`. Use \`curl\`, \`web search\`, or browsing tools to study any reference sites mentioned. Extract REAL textual copy, service lists, about info, and license numbers. 
2. **Setup**: Use \`npm create vite@latest . -- --template react-ts\`. Configure Tailwind CSS v3 and PostCSS.
3. **Asset Management**: Move provided assets to \`public/\`.
4. **Implementation**: Build a premium, responsive \`src/App.tsx\`. 

### CRITICAL: BRAND EMBODIMENT PROTOCOL
- **YOU ARE THE BUSINESS**: Write all copy exactly as if you were the business owner. Use "We", "I", "Our".
- **NO META-COMMENTARY**: Forbid any mention of "the reference site", "the original site", "the redesign", or "according to research" in the actual user-facing code.
- **NO THOUGHT LEAKAGE**: Do NOT use strategic reasoning from \`memory.md\` (e.g., "The site needed to sell trust...") as actual website text. Every sentence on the site must be a direct marketing statement or factual info about the services.
- **REAL DATA**: Extract REAL contents (from \`curl\` or search) rather than hallucinating industry boilerplate.

${designSkills}

${assetInstructions}

### CONSTRAINTS:
- **NO THOUGHTS IN UI**: Never leak internal reasoning into components.
- **PURE AUTONOMY**: No spoon-feeding. Research everything, build everything.

Execute all commands and finish with a successful build.
`;
  }

  static buildIterationPrompt(spec: SiteSpec, instruction: string, newAssets: Asset[] = []): string {
    const assetInstructions = newAssets.length > 0 
      ? `### NEW ASSETS: Move these to \`public/\` and integrate into the changes.`
      : '';

    const persona = spec.persona || 'Modern Designer';
    const designSkills = getDesignSkills(persona);

    return `
You are an **Autonomous System Architect** iterating on "${spec.name}".

### YOUR UPDATE BRAIN: **memory.md**
Read \`memory.md\` first for the updated strategy and context.

### BRAND EMBODIMENT & TRUTH:
- **NO META-REFERENCES**: Do not mention "reference site", "original site", or "redesign" in the UI.
- **FIRST PERSON**: Speak as the business proprietor.
- **REAL CONTENT**: Pull actual data from reference sources. Do not hallucinate content.

### YOUR TASK:
1. **IMPLEMENTATION**: Apply: "${instruction}"
2. **CONTINUITY**: Adhere to the existing design system.

${assetInstructions}

${designSkills}

### CONSTRAINTS:
- **NO THOUGHTS IN UI**.
- **STABILITY**: Ensure \`npm run build\` passes.

Execute all commands and finish with a successful build.
`;
  }

  static buildRepairPrompt(originalPrompt: string, errorLogs: string): string {
    return `
You are an **Autonomous System Architect** repairing a failed build.
### YOUR REPAIR TASK:
1. **ANALYZE**: Read logs below.
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
