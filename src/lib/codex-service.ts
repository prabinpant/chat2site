import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { tmpdir } from 'os';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class CodexService {
  async generateCode(prompt: string): Promise<string> {
    const tempFile = path.join(tmpdir(), `codex-prompt-${Date.now()}.txt`);
    const outputFile = path.join(tmpdir(), `codex-out-${Date.now()}.txt`);
    
    try {
      // Write prompt to a temp file
      fs.writeFileSync(tempFile, prompt);
      
      const cmd = `codex exec --skip-git-repo-check --sandbox workspace-write --output-last-message "${outputFile}" < "${tempFile}"`;
      console.log(`Running: ${cmd}`);
      
      // Execute codex cli asynchronously
      await execAsync(cmd, {
        timeout: 12000000 // 20 minutes
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

  private extractCode(content: string): string {
    // LLMs often wrap code in markdown blocks
    const match = content.match(/```(?:tsx|jsx|typescript|javascript)?\n([\s\S]*?)```/);
    if (match && match[1]) {
      return match[1].trim();
    }
    return content.trim();
  }
}
