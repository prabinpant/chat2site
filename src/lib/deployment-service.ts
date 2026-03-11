import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

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
    const token = process.env.NETLIFY_AUTH_TOKEN;
    if (!token) {
      throw new Error('NETLIFY_AUTH_TOKEN is not set in environment variables');
    }
    this.authToken = token;
  }

  async deploy(sitePath: string, siteName: string): Promise<DeploymentResult> {
    try {
      // Step 1: Initialize sub-project if needed or just use current build
      // We assume the site is already built in the 'dist' folder
      
      console.log(`Deploying ${siteName} from ${sitePath} to Netlify...`);

      // Using Netlify CLI to deploy
      // --dir specifies the build directory
      // --prod makes it a production deploy
      // --name sets the site name (will create if doesn't exist)
      // --auth provides the token
      
      const distPath = path.join(sitePath, 'dist');
      const cmd = `npx netlify deploy --dir="${distPath}" --prod --name="${siteName}" --auth="${this.authToken}" --json`;
      
      const { stdout } = await execAsync(cmd);
      const result = JSON.parse(stdout);

      return {
        url: result.url || result.deploy_url,
        siteId: result.site_id
      };
    } catch (error) {
      console.error('Netlify deployment failed:', error);
      throw new Error(`Deployment failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
