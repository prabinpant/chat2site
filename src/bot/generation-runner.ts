import { exec, spawn } from 'child_process';
import { promisify } from 'util';
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
    this.workspaceManager.cleanupOldSites(5); // Keep only last 5 sites to save disk space
    
    onProgress('🧠 Brainstorming site structure and creative direction...');
    const expandedSpec = await this.specExpansionService.expand(initialSpec.description);
    
    // Merge initial context with expanded details
    const spec = {
      ...expandedSpec,
      name: expandedSpec.name || initialSpec.name,
      description: initialSpec.description
    };

    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const shortId = Math.random().toString(36).substring(2, 7);
    const safeBaseName = spec.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'site';
    
    const localFolderName = `${safeBaseName}_${timestamp}_${shortId}`;
    const netlifySiteName = `${safeBaseName}-${shortId}`;

    const sitePath = this.workspaceManager.prepareSiteDirectory(localFolderName);
    
    onProgress('🚀 Autonomous Agent is building your site lifecycle (init, config, install, code, build)...');
    const pronto = PromptBuilder.build(spec);
    await this.codexService.executeAutonomousBuild(pronto, sitePath);

    onProgress('🚀 Starting development server...');
    const url = await this.startDevServer(sitePath);

    onProgress('🌐 Deploying to Netlify...');
    const deployment = await this.deploymentService.deploy(sitePath, netlifySiteName);

    return { sitePath, url, deployedUrl: deployment.url, expandedSpec: spec };
  }

  // startDevServer remains same as it needs specialized URL detection logic
  private async startDevServer(sitePath: string): Promise<string> {
    // ... (rest of startDevServer)
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
