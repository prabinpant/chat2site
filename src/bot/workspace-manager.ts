import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class WorkspaceManager {
  private baseDir: string;

  constructor() {
    this.baseDir = path.resolve(__dirname, '../../generated-sites');
    
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
    }
  }

  cleanupOldSites(keepCount: number = 5) {
    try {
      if (!fs.existsSync(this.baseDir)) return;
      const projects = fs.readdirSync(this.baseDir)
        .map(name => ({
          name,
          path: path.join(this.baseDir, name),
          time: fs.statSync(path.join(this.baseDir, name)).mtime.getTime()
        }))
        .filter(p => fs.lstatSync(p.path).isDirectory())
        .sort((a, b) => b.time - a.time);

      if (projects.length > keepCount) {
        const toDelete = projects.slice(keepCount);
        console.log(`🧹 Cleaning up ${toDelete.length} old projects...`);
        for (const p of toDelete) {
          fs.rmSync(p.path, { recursive: true, force: true });
        }
      }
    } catch (e) {
      console.error('Failed to cleanup old sites:', e);
    }
  }

  prepareSiteDirectory(siteName: string): string {
    const sitePath = path.join(this.baseDir, siteName);
    if (fs.existsSync(sitePath)) {
      fs.rmSync(sitePath, { recursive: true, force: true });
    }
    fs.mkdirSync(sitePath, { recursive: true });
    return sitePath;
  }

  injectCode(sitePath: string, code: string) {
    const srcDir = path.join(sitePath, 'src');
    if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });
    const appTsxPath = path.join(srcDir, 'App.tsx');
    fs.writeFileSync(appTsxPath, code);
  }
}
