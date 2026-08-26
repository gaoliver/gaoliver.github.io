import { FiAlertCircle, FiArrowUpRight, FiExternalLink } from 'react-icons/fi';
import type { DesktopFolder, PortfolioContent } from '../types/content';
import { RichText } from './RichText';
import styles from './FeatureContent.module.css';

const embedUrl = (folder: DesktopFolder): string | undefined => {
  if (folder.videoId) return `https://www.youtube-nocookie.com/embed/${folder.videoId}`;
  if (folder.id === 'ouca-meu-podcast') return 'https://creators.spotify.com/pod/profile/devmundo/embed';
  return folder.url;
};

export function FolderView({ folder, content }: { folder: DesktopFolder; content: PortfolioContent }) {
  const url = embedUrl(folder);
  if (folder.isNotWorking) return <section className={styles.unavailable}><FiAlertCircle /><h1>{folder.name}</h1><p>{folder.notWorkingText ?? 'This content is temporarily unavailable.'}</p>{folder.url && <a className={styles.primaryAction} href={folder.url} target="_blank" rel="noreferrer">Try original page <FiArrowUpRight /></a>}</section>;
  if (folder.id === 'external-links') return <section className={styles.linkHub}><div className={styles.linkHubIdentity}>{content.avatar ? <img src={content.avatar} alt="" /> : <span>GR</span>}<h1>{content.name}</h1><p>{content.role}</p></div><div className={styles.linkHubLinks}>{content.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer"><span>{social.label}</span><FiArrowUpRight /></a>)}<a href={`mailto:${content.email}`}><span>Email</span><FiArrowUpRight /></a></div></section>;
  if ((folder.type === 'Embed' || folder.type === 'Video') && url) return <section className={styles.embeddedApp}><div className={styles.browserBar}><span><i /><i /><i /></span><div>{folder.url ?? url}</div><a href={folder.url ?? url} target="_blank" rel="noreferrer" aria-label={`Open ${folder.name} in a new tab`}><FiExternalLink /></a></div><iframe title={folder.name} src={url} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" /><p className={styles.embedFallback}>If the provider blocks embedded viewing, <a href={folder.url ?? url} target="_blank" rel="noreferrer">open the page directly</a>.</p></section>;
  if (folder.type === 'Text' && folder.id === 'what-is-new') return <article className={styles.noteApp}><div className={styles.noteToolbar}><span /><strong>Notes</strong><small>From Contentful</small></div><div className={styles.notePaper}>{folder.textDocument ? <RichText document={folder.textDocument} className={styles.richNote} /> : <p>{folder.text}</p>}</div></article>;
  if (folder.type === 'Text') return <article className={styles.textPage}><span className={styles.eyebrow}>A message from Gabriel</span>{folder.textDocument ? <RichText document={folder.textDocument} className={styles.richTextPage} /> : <p>{folder.text}</p>}</article>;
  return <section className={styles.folderGallery}><span className={styles.eyebrow}>{folder.type}</span><h1>{folder.name}</h1>{folder.gallery.length > 0 && <div>{folder.gallery.map((item) => <figure key={item.id}><img src={item.image} alt={item.title} loading="lazy" /><figcaption>{item.title}</figcaption></figure>)}</div>}</section>;
}
