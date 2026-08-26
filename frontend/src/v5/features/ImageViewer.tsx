import { FiExternalLink } from 'react-icons/fi';
import type { Project } from '../types/content';
import styles from './FeatureContent.module.css';

interface ImageViewerProps {
  project: Project;
  image: Project['gallery'][number];
}

export function ImageViewer({ project, image }: ImageViewerProps) {
  return <article className={styles.imageViewer}>
    <header className={styles.imageViewerHeader}>
      <div><span className={styles.eyebrow}>{project.name}</span><strong>{image.title}</strong></div>
      <div className={styles.imageViewerActions}>
        <a href={image.image} target="_blank" rel="noreferrer">Open original <FiExternalLink /></a>
      </div>
    </header>
    <div className={styles.imageCanvas}>
      <img src={image.image} alt={image.title} />
    </div>
    <footer>{image.title} <span>·</span> {project.company ?? project.name}</footer>
  </article>;
}
