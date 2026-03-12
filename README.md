# 🚀 Autonomous AI Website Builder (Prompt2Site)

An autonomous AI system that transforms simple Telegram prompts into high-fidelity, deployed React/Tailwind websites. See [ARCHITECTURE.md](ARCHITECTURE.md) for a deep dive into how the system works.

## ✨ Key Features

- **Autonomous Agent**: Codex drives the entire project lifecycle—from Vite initialization to writing premium React code and production builds.
- **Guided Intake & Personas**: Choose from design personas like **Cyberpunk**, **Minimalist**, or **Luxury** to set the visual tone.
- **Recursive Repair Loop**: If a build fails, the system automatically analyzes error logs and attempts an AI-driven repair.
- **Multi-modal Updates**: Modify your site using text + images. Send `/update <siteId>`, provide instructions, and upload as many photos as you want!
- **Automatic Deployment**: Sites are instantly live on Netlify with smart subdomain resolution.
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
   - **Pick a Design Persona** (e.g., Cyberpunk 🌆, Luxury ✨).
   - Provide a project name and subdomain.
   - Upload assets (Logo, Photos).
3. **Wait for Generation**: The bot will stream status updates. If a build error occurs, the **Repair Loop** will automatically kick in to fix it.
4. **View & Update**: Once finished, you'll get a live Netlify URL and a local preview link. 
5. **Iterate**: Want to change something? Use `/update <siteId>`. The bot will collect your text instructions and any new images you want to add!

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

## 🐳 Docker Setup

Maintain a stable instance of the bot in the background:

1. **Build and Start**:
   ```bash
   docker compose up -d
   ```
2. **View Logs**:
   ```bash
   docker compose logs -f
   ```

## 🛠️ Development Setup (Separate Folder)

To work on new features without taking down the stable bot instance:

1. **Clone the Project to a Dev Folder**:
   ```bash
   ./setup-dev.sh ~/path/to/dev-folder
   ```
2. **Configure the Dev Instance**:
   - `cd ~/path/to/dev-folder`
   - Edit the `.env` file and **change the `BOT_TOKEN`** to a different Telegram Bot Token.
3. **Environment Isolation**:
   - Run `npm install` in the dev folder.
   - Start the dev bot: `npm run dev:bot`.
   - Your dev instance will now run independently of the stable Docker container.

---

## ⚙️ Environment Variables

Create a `.env` file with the following:
```env
BOT_TOKEN=your_telegram_bot_token
NETLIFY_AUTH_TOKEN=your_netlify_personal_access_token
# OPENAI_API_KEY=your_openai_key (if needed by your specific Codex setup)
```

## 🚀 Getting Started (Manual)

1. Install dependencies: `npm install`
2. Ensure you have the `codex` CLI and `netlify-cli` installed globally.
3. Start the bot: `npm run dev:bot`
