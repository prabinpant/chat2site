import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';
import { WorkspaceManager } from './workspace-manager.js';
import { PromptBuilder } from './prompt-builder.js';
import { SiteSpec, Asset } from './types.js';
import { AIService } from '../lib/ai-service.js';
import { AIServiceFactory } from '../lib/ai-service-factory.js';
import { NetlifyDeploymentService } from '../lib/deployment-service.js';
import { SpecExpansionService } from '../lib/spec-expansion-service.js';
import { ReferenceService, ReferenceData } from '../lib/reference-service.js';
import { versionService } from '../lib/version-service.js';

export class GenerationRunner {
  private workspaceManager: WorkspaceManager;
  private aiService: AIService;
  private deploymentService: NetlifyDeploymentService;
  private specExpansionService: SpecExpansionService;
  private referenceService: ReferenceService;

  constructor() {
    this.workspaceManager = new WorkspaceManager();
    this.aiService = AIServiceFactory.create();
    this.deploymentService = new NetlifyDeploymentService();
    this.specExpansionService = new SpecExpansionService();
    this.referenceService = new ReferenceService();
  }

  async run(initialSpec: SiteSpec, onProgress: (status: string) => Promise<void> | void): Promise<{ sitePath: string; url?: string; deployedUrl?: string; expandedSpec: SiteSpec; version?: string }> {
    // Detect all reference URLs in the prompt
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = Array.from(new Set(initialSpec.description?.match(urlRegex) || []));

    if (urls.length > 0) {
      await onProgress(`🔍 Detected ${urls.length} reference site(s). Delegating research to AI Architect...`);
    }

    await onProgress('🧠 Brainstorming site structure and comparative strategy...');
    const expandedSpec = await this.specExpansionService.expand(
      initialSpec.description || '', 
      initialSpec.assets || [], 
      urls // Pass raw URLs instead of referenceData
    );
    
    // AI now decides id, name, and subdomain
    const sitePath = this.workspaceManager.prepareSiteDirectory(expandedSpec.id);
    
    try {
      // Persist the strategic memory
      await fs.writeFile(path.join(sitePath, 'memory.md'), expandedSpec.memory);

      // Handle Assets
      if (expandedSpec.assets && expandedSpec.assets.length > 0) {
        await onProgress('🖼️ Preparing your custom assets/logo...');
        const publicPath = path.join(sitePath, 'public');
        await fs.mkdir(publicPath, { recursive: true });

        for (let i = 0; i < expandedSpec.assets.length; i++) {
          const asset = expandedSpec.assets[i];
          if (asset.source === 'file') {
            const extension = asset.type === 'logo' ? 'png' : 'jpg';
            let fileName: string = asset.type === 'logo' 
              ? `logo.${extension}` 
              : `image_${asset.usageHint?.replace(/[^a-z0-9]+/gi, '_') || i}.${extension}`;
            
            const filePath = path.join(publicPath, fileName);
            
            try {
              let buffer: Buffer;
              if (asset.content.startsWith('http')) {
                const response = await fetch(asset.content);
                const arrayBuffer = await response.arrayBuffer();
                buffer = Buffer.from(arrayBuffer);
              } else {
                buffer = await fs.readFile(asset.content);
              }
              await fs.writeFile(filePath, buffer);
              asset.content = `/${fileName}`; 
            } catch (e) {
              console.error(`Failed to process asset ${asset.content}`, e);
            }
          }
        }
      }

      await onProgress('🚀 Autonomous Agent is building your site lifecycle (init, config, install, code, build)...');
      const pronto = PromptBuilder.build(expandedSpec);
      await this.executeWithRepair(pronto, sitePath, onProgress);

      await onProgress('🚀 Starting development server...');
      const url = await this.startDevServer(sitePath);

      await onProgress('🌐 Deploying to Netlify...');
      const deployment = await this.deploymentService.deploy(sitePath, expandedSpec.preferredSubdomain);

      // Save metadata for future iterations (syncing with netlify slug)
      const finalSpec = { ...expandedSpec, preferredSubdomain: deployment.siteId || expandedSpec.preferredSubdomain };
      this.workspaceManager.saveMetadata(sitePath, finalSpec);

      await onProgress('📦 Initializing version control (v1)...');
      await versionService.initVersionControl(sitePath, expandedSpec.name);

      return { sitePath, url, deployedUrl: deployment.url, expandedSpec: finalSpec, version: 'v1' };
    } catch (error) {
       throw error;
    }
  }

