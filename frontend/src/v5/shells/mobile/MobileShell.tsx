import { useMemo } from 'react';
import { FiChevronLeft, FiMoon, FiSun } from 'react-icons/fi';
import { FeatureContent } from '../../features/FeatureContent';
import type { PortfolioContent } from '../../types/content';
import type { WorkspaceAction, WorkspaceState } from '../../state/workspace';
import { getApps } from '../apps';
import { DynamicIsland } from './DynamicIsland';
import styles from './MobileShell.module.css';

interface Props { content: PortfolioContent; state: WorkspaceState; dispatch: React.Dispatch<WorkspaceAction>; }

export function MobileShell({ content, state, dispatch }: Props) {
  const apps = useMemo(() => getApps(content), [content]);
  const active = apps.find((app) => app.id === state.mobileApp);
  const overlay = state.dark
    ? 'linear-gradient(180deg, rgba(4,12,20,.08), rgba(4,12,20,.55))'
    : 'linear-gradient(180deg, rgba(239,250,246,.22), rgba(178,214,203,.48))';
  const background = content.mobileBackground ? { backgroundImage: `${overlay}, url(${content.mobileBackground})` } : undefined;

  return (
    <main className={styles.phone} style={background}>
      <div className={styles.statusbar}><time>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time><span>5G&nbsp; ◒</span></div>
      <DynamicIsland state={state} dispatch={dispatch} />

      <section className={styles.home} aria-hidden={Boolean(active)}>
        <header className={styles.greeting}>
          <span>Portfolio OS</span>
          <h1>Hi, I’m Gabriel.</h1>
          <p>{content.role}</p>
        </header>
        <div className={styles.appGrid}>
          {apps.map((app) => <button key={app.id} onClick={() => dispatch({ type: 'openMobile', appId: app.id })}><span style={{ '--app-tint': app.tint } as React.CSSProperties}><app.icon /></span><strong>{app.shortTitle}</strong></button>)}
        </div>
        <button className={styles.themeButton} onClick={() => dispatch({ type: 'toggleTheme' })}>{state.dark ? <FiSun /> : <FiMoon />} {state.dark ? 'Light' : 'Dark'} appearance</button>
      </section>

      {active && (
        <section className={styles.mobileApp} aria-label={active.title}>
          <header className={styles.mobileAppBar}>
            <button onClick={() => dispatch({ type: 'closeMobile' })}><FiChevronLeft /> Home</button>
            <strong>{active.shortTitle}</strong><span />
          </header>
          <div className={styles.mobileAppBody}><FeatureContent appId={active.id} content={content} /></div>
        </section>
      )}

      {!active && <nav className={styles.dock} aria-label="Favourite applications">{apps.slice(0, 4).map((app) => <button key={app.id} onClick={() => dispatch({ type: 'openMobile', appId: app.id })} aria-label={`Open ${app.title}`} style={{ '--app-tint': app.tint } as React.CSSProperties}><app.icon /></button>)}</nav>}
      <span className={styles.homeIndicator} />
    </main>
  );
}
