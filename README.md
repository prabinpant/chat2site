# 🚀 Autonomous AI Website Builder (Prompt2Site)

An autonomous AI system that transforms simple Telegram prompts into high-fidelity, deployed React/Tailwind websites. See [ARCHITECTURE.md](ARCHITECTURE.md) for a deep dive into the memory-driven pipeline.

## ✨ Key Features

- **Autonomous Agent**: Codex/Gemini drives the entire project lifecycle—from Vite initialization to writing premium React code and production builds.
- **Voice-to-Site**: Send voice messages to describe your vision. The system uses **Whisper** to transcribe instructions automatically.
- **Strategic Memory**: Built-in `memory.md` persists brand vision, persona, and customer-facing copy strategy across builds and updates.
- **Smart Deployment**: Automatic Netlify deployments with **AI-driven identity regeneration** to handle subdomain collisions gracefully.
- **Git-Based Versioning**: Every successful build is tagged in Git (`v1`, `v2`, etc.), enabling reliable rollbacks.
- **Recursive Repair Loop**: If a build fails, the system automatically analyzes error logs and attempts an AI-driven repair with a 1-retry safety net.
- **Multi-modal Updates**: Modify your site using text + images + voice. Send `/update <siteId>`, provide instructions, and upload as many photos as you want!
- **Multi-Platform Support**: Seamlessly build and update sites via **Telegram** or **WhatsApp**.
- **Data Persistence**: Site deletion is intentionally disabled to ensure every iteration is preserved.

## 🛠️ Technology Stack

- **Bots**: [Telegraf](https://telegraf.js.org/) (Telegram), Express (WhatsApp Webhook)
- **AI Engines**: 
  - **Codex**: Autonomous Shell Access (Default)
  - **Gemini**: High-speed, high-context generation via Google AI.
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Infrastructure**: Netlify CLI (Automated & Non-interactive Deployments)

## ⚙️ Setup Guide

### 1. Prerequisites
- **Node.js**: v18+ recommended.
- **CLIs**: Install `netlify-cli` globally:
  ```bash
  npm install -g netlify-cli
  ```
- **Bot Token**: Get a token from [@BotFather](https://t.me/BotFather).

### 2. Configuration
Create a `.env` file from the example:
```bash
cp .env.example .env
```
Fill in your tokens. If you experience connection issues with Telegram, ensure `TELEGRAM_API_IP` is set to `149.154.166.110`.

### 3. Installation & Running
```bash
npm install
npm run dev:bot
```

## 🎮 How to Use (Telegram)
1. **Start**: Send `/start` to your bot.
2. **Build**: Run `/build` and follow the guided wizard to pick a persona and upload images.
3. **Update**: Use `/update <siteId>` to add new images or change text. The AI remembers your site's "Memory".
4. **Revert**: Run `/revert <siteId> <version>` (e.g., `/revert my-site v1`) to rollback to a previous successful state.
5. **List**: Run `/list` to see all your deployed sites.

## 📱 WhatsApp Integration
The bot supports WhatsApp via Meta's Graph API. 
1. **Setup**: Configure your Meta for Developers dashboard with your Webhook URL.
2. **Start**: Start the webhook server: `npm run dev:whatsapp`.
3. **Usage**: Enjoy full feature parity with the Telegram version.

---

## 🛠️ Development & Isolation (Separate Folder)
To work on new features without taking down the stable bot:
1. **Clone to Dev Folder**: `./setup-dev.sh ~/path/to/dev-folder`
2. **Isolate**: Change the `BOT_TOKEN` in the new folder's `.env`.
3. **Run**: `npm run dev:bot` in the dev folder.

## 📂 Project Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md) for a detailed breakdown of the internal services, the memory-driven pipeline, and the autonomous repair loop.
