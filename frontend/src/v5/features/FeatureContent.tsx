import { FiArrowUpRight, FiDownload, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import type { AppId, PortfolioContent } from '../types/content';
import styles from './FeatureContent.module.css';

interface Props {
  appId: AppId;
  content: PortfolioContent;
}

export function FeatureContent({ appId, content }: Props) {
  if (appId === 'about') {
    return (
      <article className={styles.article}>
        <div className={styles.profile}>
          {content.avatar ? <img src={content.avatar} alt="" className={styles.avatar} /> : <span className={styles.monogram}>GR</span>}
          <div>
            <span className={styles.eyebrow}>Hello, I’m</span>
            <h1>{content.name}</h1>
            <p className={styles.role}>{content.role}</p>
          </div>
        </div>
        <p className={styles.lead}>{content.about}</p>
        <p className={styles.location}><FiMapPin aria-hidden="true" /> {content.location}</p>
        <div className={styles.values}>
          <div><strong>Product-minded</strong><span>Engineering decisions grounded in real user needs.</span></div>
          <div><strong>Built to last</strong><span>Clear systems, thoughtful trade-offs and maintainable code.</span></div>
          <div><strong>Human by default</strong><span>Accessible experiences with personality and purpose.</span></div>
        </div>
      </article>
    );
  }

  if (appId === 'work') {
    return (
      <section className={styles.work}>
        <header className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Selected work</span>
          <h1>Products with depth, clarity and care.</h1>
        </header>
        <div className={styles.projects}>
          {content.projects.map((project) => (
            <article className={styles.project} key={project.id} style={{ '--project-accent': project.accent ?? '#78dcca' } as React.CSSProperties}>
              {project.image && <img src={project.image} alt="" loading="lazy" />}
              <div className={styles.projectBody}>
                <span className={styles.meta}>{[project.company, project.period].filter(Boolean).join(' · ')}</span>
                <h2>{project.name}</h2>
                <p>{project.summary}</p>
                <div className={styles.tags}>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                {project.url && <a href={project.url} target="_blank" rel="noreferrer">View project <FiArrowUpRight aria-hidden="true" /></a>}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (appId === 'contact') {
    return (
      <section className={styles.contact}>
        <span className={styles.eyebrow}>Let’s build something useful</span>
        <h1>Good work starts with a good conversation.</h1>
        <p>Have a product challenge, a role in mind, or simply want to compare notes? Send me a message.</p>
        <a className={styles.primaryAction} href={`mailto:${content.email}`}><FiMail aria-hidden="true" /> {content.email}</a>
        {content.phone && <a className={styles.secondaryAction} href={`tel:${content.phone}`}><FiPhone aria-hidden="true" /> {content.phone}</a>}
        <div className={styles.socials}>{content.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer">{social.label}<FiArrowUpRight aria-hidden="true" /></a>)}</div>
      </section>
    );
  }

  if (appId === 'resume') {
    return (
      <section className={styles.resume}>
        <span className={styles.eyebrow}>Résumé</span>
        <h1>A practical builder with a product perspective.</h1>
        <p>Senior fullstack development, technical leadership and product delivery across complex digital platforms.</p>
        <div className={styles.timeline}>
          <div><span>Today</span><strong>Building dependable products and engineering teams</strong></div>
          <div><span>Focus</span><strong>TypeScript, React, distributed systems and domain design</strong></div>
          <div><span>Approach</span><strong>Simple architecture, measurable outcomes and continuous improvement</strong></div>
        </div>
        {content.resumeUrl && <a className={styles.primaryAction} href={content.resumeUrl} target="_blank" rel="noreferrer"><FiDownload aria-hidden="true" /> Download résumé</a>}
      </section>
    );
  }

  const folder = content.folders.find((item) => appId === `folder:${item.id}`);
  if (!folder) return null;
  return (
    <section className={styles.folder}>
      <span className={styles.eyebrow}>{folder.type}</span>
      <h1>{folder.name}</h1>
      {folder.text && <p className={styles.lead}>{folder.text}</p>}
      {folder.image && <img className={styles.heroImage} src={folder.image} alt="" />}
      {folder.gallery.length > 0 && <div className={styles.gallery}>{folder.gallery.map((item) => <img key={item.id} src={item.image} alt={item.title} loading="lazy" />)}</div>}
      {folder.url && <a className={styles.primaryAction} href={folder.url} target="_blank" rel="noreferrer">Open link <FiArrowUpRight /></a>}
    </section>
  );
}
