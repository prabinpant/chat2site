import { exec, spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { tmpdir } from 'os';
import { promisify } from 'util';
import { config } from './config.js';
import { AIService } from './ai-service.js';

const execAsync = promisify(exec);

export class CodexService implements AIService {
  async generateCode(prompt: string): Promise<string> {
    const tempFile = path.join(tmpdir(), `codex-prompt-${Date.now()}.txt`);
    const outputFile = path.join(tmpdir(), `codex-out-${Date.now()}.txt`);
    
    try {
      // Write prompt to a temp file
      fs.writeFileSync(tempFile, prompt);
      
      const modelFlag = config.codexModel ? `-m "${config.codexModel}"` : '';
      const cmd = `codex exec ${modelFlag} --skip-git-repo-check --sandbox workspace-write --output-last-message "${outputFile}" < "${tempFile}"`;
      console.log(`Running: ${cmd}`);
      
      const generationDir = path.dirname(tempFile);
      
      // Execute codex cli asynchronously in the temp directory
      // This isolation prevents it from modifying project files
      await execAsync(cmd, {
        cwd: generationDir,
        timeout: 1200000, // 20 minutes
        maxBuffer: 1024 * 1024 * 10 // 10MB
      });

      if (!fs.existsSync(outputFile)) {
        throw new Error('Codex failed to produce output file');
      }

      const content = fs.readFileSync(outputFile, 'utf-8');
      return this.extractCode(content);
    } catch (error) {
      console.error('Codex CLI execution failed:', error);
      throw error;
    } finally {
      // Clean up temp files
      try {
        if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
        if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
      } catch (err) {
        console.warn('Failed to clean up temp files:', err);
      }
    }
  }

  async executeAutonomousBuild(prompt: string, sitePath: string): Promise<string> {
    const BUILD_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

    try {
      console.log(`[AutonomousCodex] Handing over keys to AI in ${sitePath}...`);
      
      return new Promise((resolve, reject) => {
        let output = '';
        let settled = false;
        const args = ['exec', '--dangerously-bypass-approvals-and-sandbox', '--skip-git-repo-check'];
        if (config.codexModel) {
          args.push('--model', config.codexModel);
        }

        const cp = spawn('codex', args, {
          cwd: sitePath,
          shell: true,
          env: { 
            ...process.env, 
            NETLIFY_AUTH_TOKEN: config.netlifyAuthToken 
          }
        });

        // Safeguard timeout: kill the process if it hangs too long
        const timeout = setTimeout(() => {
          if (!settled) {
            settled = true;
            console.error(`[AutonomousCodex] Build timed out after ${BUILD_TIMEOUT_MS / 1000}s. Killing process.`);
            cp.kill('SIGTERM');
            setTimeout(() => { if (!cp.killed) cp.kill('SIGKILL'); }, 5000);
            const error = new Error(`Codex Build timed out after ${BUILD_TIMEOUT_MS / 1000} seconds`);
            (error as any).output = output;
            reject(error);
          }
        }, BUILD_TIMEOUT_MS);

        // Feed prompt directly via stdin
        if (cp.stdin) {
          cp.stdin.write(prompt);
          cp.stdin.end();
        }

        cp.stdout?.on('data', (data: Buffer | string) => {
          const str = data.toString();
          output += str;
          process.stdout.write(str);
        });

        cp.stderr?.on('data', (data: Buffer | string) => {
          const str = data.toString();
          output += str;
          process.stderr.write(str);
        });

        cp.on('close', (code: number) => {
          clearTimeout(timeout);
          if (settled) return;
          settled = true;
          if (code === 0) {
            resolve(output);
          } else {
            console.error(`[AutonomousCodex] Failed with code ${code}`);
            const error = new Error(`Autonomous Codex Build failed with code ${code}`);
            (error as any).output = output;
            reject(error);
          }
        });

        cp.on('error', (err: Error) => {
          clearTimeout(timeout);
          if (settled) return;
          settled = true;
          console.error('[AutonomousCodex] Spawn error:', err);
          reject(err);
        });
      });
    } catch (error) {
      console.error('Autonomous Codex Build failed:', error);
      throw error;
    }
  }

  private extractCode(content: string): string {
    // LLMs often wrap code in markdown blocks
    const match = content.match(/```(?:tsx|jsx|typescript|javascript)?\n([\s\S]*?)```/);
    if (match && match[1]) {
      return match[1].trim();
    }
    return content.trim();
  }
}
