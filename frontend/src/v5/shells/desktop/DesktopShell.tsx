import { useEffect, useMemo, useRef, useState } from 'react';
import { FiMoon, FiSun, FiWifi } from 'react-icons/fi';
import { getApps } from '../apps';
import { DesktopWindow } from './DesktopWindow';
import type { PortfolioContent } from '../../types/content';
import type { WorkspaceState, WorkspaceAction } from '../../state/workspace';
import styles from './DesktopShell.module.css';

interface Props { content: PortfolioContent; state: WorkspaceState; dispatch: React.Dispatch<WorkspaceAction>; }

export function DesktopShell({ content, state, dispatch }: Props) {
  const apps = useMemo(() => getApps(content), [content]);
  const [time, setTime] = useState(() => new Date());
  const hasBooted = useRef(false);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!hasBooted.current) {
      hasBooted.current = true;
      dispatch({ type: 'open', appId: 'about', title: 'About Gabriel' });
    }
  }, [dispatch]);

  const open = (appId: (typeof apps)[number]['id'], title: string) => dispatch({ type: 'open', appId, title });
  const background = content.desktopBackground ? { backgroundImage: `linear-gradient(145deg, rgba(5,13,24,.08), rgba(5,13,24,.36)), url(${content.desktopBackground})` } : undefined;

  return (
    <main className={styles.desktop} style={background}>
      <div className={styles.topbar}>
        <strong>GR<span>workspace</span></strong>
        <div><FiWifi aria-hidden="true" /><span>{time.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span><time>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time></div>
      </div>

      <div className={styles.iconGrid} aria-label="Portfolio applications">
        {apps.map((app) => <button key={app.id} onDoubleClick={() => open(app.id, app.title)} onClick={() => open(app.id, app.title)}><span style={{ '--app-tint': app.tint } as React.CSSProperties}><app.icon /></span><strong>{app.shortTitle}</strong></button>)}
      </div>

      {state.windows.map((window) => <DesktopWindow key={window.id} window={window} content={content} dispatch={dispatch} />)}

      <nav className={styles.taskbar} aria-label="Open applications">
        <button className={styles.brand} onClick={() => open('about', 'About Gabriel')} aria-label="Open About">GR</button>
        <div className={styles.running}>
          {state.windows.map((window) => {
            const app = apps.find((item) => item.id === window.appId);
            if (!app) return null;
            return <button key={window.id} className={!window.minimized ? styles.active : ''} onClick={() => window.minimized ? open(window.appId, window.title) : dispatch({ type: 'focus', id: window.id })}><app.icon /><span>{app.shortTitle}</span></button>;
          })}
        </div>
        <button className={styles.theme} onClick={() => dispatch({ type: 'toggleTheme' })} aria-label={`Use ${state.dark ? 'light' : 'dark'} theme`}>{state.dark ? <FiSun /> : <FiMoon />}</button>
      </nav>
    </main>
  );
}
