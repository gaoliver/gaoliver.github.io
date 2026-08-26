import { useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
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
  const position = useRef({ x: window.x, y: window.y });
  const windowElement = useRef<HTMLElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.maximized || (event.target as HTMLElement).closest('button')) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    origin.current = { pointerX: event.clientX, pointerY: event.clientY, windowX: window.x, windowY: window.y };
    position.current = { x: window.x, y: window.y };
    dispatch({ type: 'focus', id: window.id });
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dispatch({ type: 'move', id: window.id, ...position.current });
    setIsDragging(false);
  };

  const drag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const x = Math.max(8, Math.min(innerWidth - 220, origin.current.windowX + event.clientX - origin.current.pointerX));
    const y = Math.max(8, Math.min(innerHeight - 130, origin.current.windowY + event.clientY - origin.current.pointerY));
    position.current = { x, y };
    if (windowElement.current) {
      windowElement.current.style.left = `${x}px`;
      windowElement.current.style.top = `${y}px`;
    }
  };

  const frame = window.maximized
    ? { left: 8, top: 43, width: innerWidth - 16, height: innerHeight - 117 }
    : { left: window.x, top: window.y, width: window.width, height: window.height };
  const windowStyle = {
    ...frame,
    zIndex: window.z,
    '--minimize-x': `${innerWidth / 2 - frame.left - frame.width / 2}px`,
    '--minimize-y': `${innerHeight - frame.top - 72}px`,
  } as CSSProperties;

  return (
    <section
      ref={windowElement}
      className={`${styles.window} ${window.maximized ? styles.maximized : ''} ${window.minimized ? styles.minimized : ''} ${isDragging ? styles.dragging : ''}`}
      style={windowStyle}
      onPointerDown={() => dispatch({ type: 'focus', id: window.id })}
      aria-label={`${window.title} window`}
      aria-hidden={window.minimized}
      inert={window.minimized ? true : undefined}
    >
      <div className={styles.titlebar} onPointerDown={beginDrag} onPointerMove={drag} onPointerUp={endDrag} onPointerCancel={endDrag} onDoubleClick={() => dispatch({ type: 'maximize', id: window.id })}>
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
