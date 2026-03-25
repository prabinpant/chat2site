export interface Asset {
  type: 'logo' | 'image';
  source: 'file' | 'text';
  content: string; // File path if source is file, description if source is text
  originalName?: string;
  mimeType?: string;
  usageHint?: string; // Hint for where this asset should be used (e.g., 'hero', 'about', 'gallery')
}

export interface SiteSpec {
  name: string;
  description: string;
  preferredSubdomain?: string;
  persona?: string;
  personaStyleGuide?: string;
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
    spacing?: 'airy' | 'standard' | 'compact';
    layoutStrategy?: string;
  };
  sections?: {
    title: string;
    description: string;
    layoutHint?: string;
  }[];
  branding?: {
    tone: string;
    aesthetic?: string;
    typography?: {
      heading: string;
      body: string;
    };
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
