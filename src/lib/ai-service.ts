export interface AIService {
  /**
   * Generates code from a prompt.
   */
  generateCode(prompt: string): Promise<string>;

  /**
   * Executes an autonomous build in the given site path.
   */
  executeAutonomousBuild(prompt: string, sitePath: string): Promise<string>;
}
