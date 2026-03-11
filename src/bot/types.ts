export interface SiteSpec {
  name: string;
  description: string;
  features: string[];
  theme: {
    primaryColor: string;
    darkMode: boolean;
  };
  sections?: {
    title: string;
    description: string;
  }[];
  branding?: {
    tone: string;
    aesthetic: string;
  };
}

export interface GenerationSpec {
  prompt: string;
  files: {
    path: string;
    content: string;
  }[];
}
