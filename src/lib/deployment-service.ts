import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

import { config } from './config.js';

export interface DeploymentResult {
  url: string;
  siteId?: string;
}

export interface DeploymentService {
  deploy(sitePath: string, siteName: string, siteId?: string): Promise<DeploymentResult>;
}

export class NetlifyDeploymentService implements DeploymentService {
  private authToken: string;

  constructor() {
    const token = config.netlifyAuthToken;
    if (!token) {
      throw new Error('NETLIFY_AUTH_TOKEN is not set in environment variables');
    }
    this.authToken = token;
  }

  private async getAccountSlug(): Promise<string> {
    try {
      const { stdout } = await execAsync(`npx netlify api listAccountsForUser --auth="${this.authToken}"`);
      const accounts = JSON.parse(stdout);
      if (accounts && accounts.length > 0) {
        return accounts[0].slug;
      }
    } catch (e) {
      console.warn('[DeploymentService] Failed to detect Netlify account slug automatically.');
    }
    return '';
  }

  async deploy(sitePath: string, siteName: string, siteId?: string): Promise<DeploymentResult> {
    const maxRetries = 1; // Runner now handles retries with AI
    let attempt = 0;
    let currentSiteIdentifier = siteId || siteName;
    const teamSlug = await this.getAccountSlug();
    const teamFlag = teamSlug ? `--team="${teamSlug}"` : '';

    while (attempt < maxRetries) {
      try {
        console.log(`[DeploymentService] Attempting deployment to site: ${currentSiteIdentifier} (Attempt ${attempt + 1})`);
        
        const distPath = path.join(sitePath, 'dist');
        const cmd = `npx netlify deploy --dir="dist" --prod --site="${currentSiteIdentifier}" --auth="${this.authToken}" --no-build --json ${teamFlag}`;
        
        try {
          const { stdout } = await execAsync(cmd, { cwd: sitePath, timeout: 300000 });
          const result = JSON.parse(stdout);
          return {
            url: result.url || result.deploy_url,
            siteId: result.site_id
          };
        } catch (error: any) {
          const stderr = error.stderr || '';
          const stdout = error.stdout || '';
          const fullOutput = stdout + stderr;

          // Check for "already taken" or "conflict" (422)
          if (fullOutput.toLowerCase().includes('already exists') || 
              fullOutput.toLowerCase().includes('already taken') || 
              fullOutput.includes('422') ||
              fullOutput.includes('Conflict') ||
              fullOutput.includes('is already taken') ||
              fullOutput.includes('DEPLOYMENT_NAMING_CONFLICT')) {
            throw new Error('DEPLOYMENT_NAMING_CONFLICT');
          }

          // Check if site doesn't exist - try creating it
          // ONLY try creating if we were using a name, not a UUID (or if name lookup failed)
          if (fullOutput.includes('Project not found') || fullOutput.includes('Could not find site')) {
            console.log(`[DeploymentService] Site ${currentSiteIdentifier} not found, creating new site...`);
            const createCmd = `npx netlify deploy --dir="dist" --prod --create-site="${siteName}" --auth="${this.authToken}" --no-build --json ${teamFlag}`;
            try {
              const { stdout: createStdout } = await execAsync(createCmd, { cwd: sitePath, timeout: 300000 });
              const result = JSON.parse(createStdout);
              return {
                url: result.url || result.deploy_url,
                siteId: result.site_id
              };
            } catch (createError: any) {
              const createFullOutput = (createError.stdout || '') + (createError.stderr || '');
              if (createFullOutput.toLowerCase().includes('already exists') || 
                  createFullOutput.toLowerCase().includes('already taken') ||
                  createFullOutput.includes('is already taken')) {
                throw new Error('DEPLOYMENT_NAMING_CONFLICT');
              }
              throw createError;
            }
          }

          throw error;
        }
      } catch (error: any) {
        if (error.message === 'DEPLOYMENT_NAMING_CONFLICT') {
          throw error; // Let the runner handle it
        }

        if (attempt >= maxRetries - 1) {
          console.error('Netlify deployment failed after retries:', error);
          throw new Error(`Deployment failed: ${error.message}`);
        }
        attempt++;
      }
    }

    throw new Error('Deployment failed: maximum retries reached');
  }
}
