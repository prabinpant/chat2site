import { NetlifyDeploymentService } from '../lib/deployment-service.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const execAsync = promisify(exec);

async function deployExisting(dirName: string) {
  const sitePath = path.join(process.cwd(), 'generated-sites', dirName);
  const deploymentService = new NetlifyDeploymentService();

  console.log(`🚀 Starting manual deployment flow for: ${dirName}`);
  console.log(`📂 Path: ${sitePath}`);

  try {
    // Step 1: Build site
    console.log('🔨 Building site...');
    await execAsync('npm run build', { cwd: sitePath });

    // Step 2: Deploy to Netlify
    console.log('🌐 Deploying to Netlify...');
    const result = await deploymentService.deploy(sitePath, dirName);

    console.log('✅ Success!');
    console.log(`🔗 Deployed URL: ${result.url}`);
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

const dirName = process.argv[2];
if (!dirName) {
  console.error('Please provide a directory name from generated-sites/');
  console.log('Usage: npm run deploy:site <dir-name>');
  process.exit(1);
}

deployExisting(dirName);
