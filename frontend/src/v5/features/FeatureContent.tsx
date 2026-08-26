import { FiDownload } from 'react-icons/fi';
import type { AppId, PortfolioContent } from '../types/content';
import { AboutView } from './AboutView';
import { ContactView } from './ContactView';
import { FolderView } from './FolderView';
import { ImageViewer } from './ImageViewer';
import { ProjectView, WorkExplorer } from './WorkExplorer';
import styles from './FeatureContent.module.css';

export function FeatureContent({ appId, content, onOpenApp }: { appId: AppId; content: PortfolioContent; onOpenApp: (appId: AppId, title: string) => void }) {
  if (appId === 'about') return <AboutView content={content} />;
  if (appId === 'work') return <WorkExplorer content={content} onOpenProject={(project) => onOpenApp(`project:${project.id}`, project.name)} />;
  if (appId === 'contact') return <ContactView content={content} />;
  if (appId === 'resume') return <section className={styles.resume}><span className={styles.eyebrow}>Résumé</span><h1>A practical builder with a product perspective.</h1><p>Senior fullstack development, technical leadership and product delivery across complex digital platforms.</p><div className={styles.timeline}><div><span>Today</span><strong>{content.role} at {content.company ?? 'product teams'}</strong></div><div><span>Focus</span><strong>TypeScript, React, distributed systems and domain design</strong></div><div><span>Approach</span><strong>Simple architecture, measurable outcomes and continuous improvement</strong></div></div>{content.resumeUrl && <a className={styles.primaryAction} href={content.resumeUrl} target="_blank" rel="noreferrer"><FiDownload /> Download résumé</a>}</section>;
  if (appId.startsWith('project:')) {
    const project = content.projects.find((item) => appId === `project:${item.id}`);
    return project ? <ProjectView project={project} onOpenImage={(image) => onOpenApp(`image:${project.id}:${image.id}`, image.title)} /> : null;
  }
  if (appId.startsWith('image:')) {
    const match = content.projects.flatMap((project) => project.gallery.map((image) => ({ project, image })))
      .find(({ project, image }) => appId === `image:${project.id}:${image.id}`);
    return match ? <ImageViewer project={match.project} image={match.image} /> : null;
  }
  const folder = content.folders.find((item) => appId === `folder:${item.id}`);
  return folder ? <FolderView folder={folder} content={content} /> : null;
}
