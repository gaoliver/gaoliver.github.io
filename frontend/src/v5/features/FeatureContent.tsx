import { FiDownload } from 'react-icons/fi';
import type { AppId, PortfolioContent } from '../types/content';
import { AboutView } from './AboutView';
import { ContactView } from './ContactView';
import { FolderView } from './FolderView';
import { WorkExplorer } from './WorkExplorer';
import styles from './FeatureContent.module.css';

export function FeatureContent({ appId, content }: { appId: AppId; content: PortfolioContent }) {
  if (appId === 'about') return <AboutView content={content} />;
  if (appId === 'work') return <WorkExplorer content={content} />;
  if (appId === 'contact') return <ContactView content={content} />;
  if (appId === 'resume') return <section className={styles.resume}><span className={styles.eyebrow}>Résumé</span><h1>A practical builder with a product perspective.</h1><p>Senior fullstack development, technical leadership and product delivery across complex digital platforms.</p><div className={styles.timeline}><div><span>Today</span><strong>{content.role} at {content.company ?? 'product teams'}</strong></div><div><span>Focus</span><strong>TypeScript, React, distributed systems and domain design</strong></div><div><span>Approach</span><strong>Simple architecture, measurable outcomes and continuous improvement</strong></div></div>{content.resumeUrl && <a className={styles.primaryAction} href={content.resumeUrl} target="_blank" rel="noreferrer"><FiDownload /> Download résumé</a>}</section>;
  const folder = content.folders.find((item) => appId === `folder:${item.id}`);
  return folder ? <FolderView folder={folder} content={content} /> : null;
}
