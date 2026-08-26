import { FiBriefcase, FiFolder, FiMail, FiUser, FiFileText } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import type { AppId, PortfolioContent } from '../types/content';

export interface ShellApp {
  id: AppId;
  title: string;
  shortTitle: string;
  icon: IconType;
  tint: string;
}

export function getApps(content: PortfolioContent): ShellApp[] {
  return [
    { id: 'about', title: 'About Gabriel', shortTitle: 'About', icon: FiUser, tint: '#78dcca' },
    { id: 'work', title: 'Selected Work', shortTitle: 'Work', icon: FiBriefcase, tint: '#f4bd7a' },
    { id: 'contact', title: 'Contact', shortTitle: 'Contact', icon: FiMail, tint: '#8fb5ff' },
    { id: 'resume', title: 'Résumé', shortTitle: 'Résumé', icon: FiFileText, tint: '#d39bff' },
    ...content.folders.map((folder) => ({ id: `folder:${folder.id}` as AppId, title: folder.name, shortTitle: folder.name, icon: FiFolder, tint: '#f7d273' })),
  ];
}
