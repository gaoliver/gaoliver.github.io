import { lazy, Suspense, useReducer } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { usePortfolioContent } from '../hooks/usePortfolioContent';
import { initialWorkspace, workspaceReducer } from '../state/workspace';
import styles from './App.module.css';

const DesktopShell = lazy(() => import('../shells/desktop/DesktopShell').then((module) => ({ default: module.DesktopShell })));
const MobileShell = lazy(() => import('../shells/mobile/MobileShell').then((module) => ({ default: module.MobileShell })));

export default function App() {
  const isDesktop = useMediaQuery('(min-width: 64rem) and (pointer: fine)');
  const content = usePortfolioContent();
  const [state, dispatch] = useReducer(workspaceReducer, initialWorkspace);

  return (
    <div data-theme={state.dark ? 'dark' : 'light'} className={styles.app}>
      <Suspense fallback={<div className={styles.boot}><span>GR</span><p>Starting portfolio…</p></div>}>
        {isDesktop
          ? <DesktopShell content={content} state={state} dispatch={dispatch} />
          : <MobileShell content={content} state={state} dispatch={dispatch} />}
      </Suspense>
    </div>
  );
}
