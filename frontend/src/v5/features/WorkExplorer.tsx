import { useState } from 'react';
import { FiArrowLeft, FiArrowUpRight, FiFolder } from 'react-icons/fi';
import type { PortfolioContent, Project } from '../types/content';
import { RichText } from './RichText';
import styles from './FeatureContent.module.css';

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const gallery = project.gallery ?? [];
  return <article className={styles.projectDetail}><button className={styles.backButton} onClick={onBack}><FiArrowLeft /> All projects</button><header className={styles.projectDetailHeader}>{project.image && <img src={project.image} alt="" />}<div><span className={styles.eyebrow}>{project.company}</span><h1>{project.name}</h1><p>{[project.role, project.period].filter(Boolean).join(' · ')}</p></div></header><div className={styles.projectFacts}>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>{project.descriptionDocument ? <RichText document={project.descriptionDocument} className={styles.richProject} /> : <p className={styles.lead}>{project.summary}</p>}{project.url && <a className={styles.primaryAction} href={project.url} target="_blank" rel="noreferrer">Visit project <FiArrowUpRight /></a>}{gallery.length > 0 && <section className={styles.projectGallery}><h2>Gallery</h2><div>{gallery.map((image) => <figure key={image.id}><img src={image.image} alt={image.title} loading="lazy" /><figcaption>{image.title}</figcaption></figure>)}</div></section>}</article>;
}

export function WorkExplorer({ content }: { content: PortfolioContent }) {
  const [selectedId, setSelectedId] = useState<string>();
  const selected = content.projects.find((project) => project.id === selectedId);
  if (selected) return <ProjectDetail project={selected} onBack={() => setSelectedId(undefined)} />;
  return <section className={styles.workExplorer}><header className={styles.sectionHeader}><span className={styles.eyebrow}>Selected work</span><h1>Project folder</h1><p>Open a project to explore its role, technology, story and gallery.</p></header><div className={styles.projectFolders}>{content.projects.map((project) => <button key={project.id} onClick={() => setSelectedId(project.id)}><span className={styles.folderIcon} style={{ '--project-accent': project.accent ?? '#78dcca' } as React.CSSProperties}><FiFolder />{project.image && <img src={project.image} alt="" loading="lazy" />}</span><strong>{project.name}</strong><small>{project.company}</small></button>)}</div></section>;
}
