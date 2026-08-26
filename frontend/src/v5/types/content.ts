export type AppId = 'about' | 'work' | 'contact' | 'resume' | `folder:${string}`;

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
  period?: string;
  accent?: string;
}

export interface DesktopFolder {
  id: string;
  name: string;
  type: 'Gallery' | 'Video' | 'Text' | 'Embed';
  image?: string;
  url?: string;
  videoId?: string;
  text?: string;
  gallery: Array<{ id: string; title: string; image: string }>;
}

export interface PortfolioContent {
  name: string;
  role: string;
  location: string;
  about: string;
  email: string;
  phone?: string;
  avatar?: string;
  resumeUrl?: string;
  desktopBackground?: string;
  mobileBackground?: string;
  socials: SocialLink[];
  projects: Project[];
  folders: DesktopFolder[];
}
