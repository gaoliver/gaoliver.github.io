import { FiBriefcase, FiMail, FiMoon, FiSun, FiX } from 'react-icons/fi';
import type { WorkspaceAction, WorkspaceState } from '../../state/workspace';
import styles from './MobileShell.module.css';

interface Props { state: WorkspaceState; dispatch: React.Dispatch<WorkspaceAction>; }

export function DynamicIsland({ state, dispatch }: Props) {
  return (
    <div className={`${styles.island} ${state.islandExpanded ? styles.islandExpanded : ''}`}>
      <button className={styles.islandSummary} onClick={() => dispatch({ type: 'toggleIsland' })} aria-expanded={state.islandExpanded}>
        <span className={styles.statusDot} />
        <span><strong>Available</strong><small>Open to interesting work</small></span>
        {state.islandExpanded ? <FiX /> : <span className={styles.wave}><i /><i /><i /></span>}
      </button>
      {state.islandExpanded && (
        <div className={styles.islandActions}>
          <button onClick={() => dispatch({ type: 'openMobile', appId: 'contact' })}><FiMail /> Message</button>
          <button onClick={() => dispatch({ type: 'openMobile', appId: 'work' })}><FiBriefcase /> Work</button>
          <button onClick={() => dispatch({ type: 'toggleTheme' })}>{state.dark ? <FiSun /> : <FiMoon />} Theme</button>
        </div>
      )}
    </div>
  );
}
