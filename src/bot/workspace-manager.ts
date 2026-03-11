import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class WorkspaceManager {
  private baseDir: string;
  private templateDir: string;

  constructor() {
    this.baseDir = path.resolve(__dirname, '../../generated-sites');
    this.templateDir = path.resolve(__dirname, '../templates/react-vite');
    
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
    }
  }

  createSiteWorkspace(siteName: string): string {
    const sitePath = path.join(this.baseDir, siteName);
    if (fs.existsSync(sitePath)) {
      // For simple project, let's just clear it or handle it
      fs.rmSync(sitePath, { recursive: true, force: true });
    }
    
    // Copy template
    // Note: This is a simplified copy, for a real project we'd use a better copy library or carefully handle node_modules
    fs.mkdirSync(sitePath, { recursive: true });
    this.copyFolderSync(this.templateDir, sitePath);
    
    return sitePath;
  }

  private copyFolderSync(from: string, to: string) {
    const files = fs.readdirSync(from);
    for (const file of files) {
      if (file === 'node_modules' || file === 'dist' || file === '.git') continue;
      
      const fromPath = path.join(from, file);
      const toPath = path.join(to, file);
      
      if (fs.lstatSync(fromPath).isDirectory()) {
        fs.mkdirSync(toPath, { recursive: true });
        this.copyFolderSync(fromPath, toPath);
      } else {
        fs.copyFileSync(fromPath, toPath);
      }
    }
  }

  injectCode(sitePath: string, code: string) {
    const appTsxPath = path.join(sitePath, 'src/App.tsx');
    fs.writeFileSync(appTsxPath, code);
  }
}
