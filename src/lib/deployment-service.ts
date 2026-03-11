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
      // Adding --no-build to prevent Netlify CLI from trying to run its own build process
      // Linking to a site name with --site
      let cmd = `npx netlify deploy --dir="${distPath}" --prod --site="${siteName}" --auth="${this.authToken}" --no-build --json`;
      
      try {
        const { stdout } = await execAsync(cmd);
        const result = JSON.parse(stdout);
        return {
          url: result.url || result.deploy_url,
          siteId: result.site_id
        };
      } catch (error: any) {
        // If the site doesn't exist, try creating it and deploying in one go
        if (error.stderr && error.stderr.includes('Project not found')) {
          console.log(`Site ${siteName} not found, attempting to create and deploy...`);
          cmd = `npx netlify deploy --dir="${distPath}" --prod --create-site --name="${siteName}" --auth="${this.authToken}" --no-build --json`;
          // Wait, 'netlify deploy --create-site' doesn't take '--name' in older versions? 
          // Actually, in the latest it's --create-site [name]. Let's check help again.
          // Example was: netlify deploy --create-site my-new-site
          cmd = `npx netlify deploy --dir="${distPath}" --prod --create-site="${siteName}" --auth="${this.authToken}" --no-build --json`;
          
          const { stdout } = await execAsync(cmd);
          const result = JSON.parse(stdout);
          return {
            url: result.url || result.deploy_url,
            siteId: result.site_id
          };
        }
        throw error;
      }
    } catch (error) {
      console.error('Netlify deployment failed:', error);
      throw new Error(`Deployment failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
