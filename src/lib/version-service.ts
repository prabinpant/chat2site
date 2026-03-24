import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Root of the main prompt2site repo */
const REPO_ROOT = path.resolve(__dirname, '../..');

const SITE_GITIGNORE = `node_modules/
dist/
.env
.DS_Store
`;

/**
 * Manages git-based versioning for generated sites within the main repo.
 * Each site gets its own tag namespace: `<siteName>/v1`, `<siteName>/v2`, etc.
 * Commits are scoped to only the specific site folder.
 */
export class VersionService {
  /**
   * Returns a sanitized, tag-safe identifier for a site name.
   */
  private toTagPrefix(siteName: string): string {
    return siteName
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/(^-|-$)/g, '')
      || 'site';
  }

  /**
   * Returns the relative path from the repo root to the site folder.
   * e.g. `generated-sites/my-blog_20260324_abc12`
   */
  private relativeSitePath(sitePath: string): string {
    return path.relative(REPO_ROOT, sitePath);
  }

  /**
   * Initialize version tracking for a newly generated site.
   * Writes a .gitignore inside the site, stages only that folder, and commits as v1.
   */
  async initVersionControl(sitePath: string, siteName: string): Promise<void> {
    const tagPrefix = this.toTagPrefix(siteName);
    const relPath = this.relativeSitePath(sitePath);

    try {
      // Write a .gitignore inside the site folder to exclude node_modules, dist, etc.
      const gitignorePath = path.join(sitePath, '.gitignore');
      await fs.writeFile(gitignorePath, SITE_GITIGNORE);

      // Stage only this site folder and commit
      await execAsync(`git add "${relPath}"`, { cwd: REPO_ROOT });
      await execAsync(`git commit -m "${siteName} - v1"`, { cwd: REPO_ROOT });
      await execAsync(`git tag "${tagPrefix}/v1"`, { cwd: REPO_ROOT });

      console.log(`[VersionService] Initialized ${tagPrefix}/v1 for "${siteName}"`);
    } catch (e) {
      console.error(`[VersionService] Failed to init version control for "${siteName}":`, e);
    }
  }

  /**
   * Commit the current state of a site folder as the next version.
   * Finds the latest tag for this site and increments it.
   */
  async commitNewVersion(sitePath: string, siteName: string): Promise<string> {
    const tagPrefix = this.toTagPrefix(siteName);
    const relPath = this.relativeSitePath(sitePath);

    try {
      const currentV = await this.getLatestVersionNumber(tagPrefix);
      const nextV = currentV + 1;

      await execAsync(`git add "${relPath}"`, { cwd: REPO_ROOT });

      try {
        await execAsync(`git commit -m "${siteName} - v${nextV}"`, { cwd: REPO_ROOT });
      } catch (commitErr: any) {
        if (commitErr.stderr?.includes('nothing to commit') || commitErr.stdout?.includes('nothing to commit')) {
          console.log(`[VersionService] No changes to commit for "${siteName}", staying at v${currentV}`);
          return `v${currentV}`;
        }
        throw commitErr;
      }

      await execAsync(`git tag "${tagPrefix}/v${nextV}"`, { cwd: REPO_ROOT });
      console.log(`[VersionService] Created ${tagPrefix}/v${nextV} for "${siteName}"`);
      return `v${nextV}`;
    } catch (e) {
      console.error(`[VersionService] Failed to commit new version for "${siteName}":`, e);
      return '';
    }
  }

  /**
   * List all available versions for a site.
   */
  async listVersions(sitePath: string, siteName: string): Promise<string[]> {
    const tagPrefix = this.toTagPrefix(siteName);

    try {
      const { stdout } = await execAsync(`git tag -l "${tagPrefix}/v*" | sort -V`, { cwd: REPO_ROOT });
      const tags = stdout.trim().split('\n').filter(Boolean);
      // Strip prefix, return just "v1", "v2", etc.
      return tags.map(t => t.replace(`${tagPrefix}/`, ''));
    } catch (e) {
      console.error(`[VersionService] Failed to list versions for "${siteName}":`, e);
      return [];
    }
  }

  /**
   * Revert a site folder to a specific version.
   * Checks out the tagged state of the folder, then commits as the next version.
   */
  async revertToVersion(sitePath: string, siteName: string, version: string): Promise<string> {
    const tagPrefix = this.toTagPrefix(siteName);
    const relPath = this.relativeSitePath(sitePath);
    const fullTag = `${tagPrefix}/${version}`;

    try {
      // Restore only this site's folder from the target tag
      await execAsync(`git checkout "${fullTag}" -- "${relPath}"`, { cwd: REPO_ROOT });

      const currentV = await this.getLatestVersionNumber(tagPrefix);
      const nextV = currentV + 1;

      try {
        await execAsync(`git commit -m "${siteName} - v${nextV} (Reverted to ${version})"`, { cwd: REPO_ROOT });
      } catch (err: any) {
        if (err.stderr?.includes('nothing to commit') || err.stdout?.includes('nothing to commit')) {
          return version;
        }
        throw err;
      }

      await execAsync(`git tag "${tagPrefix}/v${nextV}"`, { cwd: REPO_ROOT });
      console.log(`[VersionService] Reverted "${siteName}" to ${version}, saved as v${nextV}`);
      return `v${nextV}`;
    } catch (e) {
      console.error(`[VersionService] Failed to revert "${siteName}" to ${version}:`, e);
      throw e;
    }
  }

  /**
   * Get the latest version number for a site by inspecting its tags.
   */
  private async getLatestVersionNumber(tagPrefix: string): Promise<number> {
    try {
      const { stdout } = await execAsync(`git tag -l "${tagPrefix}/v*" | sort -V | tail -n 1`, { cwd: REPO_ROOT });
      const match = stdout.trim().match(/v(\d+)$/);
      return match ? parseInt(match[1]) : 0;
    } catch {
      return 0;
    }
  }
}

export const versionService = new VersionService();
