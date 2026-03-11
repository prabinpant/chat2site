import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { WorkspaceManager } from './workspace-manager.js';
import { PromptBuilder } from './prompt-builder.js';
import { SiteSpec } from './types.js';
import { CodexService } from '../lib/codex-service.js';
import { NetlifyDeploymentService } from '../lib/deployment-service.js';
import { SpecExpansionService } from '../lib/spec-expansion-service.js';

const execAsync = promisify(exec);

export class GenerationRunner {
  private workspaceManager: WorkspaceManager;
  private codexService: CodexService;
  private deploymentService: NetlifyDeploymentService;
  private specExpansionService: SpecExpansionService;

  constructor() {
    this.workspaceManager = new WorkspaceManager();
    this.codexService = new CodexService();
    this.deploymentService = new NetlifyDeploymentService();
    this.specExpansionService = new SpecExpansionService();
  }

  async run(initialSpec: SiteSpec, onProgress: (status: string) => void): Promise<{ sitePath: string; url?: string; deployedUrl?: string; expandedSpec: SiteSpec }> {
    onProgress('🧠 Brainstorming site structure and creative direction...');
    const expandedSpec = await this.specExpansionService.expand(initialSpec.description);
    
    // Merge initial context with expanded details
    const spec = {
      ...expandedSpec,
      name: expandedSpec.name || initialSpec.name,
      description: initialSpec.description
    };

    onProgress('🧠 Generating premium code with Codex...');
    
    // Potential for AI image generation here based on spec.imagery.keywords
    // For now we'll pass the intent to the prompt as well
    const prompt = PromptBuilder.build(spec);
    const generatedCode = await this.codexService.generateCode(prompt);

    onProgress('📂 Creating workspace...');
    
    // Generate a unique identifier for local folder and Netlify site
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const shortId = Math.random().toString(36).substring(2, 7);
    const safeBaseName = spec.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'site';
    
    const localFolderName = `${safeBaseName}_${timestamp}_${shortId}`;
    const netlifySiteName = `${safeBaseName}-${shortId}`;

    const sitePath = this.workspaceManager.createSiteWorkspace(localFolderName);
    
    if (spec.extraDependencies && Object.keys(spec.extraDependencies).length > 0) {
      onProgress('🔧 Configuring project dependencies...');
      this.workspaceManager.updateDependencies(sitePath, spec.extraDependencies);
    }

    this.workspaceManager.injectCode(sitePath, generatedCode);

    onProgress('📦 Installing dependencies (this takes a moment)...');
    await this.installDependencies(sitePath);

    onProgress('🚀 Starting development server...');
    const url = await this.startDevServer(sitePath);

    onProgress('🔨 Building site for production...');
    await this.buildSite(sitePath);

    onProgress('🌐 Deploying to Netlify...');
    const deployment = await this.deploymentService.deploy(sitePath, netlifySiteName);

    return { sitePath, url, deployedUrl: deployment.url, expandedSpec: spec };
  }

  private async buildSite(sitePath: string): Promise<void> {
    try {
      await execAsync('npm run build', { cwd: sitePath });
    } catch (error) {
      console.error('Failed to build site:', error);
      throw new Error('Site build failed');
    }
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
