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

  prepareSiteDirectory(siteName: string, isUpdate: boolean = false): string {
    const sitePath = path.join(this.baseDir, siteName);
    if (!isUpdate && fs.existsSync(sitePath)) {
      fs.rmSync(sitePath, { recursive: true, force: true });
    }
    if (!fs.existsSync(sitePath)) {
      fs.mkdirSync(sitePath, { recursive: true });
    }
    return sitePath;
  }

  saveMetadata(sitePath: string, spec: any) {
    const metadataPath = path.join(sitePath, '.spec.json');
    fs.writeFileSync(metadataPath, JSON.stringify(spec, null, 2));
  }

  loadMetadata(sitePath: string): any | null {
    const metadataPath = path.join(sitePath, '.spec.json');
    if (fs.existsSync(metadataPath)) {
      return JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    }
    return null;
  }

  findSiteById(id: string): string | null {
    if (!fs.existsSync(this.baseDir)) return null;
    const projects = fs.readdirSync(this.baseDir);
    
    for (const name of projects) {
      const sitePath = path.join(this.baseDir, name);
      if (fs.lstatSync(sitePath).isDirectory()) {
        const metadata = this.loadMetadata(sitePath);
        if (metadata && (metadata.preferredSubdomain === id || name.includes(id))) {
          return sitePath;
        }
      }
    }
    return null;
  }

  listSites(): any[] {
    if (!fs.existsSync(this.baseDir)) return [];
    const projects = fs.readdirSync(this.baseDir);
    const sites: any[] = [];
    
    for (const name of projects) {
      const sitePath = path.join(this.baseDir, name);
      if (fs.lstatSync(sitePath).isDirectory()) {
        const metadata = this.loadMetadata(sitePath);
        if (metadata) {
          sites.push({
            id: metadata.preferredSubdomain || name,
            name: metadata.name,
            url: `https://${metadata.preferredSubdomain || name}.netlify.app`
          });
        }
      }
    }
    return sites;
  }

  injectCode(sitePath: string, code: string) {
    const srcDir = path.join(sitePath, 'src');
    if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });
    const appTsxPath = path.join(srcDir, 'App.tsx');
    fs.writeFileSync(appTsxPath, code);
  }

  deleteSiteDirectory(sitePath: string) {
    if (fs.existsSync(sitePath)) {
      fs.rmSync(sitePath, { recursive: true, force: true });
    }
  }
}
