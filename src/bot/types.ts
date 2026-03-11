export interface Asset {
  type: 'logo' | 'image';
  source: 'file' | 'text';
  content: string; // File path if source is file, description if source is text
  originalName?: string;
  mimeType?: string;
}

export interface SiteSpec {
  name: string;
  description: string;
  preferredSubdomain?: string;
  features: string[];
  theme: {
    primaryColor: string;
    darkMode: boolean;
    palette?: {
      background: string;
      surface: string;
      accent: string;
      text: string;
    };
    spacing?: string; // e.g. "airy", "compact", "asymmetrical"
    layoutStrategy?: string; // e.g. "bento-grid", "scroll-story", "classic-editorial"
  };
  sections?: {
    title: string;
    description: string;
    layoutHint?: string;
  }[];
  branding?: {
    tone: string;
    aesthetic: string;
    typography?: {
      heading: string;
      body: string;
    };
  };
  imagery?: {
    style: string;
    keywords: string[];
  };
  assets?: Asset[];
  extraDependencies?: Record<string, string>;
}

export interface GenerationSpec {
  prompt: string;
  files: {
    path: string;
    content: string;
  }[];
}
