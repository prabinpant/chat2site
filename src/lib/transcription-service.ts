import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class TranscriptionService {
  private scriptPath: string;

  constructor() {
    this.scriptPath = path.join(__dirname, 'transcribe.py');
  }

  async transcribe(audioPath: string): Promise<string> {
    try {
      console.log(`[Transcription] Transcribing ${audioPath}...`);
      
      // Execute the Python script
      // Using python3 specifically
      const { stdout, stderr } = await execAsync(`python3 "${this.scriptPath}" "${audioPath}"`);

      if (stderr && stderr.includes('ERROR')) {
          console.error('[Transcription] Error:', stderr);
          throw new Error(`Transcription failed: ${stderr}`);
      }

      const text = stdout.trim();
      console.log(`[Transcription] Result: ${text}`);
      return text;
    } catch (error) {
      console.error('[Transcription] Execution failed:', error);
      throw error;
    }
  }
}

export const transcriptionService = new TranscriptionService();
