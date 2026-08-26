import { FiArrowUpRight, FiFolder } from 'react-icons/fi';
import type { PortfolioContent, Project } from '../types/content';
import { FormattedText } from './FormattedText';
import { RichText } from './RichText';
import styles from './FeatureContent.module.css';

const projectFacts = (project: Project) => [
  { label: 'Company', value: project.company },
  { label: 'Role', value: project.role },
  { label: 'Project type', value: project.projectType },
  { label: 'Primary technology', value: project.language },
  { label: 'Period', value: project.period },
].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

export function ProjectView({ project, onOpenImage }: { project: Project; onOpenImage: (image: Project['gallery'][number]) => void }) {
  const gallery = project.gallery ?? [];
  return <article className={styles.projectDetail}>
    <header className={styles.projectDetailHeader}>{project.image && <img src={project.image} alt="" />}<div><span className={styles.eyebrow}>{project.company}</span><h1>{project.name}</h1><p>{project.projectType ?? 'Selected project'}</p></div></header>
    <dl className={styles.projectMetadata}>{projectFacts(project).map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
    {project.tools.length > 0 && <section className={styles.projectTools}><h2>Main tools and technologies</h2><div className={styles.projectFacts}>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></section>}
    <section className={styles.projectStory}><h2>About the project</h2>{project.descriptionDocument?.nodeType === 'document' ? <RichText document={project.descriptionDocument} className={styles.richProject} /> : <FormattedText text={project.summary} className={styles.richProject} />}</section>
    {project.url && <a className={styles.primaryAction} href={project.url} target="_blank" rel="noreferrer">Visit project <FiArrowUpRight /></a>}
    {gallery.length > 0 && <section className={styles.projectGallery}><h2>Project gallery <small>{gallery.length} images</small></h2><div>{gallery.map((image) => <button className={styles.galleryButton} key={image.id} onClick={() => onOpenImage(image)} aria-label={`Open ${image.title} in image viewer`}><img src={image.image} alt={image.title} loading="lazy" /><span>{image.title}</span></button>)}</div></section>}
  </article>;
}

export function WorkExplorer({ content, onOpenProject }: { content: PortfolioContent; onOpenProject: (project: Project) => void }) {
  return <section className={styles.workExplorer}><header className={styles.sectionHeader}><span className={styles.eyebrow}>Selected work</span><h1>Project folder</h1><p>Each project is its own folder. Open one to launch a separate window with its complete Contentful record and gallery.</p></header><div className={styles.projectFolders}>{content.projects.map((project) => <button key={project.id} onDoubleClick={() => onOpenProject(project)} onClick={() => onOpenProject(project)}><span className={styles.folderIcon} style={{ '--project-accent': project.accent ?? '#78dcca' } as React.CSSProperties}><FiFolder />{project.image && <img src={project.image} alt="" loading="lazy" />}</span><strong>{project.name}</strong><small>{project.company}</small></button>)}</div></section>;
}
