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
    try {
      console.log(`[GeminiEngine] Starting autonomous build in ${sitePath}...`);
      
      return new Promise((resolve, reject) => {
        let output = '';
        
        // Use gemini CLI with --prompt (non-interactive) and --yolo (auto-approve)
        // We also disable sandbox if it matches codex's behavior or keep it if safer.
        // User requested "gemini like codex", so we'll go with yolo and non-interactive.
        // We use --yolo for auto-approval and --sandbox false for workspace access.
        // We avoid passing the prompt as a CLI argument to prevent shell escaping issues.
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
