import { FiBriefcase, FiFolder, FiImage, FiMail, FiUser, FiFileText } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import type { AppId, PortfolioContent } from '../types/content';

export interface ShellApp {
  id: AppId;
  title: string;
  shortTitle: string;
  icon: IconType;
  tint: string;
  launcher: boolean;
}

export function getApps(content: PortfolioContent): ShellApp[] {
  return [
    { id: 'about', title: 'About Gabriel', shortTitle: 'About', icon: FiUser, tint: '#78dcca', launcher: true },
    { id: 'work', title: 'Selected Work', shortTitle: 'Work', icon: FiBriefcase, tint: '#f4bd7a', launcher: true },
    { id: 'contact', title: 'Contact', shortTitle: 'Contact', icon: FiMail, tint: '#8fb5ff', launcher: true },
    { id: 'resume', title: 'Résumé', shortTitle: 'Résumé', icon: FiFileText, tint: '#d39bff', launcher: true },
    ...content.folders.map((folder) => ({ id: `folder:${folder.id}` as AppId, title: folder.name, shortTitle: folder.name, icon: FiFolder, tint: '#f7d273', launcher: true })),
    ...content.projects.map((project) => ({ id: `project:${project.id}` as AppId, title: project.name, shortTitle: project.name, icon: FiFolder, tint: project.accent ?? '#78dcca', launcher: false })),
    ...content.projects.flatMap((project) => project.gallery.map((image) => ({
      id: `image:${project.id}:${image.id}` as AppId,
      title: image.title,
      shortTitle: image.title,
      icon: FiImage,
      tint: project.accent ?? '#8fb5ff',
      launcher: false,
    }))),
  ];
}
