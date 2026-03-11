export interface SiteSpec {
  name: string;
  description: string;
  features: string[];
  theme: {
    primaryColor: string;
    darkMode: boolean;
  };
}

export interface GenerationSpec {
  prompt: string;
  files: {
    path: string;
    content: string;
  }[];
}
