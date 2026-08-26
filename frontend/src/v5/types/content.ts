export type AppId = 'about' | 'work' | 'contact' | 'resume' | `folder:${string}` | `project:${string}` | `image:${string}:${string}`;

export interface SocialLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  company?: string;
  summary: string;
  image?: string;
  url?: string;
  tools: string[];
  role?: string;
  projectType?: string;
  language?: string;
  period?: string;
  accent?: string;
  descriptionDocument?: RichTextNode;
  gallery: Array<{ id: string; title: string; image: string }>;
}

export interface RichTextNode {
  nodeType: string;
  value?: string;
  marks?: Array<{ type: string }>;
  data?: { uri?: string; target?: unknown };
  content?: RichTextNode[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface DesktopFolder {
  id: string;
  name: string;
  type: 'Gallery' | 'Video' | 'Text' | 'Embed';
  image?: string;
  url?: string;
  videoId?: string;
  text?: string;
  textDocument?: RichTextNode;
  isNotWorking?: boolean;
  notWorkingText?: string;
  gallery: Array<{ id: string; title: string; image: string }>;
}

export interface PortfolioContent {
  name: string;
  role: string;
  location: string;
  about: string;
  aboutDocument?: RichTextNode;
  birthdate?: string;
  company?: string;
  email: string;
  phone?: string;
  whatsAppMessage?: string;
  telegramUrl?: string;
  avatar?: string;
  resumeUrl?: string;
  desktopBackground?: string;
  mobileBackground?: string;
  socials: SocialLink[];
  skillGroups: SkillGroup[];
  tools: string[];
  projects: Project[];
  folders: DesktopFolder[];
}
