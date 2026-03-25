import { spawn } from 'child_process';
import { AIService } from './ai-service.js';
import { config } from './config.js';

export class GeminiService implements AIService {
  async generateCode(prompt: string): Promise<string> {
    const output = await this.executeAutonomousBuild(prompt, process.cwd());
    return this.extractCode(output);
  }

  private extractCode(content: string): string {
    // LLMs often wrap code in markdown blocks
    const match = content.match(/```(?:tsx|jsx|typescript|javascript|json)?\n([\s\S]*?)```/);
    if (match && match[1]) {
      return match[1].trim();
    }
    return content.trim();
  }

  async executeAutonomousBuild(prompt: string, sitePath: string): Promise<string> {
    const BUILD_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

    try {
      console.log(`[GeminiEngine] Starting autonomous build in ${sitePath}...`);
      
      return new Promise((resolve, reject) => {
        let output = '';
        let settled = false;
        
        const args = ['--yolo', '--sandbox', 'false', '--prompt', '""'];
        
        if (config.geminiModel) {
          args.push('--model', config.geminiModel);
        }
        
        const cp = spawn('gemini', args, {
          cwd: sitePath,
          shell: false,
          env: { 
            ...process.env, 
            NETLIFY_AUTH_TOKEN: config.netlifyAuthToken
          }
        });

        // Safeguard timeout: kill the process if it hangs too long
        const timeout = setTimeout(() => {
          if (!settled) {
            settled = true;
            console.error(`[GeminiEngine] Build timed out after ${BUILD_TIMEOUT_MS / 1000}s. Killing process.`);
            cp.kill('SIGTERM');
            setTimeout(() => { if (!cp.killed) cp.kill('SIGKILL'); }, 5000);
            const error = new Error(`Gemini Build timed out after ${BUILD_TIMEOUT_MS / 1000} seconds`);
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
            console.error(`[GeminiEngine] Failed with code ${code}`);
            const error = new Error(`Gemini Build failed with code ${code}`);
            (error as any).output = output;
            reject(error);
          }
        });

        cp.on('error', (err: Error) => {
          clearTimeout(timeout);
          if (settled) return;
          settled = true;
          console.error('[GeminiEngine] Spawn error:', err);
          reject(err);
        });
      });
    } catch (error) {
      console.error('Gemini Build failed:', error);
      throw error;
    }
  }
}
