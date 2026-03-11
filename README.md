# 🚀 Autonomous AI Website Builder (Prompt2Site)

An autonomous AI system that transforms simple Telegram prompts into high-fidelity, deployed React/Tailwind websites. See [ARCHITECTURE.md](ARCHITECTURE.md) for a deep dive into how the system works.

## ✨ Key Features

- **Autonomous Agent**: Codex drives the entire project lifecycle—from `npm create vite` and dependency installation to writing premium code and building for production.
- **Multi-Step Intake**: A guided Telegram bot flow (`/build`) collects project names, custom subdomains, and visual assets.
- **Asset Support**: Upload logos and gallery images or provide text descriptions for the AI to interpret.
- **Iterative Updates**: Refine your site after building! Use `/update <siteId> <instructions>` to modify specific parts of your site without a full rebuild.
- **Smart Deployment**: Automatic deployment to Netlify with intelligent subdomain conflict resolution.
- **Site Management**: Keep track of all your projects with the `/list` command.

## 🛠️ Technology Stack

- **Bot**: [Telegraf](https://telegraf.js.org/) (Node.js)
- **AI Engine**: Codex (Autonomous Shell Access)
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion + Lucide Icons
- **Infrastructure**: Netlify CLI (Automated Deployments)

## 🎮 How to Use

1. **Start the Bot**: Send `/start` to the Telegram bot.
2. **Build a Site**: Run `/build` and follow the guided prompts:
   - Provide a site description.
   - Choose a project name and preferred subdomain.
   - Upload a logo (or describe one).
   - Upload gallery images (or describe them).
3. **Wait for Generation**: The bot will stream status updates as the Autonomous Agent initializes the project, installs dependencies, writes the code, and builds the assets.
4. **View & Update**: Once finished, you'll get a live Netlify URL and a local preview link. 
5. **Iterate**: Want to change something? Use `/update <siteId> "Make the header emerald green and add a contact form."`.

## 📂 Project Architecture

### `src/bot`
- **`index.ts`**: Main bot entry point, command handlers, and `BUILD_SCENE` wizard.
- **`generation-runner.ts`**: Orchestrates the build lifecycle (Asset preparation -> Codex Execution -> Deployment).
- **`workspace-manager.ts`**: Manages the `generated-sites/` directory and handles project metadata (`.spec.json`).
- **`prompt-builder.ts`**: Generates complex, high-context system prompts for Codex to drive the autonomous build.

### `src/lib`
- **`codex-service.ts`**: Interface for the Codex CLI with autonomous shell execution.
- **`deployment-service.ts`**: Handles Netlify site creation and deployments with retry logic for name conflicts.
- **`spec-expansion-service.ts`**: Expands raw user prompts into structured `SiteSpec` objects.

## ⚙️ Environment Variables

Create a `.env` file with the following:
```env
BOT_TOKEN=your_telegram_bot_token
NETLIFY_AUTH_TOKEN=your_netlify_personal_access_token
```

## 🚀 Getting Started

1. Install dependencies: `npm install`
2. Ensure you have the `codex` CLI and `netlify-cli` installed globally.
3. Start the bot: `npm run dev`
