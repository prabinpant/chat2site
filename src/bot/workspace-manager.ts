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

  cleanupOldSites(keepCount: number = 5) {
    try {
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

  async initScratchProject(siteName: string): Promise<string> {
    const sitePath = path.join(this.baseDir, siteName);
    if (fs.existsSync(sitePath)) {
      fs.rmSync(sitePath, { recursive: true, force: true });
    }
    
    fs.mkdirSync(this.baseDir, { recursive: true });
    
    // Initialize Vite project from scratch
    // Use --template react-ts for a clean TypeScript React setup
    execSync(`npm create vite@latest . -- --template react-ts`, { 
      cwd: this.baseDir, 
      stdio: 'inherit',
      env: { ...process.env, npm_config_yes: 'true' } 
    });

    // Rename the folder (create vite makes it in 'baseDir' if '.' is used, but we want it in 'sitePath')
    // Actually, create vite@latest . creates it in the CWD. 
    // Let's create the folder first and run it inside.
    fs.mkdirSync(sitePath, { recursive: true });
    execSync(`npm create vite@latest . -- --template react-ts`, { 
      cwd: sitePath, 
      stdio: 'inherit',
      env: { ...process.env, npm_config_yes: 'true' } 
    });

    // Clean up default Vite boilerplate
    const toRemove = [
      'src/App.css',
      'src/assets',
      'public/vite.svg'
    ];
    for (const item of toRemove) {
      const p = path.join(sitePath, item);
      if (fs.existsSync(p)) {
        fs.rmSync(p, { recursive: true, force: true });
      }
    }

    return sitePath;
  }

  setupTailwind(sitePath: string) {
    // Create tailwind.config.js
    const tailwindConfig = `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;
    fs.writeFileSync(path.join(sitePath, 'tailwind.config.js'), tailwindConfig);

    // Create postcss.config.js
    const postcssConfig = `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;
    fs.writeFileSync(path.join(sitePath, 'postcss.config.js'), postcssConfig);

    // Create index.css with tailwind directives
    const indexCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
}
`;
    fs.writeFileSync(path.join(sitePath, 'src/index.css'), indexCss);
  }

  injectCode(sitePath: string, code: string) {
    const appTsxPath = path.join(sitePath, 'src/App.tsx');
    fs.writeFileSync(appTsxPath, code);
  }

  updateDependencies(sitePath: string, extraDeps: Record<string, string>) {
    const pkgPath = path.join(sitePath, 'package.json');
    if (!fs.existsSync(pkgPath)) return;
    
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.dependencies = {
      ...pkg.dependencies,
      ...extraDeps
    };
    
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  }
}
