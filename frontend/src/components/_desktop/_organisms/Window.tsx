import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { WindowButton } from 'src/components/_desktop/_atoms';
import { IoClose, IoExpand, IoRemove } from 'react-icons/io5';
import { colors } from 'src/constants/colors';
import {
  changeWindowOnFocus,
  minimizeWindow,
  store,
  useAppSelector
} from 'src/redux';
import { useDispatch } from 'react-redux';
import { handleWindowPosition } from 'src/utils/handleWindowPosition';
import { darken, rgba } from 'polished';
import { light } from 'src/styles';

type WindowProps = {
  onClose: (id: string) => void;
  title: string;
  id: string;
};

const WindowWrapper = styled.article<
  HTMLAttributes<HTMLDivElement> & { isFullSize?: boolean }
>`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: ${(props) => handleWindowPosition(props.id || '')};
  width: 800px;
  min-width: 300px;
  height: 500px;
  min-height: 200px;
  border-radius: 5px;
  box-shadow: ${(props) => (props.isFullSize ? 'none' : '3px 3px #0008')};
  overflow: hidden;
  resize: both;
  background-color: ${(props) =>
    darken(props.theme === light ? 0.05 : 0, props.theme.window)};
  border: 0.5px solid ${colors.black};
  filter: brightness(
    ${(props) => (store.getState().windowOnFocus === props.id ? '1' : '0.8')}
  );

  .window--content {
    flex: 1;
    overflow: auto;

    section {
      padding-bottom: 5%;
    }
  }
`;

const HeaderWindow = styled.div`
  display: flex;
  width: 100%;
  height: 35px;
  flex-direction: row;
  justify-content: flex-end;
  background-color: ${(props) => props.theme.window};
  border-bottom: 1px solid ${(props) => rgba(props.theme.text, 0.1)};
`;

const HeaderTitle = styled.h3`
  display: flex;
  flex-grow: 5;
  flex-shrink: 0;
  flex: 3;
  justify-content: center;
  align-items: center;
  height: auto;
  font-size: 1.1rem;
  opacity: 0.7;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
`;

export const Window: FC<WindowProps> = ({ children, onClose, title, id }) => {
  const [position, setPosition] = useState({ x1: 300, y1: 70, x2: 0, y2: 0 });
  const [fullSize, setFullSize] = useState<boolean>(false);
  const { windowsList } = useAppSelector((state) => state);
  const dispatch = useDispatch();
  const windowItem = windowsList.find((item) => item.id === id);
  const isMinimized = windowItem?.minimized;

  const theme = useTheme();
  const windowRef = useRef<HTMLDivElement>(null);

  function toggleVisibility() {
    if (!windowRef.current) return;

    windowRef.current.style.transform = 'scale(1)';
    windowRef.current.style.transition = 'none';

    if (windowItem) {
      windowRef.current.style.display = 'flex';
      dispatch(changeWindowOnFocus(id));
    } else {
      windowRef.current.style.opacity = '0';
      windowRef.current.style.display = 'flex';
    }
  }

  function limiter(pos: number) {
    const topLimit = 0;

    if (!windowRef.current) return 0;

    return Math.max(pos - position.y2, topLimit);
  }

  function handleDragElement(e: React.DragEvent<HTMLDivElement>) {
    e = e || window.event;
    e.preventDefault();

    setPosition((pos) => ({ ...pos, y2: e.clientY, x2: e.clientX }));

    document.addEventListener('mouseup', closeDragging);
    document.addEventListener('mousemove', handleDragging);

    dispatch(changeWindowOnFocus(id));
  }

  function handleDragging(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();

    setPosition((pos) => ({
      ...pos,
      x1: e.clientX - (pos.x2 - position.x1),
      y1: limiter(e.clientY - (pos.y2 - position.y1))
    }));
  }

  function closeDragging() {
    document.removeEventListener('mousemove', handleDragging);
    document.removeEventListener('mouseup', closeDragging);
    setPosition((pos) => ({ ...pos, x2: 0, y2: 0 }));
  }

  function handleTransition() {
    if (!windowRef.current) return;

    windowRef.current.style.transition = 'ease-in-out 0.3s';

    setTimeout(() => {
      if (!windowRef.current) return;
      return (windowRef.current.style.transition = 'none');
    }, 300);
  }

  function onResizeWindow() {
    if (!windowRef.current) return;

    handleTransition();

    if (!fullSize) {
      windowRef.current.style.height = '100%';
      windowRef.current.style.width = '100%';
      setPosition((pos) => ({ ...pos, x1: 0, y1: 0 }));
    } else {
      windowRef.current.style.height = '500px';
      windowRef.current.style.width = '800px';
      setPosition((pos) => ({ ...pos, x1: 300, y1: 70 }));
    }

    setFullSize((props) => !props);
  }

  function handleMinimize() {
    if (!windowRef.current) return;

    handleTransition();

    if (!isMinimized) {
      dispatch(changeWindowOnFocus(id));
      windowRef.current.style.transform = `translateY(0px)`;
      windowRef.current.style.opacity = '1';
      return;
    }

    windowRef.current.style.transform = `translateY(${window.innerHeight}px) scale(0.2)`;
    windowRef.current.style.opacity = `0`;
  }

  function handleCloseWindow() {
    if (!windowRef.current) return;

    handleTransition();

    windowRef.current.style.transform = 'scale(0.9)';
    windowRef.current.style.opacity = '0';

    setTimeout(() => {
      onClose(id);
    }, 200);
  }

  useEffect(() => {
    if (store.getState().lastType === 'MINIMIZE_WINDOW') {
      handleMinimize();
    } else {
      toggleVisibility();
    }
  }, [windowItem]);

  useEffect(() => {
    const findIndex = windowsList.findIndex((window) => window.id === id);

    setPosition((pos) => ({
      ...pos,
      x1: 300 + findIndex * 50,
      y1: 70 + findIndex * 50
    }));
  }, []);

  return (
    <WindowWrapper
      id={id}
      ref={windowRef}
      isFullSize={fullSize}
      style={{ top: position.y1, left: position.x1 }}
      onClick={() => dispatch(changeWindowOnFocus(id))}
    >
      <HeaderWindow
        onMouseDown={handleDragElement}
        onDoubleClick={onResizeWindow}
      >
        <div
          style={{
            flexGrow: 0.5,
            flex: 0.5
          }}
        ></div>
        <HeaderTitle>
          {title}
          {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. In veniam
          molestiae omnis voluptate atque */}
        </HeaderTitle>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '150px',
            height: 'auto'
          }}
        >
          <WindowButton onClick={() => dispatch(minimizeWindow(id))}>
            <IoRemove size={20} color={theme.text} />
          </WindowButton>
          <WindowButton onClick={onResizeWindow}>
            <IoExpand size={17} color={theme.text} />
          </WindowButton>
          <WindowButton onClick={handleCloseWindow} buttonColor={colors.red}>
            <IoClose size={20} color={theme.text} />
          </WindowButton>
        </div>
      </HeaderWindow>
      <div className="window--content">{children}</div>
    </WindowWrapper>
  );
};