  async iterate(sitePath: string, instruction: string, onProgress: (status: string) => Promise<void> | void, newAssets: Asset[] = []) {
    await onProgress('🔍 Loading site memory and identity...');
    const spec = this.workspaceManager.loadMetadata(sitePath) as SiteSpec;
    if (!spec) throw new Error('Site metadata not found');

    let previousMemory = '';
    try {
      previousMemory = await fs.readFile(path.join(sitePath, 'memory.md'), 'utf-8');
    } catch (e) {
      console.warn('Memory file not found, continuing with metadata brain.');
      previousMemory = spec.memory || '';
    }

    // Handle New Assets for Iteration
    if (newAssets.length > 0) {
      await onProgress('🖼️ Processing new images for the update...');
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

    // Detect new reference URLs in the update instruction
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const newUrls = Array.from(new Set(instruction.match(urlRegex) || []));

    await onProgress('🧠 Brainstorming update strategy based on memory...');
    const expandedSpec = await this.specExpansionService.expand(
      instruction, 
      [...(spec.assets || []), ...newAssets], 
      newUrls, 
      previousMemory
    );

    // Update memory file
    await fs.writeFile(path.join(sitePath, 'memory.md'), expandedSpec.memory);

    await onProgress('🛠️  AI is applying specific changes...');
    const prompt = PromptBuilder.buildIterationPrompt(expandedSpec, instruction, newAssets);
    await this.executeWithRepair(prompt, sitePath, onProgress);

    await onProgress('🚀 Redeploying updates...');
    const deployment = await this.deploymentService.deploy(sitePath, expandedSpec.preferredSubdomain);

    await onProgress('📦 Saving new version...');
    const newVersion = await versionService.commitNewVersion(sitePath, expandedSpec.name);

    await onProgress('✅ Update complete!');
    return {
      url: deployment.url,
      deployedUrl: deployment.url,
      version: newVersion
    };
  }

  async revertAndDeploy(sitePath: string, version: string, onProgress: (status: string) => Promise<void> | void): Promise<{ deployedUrl?: string }> {
    await onProgress(`🔄 Reverting site to ${version}...`);
    const spec = this.workspaceManager.loadMetadata(sitePath) as SiteSpec;
    if (!spec) throw new Error('Site metadata not found');
    
    const siteName = spec.name || path.basename(sitePath);
    const newVersion = await versionService.revertToVersion(sitePath, siteName, version);
    
    await onProgress(`📦 Reverted to ${version} (saved as ${newVersion}). Cleaning and reinstalling dependencies...`);
    const execAsync = promisify(exec);

    // Clean stale dist/ and node_modules (dependencies may differ between versions)
    const distPath = path.join(sitePath, 'dist');
    const nodeModulesPath = path.join(sitePath, 'node_modules');
    await fs.rm(distPath, { recursive: true, force: true }).catch(() => {});
    await fs.rm(nodeModulesPath, { recursive: true, force: true }).catch(() => {});

    await execAsync('npm install', { cwd: sitePath, timeout: 120000 });

    await onProgress('🔨 Rebuilding from reverted source...');
    await execAsync('npm run build', { cwd: sitePath, timeout: 120000 });
    
    await onProgress('🚀 Redeploying reverted version...');
    const netlifySiteName = spec.preferredSubdomain || path.basename(sitePath);
    const deployment = await this.deploymentService.deploy(sitePath, netlifySiteName);
    
    await onProgress('✅ Revert and deployment complete!');
    return { deployedUrl: deployment.url };
  }

  /**
   * Executes a build with a 1-retry repair loop if failure occurs
   */
  private async executeWithRepair(prompt: string, sitePath: string, onProgress: (status: string) => Promise<void> | void) {
    try {
      await this.aiService.executeAutonomousBuild(prompt, sitePath);
    } catch (error: any) {
      const logs = error.output || 'No logs available';
      console.warn('First build attempt failed. Attempting automatic repair...', logs.slice(-200));
      
      await onProgress('🩹 Build failed. AI is analyzing logs and attempting an automatic repair...');
      
      // Extract last 50 lines of logs for context
      const relevantLogs = logs.split('\n').slice(-50).join('\n');
      const repairPrompt = PromptBuilder.buildRepairPrompt(prompt, relevantLogs);
      
      try {
        await this.aiService.executeAutonomousBuild(repairPrompt, sitePath);
        await onProgress('✅ Repair successful!');
      } catch (retryError) {
        await onProgress('❌ Repair attempt failed. Reporting final error.');
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
