import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';
import { WorkspaceManager } from './workspace-manager.js';
import { PromptBuilder } from './prompt-builder.js';
import { SiteSpec, Asset } from './types.js';
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
    const spec: SiteSpec = {
      ...expandedSpec,
      name: initialSpec.name || expandedSpec.name,
      description: initialSpec.description,
      preferredSubdomain: initialSpec.preferredSubdomain,
      assets: initialSpec.assets || []
    };

    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const shortId = Math.random().toString(36).substring(2, 7);
    const safeBaseName = spec.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'site';
    
    const localFolderName = `${safeBaseName}_${timestamp}_${shortId}`;
    const netlifySiteName = spec.preferredSubdomain || `${safeBaseName}-${shortId}`;

    const sitePath = this.workspaceManager.prepareSiteDirectory(localFolderName);
    
    // Handle Assets
    if (spec.assets && spec.assets.length > 0) {
      onProgress('🖼️ Preparing your custom assets/logo...');
      const publicPath = path.join(sitePath, 'public');
      await fs.mkdir(publicPath, { recursive: true });

      for (let i = 0; i < spec.assets.length; i++) {
        const asset = spec.assets[i];
        if (asset.source === 'file') {
          const extension = asset.type === 'logo' ? 'png' : 'jpg'; // Simple guess
          const fileName = asset.type === 'logo' ? `logo.${extension}` : `asset_${i}.${extension}`;
          const filePath = path.join(publicPath, fileName);
          
          try {
            const response = await fetch(asset.content);
            const arrayBuffer = await response.arrayBuffer();
            await fs.writeFile(filePath, Buffer.from(arrayBuffer));
            asset.content = `/${fileName}`; // Update to root-relative path for Vite public folder
          } catch (e) {
            console.error(`Failed to download asset ${asset.content}`, e);
          }
        }
      }
    }

    onProgress('🚀 Autonomous Agent is building your site lifecycle (init, config, install, code, build)...');
    const pronto = PromptBuilder.build(spec);
    await this.executeWithRepair(pronto, sitePath, onProgress);

    onProgress('🚀 Starting development server...');
    const url = await this.startDevServer(sitePath);

    onProgress('🌐 Deploying to Netlify...');
    const deployment = await this.deploymentService.deploy(sitePath, netlifySiteName);

    // Save metadata for future iterations
    const finalSpec = { ...spec, preferredSubdomain: netlifySiteName };
    this.workspaceManager.saveMetadata(sitePath, finalSpec);

    return { sitePath, url, deployedUrl: deployment.url, expandedSpec: spec };
  }

  async iterate(sitePath: string, instruction: string, onProgress: (status: string) => void, newAssets: Asset[] = []) {
    onProgress('🔍 Loading site metadata...');
    const spec = this.workspaceManager.loadMetadata(sitePath) as SiteSpec;
    if (!spec) throw new Error('Site metadata not found');

    // Handle New Assets for Iteration
    if (newAssets.length > 0) {
      onProgress('🖼️ Processing new images for the update...');
      const publicPath = path.join(sitePath, 'public');
      await fs.mkdir(publicPath, { recursive: true });

      for (let i = 0; i < newAssets.length; i++) {
        const asset = newAssets[i];
        if (asset.source === 'file') {
          const fileName = `update_${Date.now()}_${i}.jpg`;
          const filePath = path.join(publicPath, fileName);
          
          try {
            const response = await fetch(asset.content);
            const arrayBuffer = await response.arrayBuffer();
            await fs.writeFile(filePath, Buffer.from(arrayBuffer));
            asset.content = `/${fileName}`;
          } catch (e) {
            console.error(`Failed to download update asset ${asset.content}`, e);
          }
        }
      }
    }

    onProgress('🧠 Building update strategy...');
    const prompt = PromptBuilder.buildIterationPrompt(spec, instruction, newAssets);

    onProgress('🛠️  AI is applying specific changes...');
    await this.executeWithRepair(prompt, sitePath, onProgress);

    onProgress('🚀 Redeploying updates...');
    const siteName = spec.preferredSubdomain || path.basename(sitePath);
    const deployment = await this.deploymentService.deploy(sitePath, siteName);

    onProgress('✅ Update complete!');
    return {
      url: deployment.url,
      deployedUrl: deployment.url
    };
  }

  /**
   * Executes a build with a 1-retry repair loop if failure occurs
   */
  private async executeWithRepair(prompt: string, sitePath: string, onProgress: (status: string) => void) {
    try {
      await this.codexService.executeAutonomousBuild(prompt, sitePath);
    } catch (error: any) {
      const logs = error.output || 'No logs available';
      console.warn('First build attempt failed. Attempting automatic repair...', logs.slice(-200));
      
      onProgress('🩹 Build failed. AI is analyzing logs and attempting an automatic repair...');
      
      // Extract last 50 lines of logs for context
      const relevantLogs = logs.split('\n').slice(-50).join('\n');
      const repairPrompt = PromptBuilder.buildRepairPrompt(relevantLogs);
      
      try {
        await this.codexService.executeAutonomousBuild(repairPrompt, sitePath);
        onProgress('✅ Repair successful!');
      } catch (retryError) {
        onProgress('❌ Repair attempt failed. Reporting final error.');
        throw retryError;
      }
    }
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
