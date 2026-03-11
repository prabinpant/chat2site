import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { WorkspaceManager } from './workspace-manager.js';
import { PromptBuilder } from './prompt-builder.js';
import { SiteSpec } from './types.js';
import { CodexService } from '../lib/codex-service.js';

const execAsync = promisify(exec);

export class GenerationRunner {
  private workspaceManager: WorkspaceManager;
  private codexService: CodexService;

  constructor() {
    this.workspaceManager = new WorkspaceManager();
    this.codexService = new CodexService();
  }

  async run(spec: SiteSpec, onProgress: (status: string) => void): Promise<{ sitePath: string; url?: string }> {
    onProgress('🧠 Generating code with Codex...');
    const prompt = PromptBuilder.build(spec);
    const generatedCode = await this.codexService.generateCode(prompt);

    onProgress('📂 Creating workspace...');
    const sitePath = this.workspaceManager.createSiteWorkspace(spec.name.toLowerCase().replace(/\s+/g, '-'));
    this.workspaceManager.injectCode(sitePath, generatedCode);

    onProgress('📦 Installing dependencies (this takes a moment)...');
    await this.installDependencies(sitePath);

    onProgress('🚀 Starting development server...');
    const url = await this.startDevServer(sitePath);

    return { sitePath, url };
  }

  private async installDependencies(sitePath: string): Promise<void> {
    try {
      await execAsync('npm install', { cwd: sitePath });
    } catch (error) {
      console.error('Failed to install dependencies:', error);
      throw new Error('Dependency installation failed');
    }
  }

  private async startDevServer(sitePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const server = spawn('npm', ['run', 'dev'], { 
        cwd: sitePath,
        shell: true
      });

      let resolved = false;

      server.stdout.on('data', (data) => {
        const output = data.toString();
        console.log(`[DevServer] ${output}`);
        
        // Find Vite's local URL (e.g., http://localhost:5173/)
        const match = output.match(/http:\/\/localhost:\d+/);
        if (match && !resolved) {
          resolved = true;
          resolve(match[0]);
        }
      });

      server.stderr.on('data', (data) => {
        console.error(`[DevServer Error] ${data}`);
      });

      server.on('error', (err) => {
        if (!resolved) reject(err);
      });

      // Timeout if server doesn't provide a URL within 20s
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve('http://localhost:5173'); // Fallback to common port
        }
      }, 20000);
    });
  }
}
