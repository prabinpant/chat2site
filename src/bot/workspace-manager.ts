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
    // Deletion disabled as per user request
    console.log(`🧹 Site cleanup is currently disabled.`);
  }

  prepareSiteDirectory(siteName: string, isUpdate: boolean = false): string {
    const sitePath = path.join(this.baseDir, siteName);
    if (!isUpdate && fs.existsSync(sitePath)) {
      // fs.rmSync(sitePath, { recursive: true, force: true });
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

  findSitesByQuery(query: string): { path: string; id: string; name: string }[] {
    if (!fs.existsSync(this.baseDir)) return [];
    const projects = fs.readdirSync(this.baseDir);
    const matches: { path: string; id: string; name: string }[] = [];
    const exactMatches: { path: string; id: string; name: string }[] = [];
    const q = query.toLowerCase();

    for (const name of projects) {
      const sitePath = path.join(this.baseDir, name);
      if (fs.lstatSync(sitePath).isDirectory()) {
        const metadata = this.loadMetadata(sitePath);
        if (metadata) {
          const id = metadata.netlifySiteId || metadata.preferredSubdomain || metadata.id || name;
          const siteName = metadata.name || '';
          
          if (id.toLowerCase() === q || siteName.toLowerCase() === q || name.toLowerCase() === q) {
            exactMatches.push({ path: sitePath, id, name: siteName });
          } else if (id.toLowerCase().includes(q) || siteName.toLowerCase().includes(q) || name.toLowerCase().includes(q)) {
            matches.push({ path: sitePath, id, name: siteName });
          }
        }
      }
    }
    return exactMatches.length > 0 ? exactMatches : matches;
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
            id: metadata.preferredSubdomain || metadata.id || name,
            name: metadata.name,
            url: metadata.netlifyUrl || `https://${metadata.preferredSubdomain || metadata.id || name}.netlify.app`,
            netlifySiteId: metadata.netlifySiteId
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
    // Deletion disabled as per user request
    console.log(`⚠️ Prevented deletion of: ${sitePath}`);
  }
}
