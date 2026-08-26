import { FiBriefcase, FiMapPin } from 'react-icons/fi';
import type { PortfolioContent } from '../types/content';
import { RichText } from './RichText';
import styles from './FeatureContent.module.css';

const ageFrom = (birthdate?: string): number | undefined => {
  if (!birthdate) return undefined;
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age -= 1;
  return age;
};
const categoryLabel = (category: string) => ({ pro: 'Advanced', intermediate: 'Intermediate', beginner: 'Learning' }[category] ?? category);

export function AboutView({ content }: { content: PortfolioContent }) {
  const age = ageFrom(content.birthdate);
  return <article className={styles.article}>
    <div className={styles.profile}>{content.avatar ? <img src={content.avatar} alt="" className={styles.avatar} /> : <span className={styles.monogram}>GR</span>}<div><span className={styles.eyebrow}>About me</span><h1>{content.name}</h1><p className={styles.role}>{content.role}</p></div></div>
    <div className={styles.personalDetails}>{age && <span>{age} years old</span>}<span><FiMapPin /> {content.location}</span>{content.company && <span><FiBriefcase /> {content.company}</span>}</div>
    {content.aboutDocument ? <RichText document={content.aboutDocument} className={styles.richAbout} /> : <p className={styles.lead}>{content.about}</p>}
    <section className={styles.skillsSection}><div className={styles.sectionHeader}><span className={styles.eyebrow}>Technology profile</span><h2>Languages and frameworks</h2></div><div className={styles.skillGroups}>{(content.skillGroups ?? []).map((group) => <div key={group.category}><strong>{categoryLabel(group.category)}</strong><div className={styles.tags}>{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div><div className={styles.toolbox}><strong>Tools I use</strong><div className={styles.tags}>{(content.tools ?? []).map((tool) => <span key={tool}>{tool}</span>)}</div></div></section>
  </article>;
}
