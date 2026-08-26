import { FiArrowUpRight, FiLinkedin, FiMail, FiMessageCircle, FiSend } from 'react-icons/fi';
import type { PortfolioContent } from '../types/content';
import styles from './FeatureContent.module.css';

export function ContactView({ content }: { content: PortfolioContent }) {
  const digits = content.phone?.replace(/\D/g, '');
  const whatsapp = digits ? `https://wa.me/${digits}?text=${encodeURIComponent(content.whatsAppMessage ?? 'Hi Gabriel!')}` : undefined;
  const linkedin = content.socials.find((social) => social.label.toLowerCase().includes('linkedin'));
  return <section className={styles.contact}><span className={styles.eyebrow}>Send me a message</span><h1>Let’s start with a conversation.</h1><p>Reach me through LinkedIn, WhatsApp, Telegram, or a classic email. Choose whichever feels easiest.</p><div className={styles.contactOptions}>
    {whatsapp && <a className={styles.whatsapp} href={whatsapp} target="_blank" rel="noreferrer"><FiMessageCircle /><span><strong>WhatsApp</strong><small>Start a quick conversation</small></span><FiArrowUpRight /></a>}
    {content.telegramUrl && <a className={styles.telegram} href={content.telegramUrl} target="_blank" rel="noreferrer"><FiSend /><span><strong>Telegram</strong><small>Message me on Telegram</small></span><FiArrowUpRight /></a>}
    <a className={styles.emailOption} href={`mailto:${content.email}`}><FiMail /><span><strong>Email</strong><small>{content.email}</small></span><FiArrowUpRight /></a>
    {linkedin && <a className={styles.linkedin} href={linkedin.url} target="_blank" rel="noreferrer"><FiLinkedin /><span><strong>LinkedIn</strong><small>Connect professionally</small></span><FiArrowUpRight /></a>}
  </div></section>;
}
