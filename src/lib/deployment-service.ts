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
  deploy(sitePath: string, siteName: string): Promise<DeploymentResult>;
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

  async deploy(sitePath: string, siteName: string): Promise<DeploymentResult> {
    const maxRetries = 3;
    let currentSiteName = siteName;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        console.log(`[DeploymentService] Attempting deployment to site: ${currentSiteName} (Attempt ${attempt + 1})`);
        
        // Try creating/deploying
        const distPath = path.join(sitePath, 'dist');
        const cmd = `npx netlify deploy --dir="dist" --prod --site="${currentSiteName}" --auth="${this.authToken}" --no-build --json`;
        
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

          // Check if site doesn't exist - try creating it
          if (stderr.includes('Project not found') || stderr.includes('Could not find site')) {
            console.log(`[DeploymentService] Site ${currentSiteName} not found, creating new site...`);
            const createCmd = `npx netlify deploy --dir="dist" --prod --create-site="${currentSiteName}" --auth="${this.authToken}" --no-build --json`;
            const { stdout: createStdout } = await execAsync(createCmd, { cwd: sitePath, timeout: 300000 });
            const result = JSON.parse(createStdout);
            return {
              url: result.url || result.deploy_url,
              siteId: result.site_id
            };
          }

          // Check for "already taken" or "conflict"
          if (stderr.includes('already exists') || stderr.includes('already taken') || stderr.includes('422') || stdout.includes('already exists')) {
            console.warn(`[DeploymentService] Subdomain ${currentSiteName} is already taken or conflict occurred.`);
            attempt++;
            const shortId = Math.random().toString(36).substring(2, 6);
            currentSiteName = `${siteName}-${shortId}`;
            continue; // Retry with new name
          }

          throw error;
        }
      } catch (error: any) {
        if (attempt >= maxRetries - 1) {
          console.error('Netlify deployment failed after retries:', error);
          throw new Error(`Deployment failed after ${maxRetries} attempts: ${error.message}`);
        }
        attempt++;
        const shortId = Math.random().toString(36).substring(2, 6);
        currentSiteName = `${siteName}-${shortId}`;
      }
    }

    throw new Error('Deployment failed: maximum retries reached');
  }
}
