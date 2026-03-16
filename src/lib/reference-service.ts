export interface ReferenceData {
  url: string;
  textContent: string;
  extractedImages: string[];
  brandValues: string[];
  suggestedColors: string[];
}

export class ReferenceService {
  /**
   * Note: Since I am an agent, I will use my `read_url_content` tool during the execution flow 
   * in the GenerationRunner. This service provides the structure for holding that data.
   */
  async study(url: string, content: string): Promise<ReferenceData> {
    // We use LLM to summarize and extract relevant design bits from the raw markdown
    // This is handled in the SpecExpansionService by passing this raw content.
    return {
      url,
      textContent: content,
      extractedImages: this.extractImages(content),
      brandValues: [], // To be populated by expansion service
      suggestedColors: [] // To be populated by expansion service
    };
  }

  private extractImages(markdown: string): string[] {
    const imgRegex = /!\[.*?\]\((.*?)\)/g;
    const matches = [...markdown.matchAll(imgRegex)];
    return matches.map(m => m[1]).filter(url => url.startsWith('http'));
  }
}
