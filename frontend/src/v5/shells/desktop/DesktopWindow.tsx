import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { FiMaximize2, FiMinus, FiX } from 'react-icons/fi';
import { FeatureContent } from '../../features/FeatureContent';
import type { PortfolioContent } from '../../types/content';
import type { WindowState, WorkspaceAction } from '../../state/workspace';
import styles from './DesktopShell.module.css';

interface Props {
  window: WindowState;
  content: PortfolioContent;
  dispatch: React.Dispatch<WorkspaceAction>;
}

export function DesktopWindow({ window, content, dispatch }: Props) {
  const origin = useRef({ pointerX: 0, pointerY: 0, windowX: 0, windowY: 0 });

  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.maximized || (event.target as HTMLElement).closest('button')) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    origin.current = { pointerX: event.clientX, pointerY: event.clientY, windowX: window.x, windowY: window.y };
    dispatch({ type: 'focus', id: window.id });
  };

  const drag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const x = Math.max(8, Math.min(innerWidth - 220, origin.current.windowX + event.clientX - origin.current.pointerX));
    const y = Math.max(8, Math.min(innerHeight - 130, origin.current.windowY + event.clientY - origin.current.pointerY));
    dispatch({ type: 'move', id: window.id, x, y });
  };

  if (window.minimized) return null;
  return (
    <section
      className={`${styles.window} ${window.maximized ? styles.maximized : ''}`}
      style={window.maximized ? { zIndex: window.z } : { left: window.x, top: window.y, width: window.width, height: window.height, zIndex: window.z }}
      onPointerDown={() => dispatch({ type: 'focus', id: window.id })}
      aria-label={`${window.title} window`}
    >
      <div className={styles.titlebar} onPointerDown={beginDrag} onPointerMove={drag} onDoubleClick={() => dispatch({ type: 'maximize', id: window.id })}>
        <div className={styles.traffic}>
          <button aria-label={`Close ${window.title}`} onClick={() => dispatch({ type: 'close', id: window.id })}><FiX /></button>
          <button aria-label={`Minimize ${window.title}`} onClick={() => dispatch({ type: 'minimize', id: window.id })}><FiMinus /></button>
          <button aria-label={`${window.maximized ? 'Restore' : 'Maximize'} ${window.title}`} onClick={() => dispatch({ type: 'maximize', id: window.id })}><FiMaximize2 /></button>
        </div>
        <strong>{window.title}</strong>
        <span />
      </div>
      <div className={styles.windowBody}><FeatureContent appId={window.appId} content={content} /></div>
    </section>
  );
}
