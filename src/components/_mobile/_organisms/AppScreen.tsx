import React, { FC, HTMLAttributes, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { WindowButton } from 'src/components/_desktop/_atoms';
import { BiChevronLeft } from 'react-icons/bi';
import { changeWindowOnFocus } from 'src/redux';
import { useDispatch } from 'react-redux';
import { darken, rgba } from 'polished';
import { light } from 'src/styles';
import { fonts } from 'src/constants/fonts';

type WindowProps = {
  onClose: () => void;
  title: string;
  id: string;
};

const WindowWrapper = styled.article<
  HTMLAttributes<HTMLDivElement> & { isFullSize?: boolean }
>`
  position: absolute;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) =>
    darken(props.theme === light ? 0.05 : 0, props.theme.window)};
  animation: open-app 0.5s;
  -webkit-animation: open-app 0.5s;

  @keyframes open-app {
    0% {
      opacity: 0;
      transform: scale(0) translateY(-50%);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @-webkit-keyframes open-app {
    0% {
      opacity: 0;
      -webkit-opacity: 0;
      transform: scale(0) translateY(-50%);
      -webkit-transform: scale(0) translateY(-50%);
    }
    100% {
      opacity: 1;
      -webkit-opacity: 1;
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }

  .window--content {
    width: 100%;
    height: 93%;
    overflow: scroll;

    section {
      padding-bottom: 150px;
    }

    #contact-page {
      p,
      button {
        width: 350px;
      }
    }
  }
`;

const HeaderWindow = styled.div`
  display: flex;
  width: 100%;
  height: 7%;
  flex-direction: row;
  justify-content: flex-end;
  background-color: ${(props) => props.theme.window};
  border-bottom: 1px solid ${(props) => rgba(props.theme.text, 0.1)};
`;

const HeaderTitle = styled.h3`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  opacity: 0.7;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
  font-weight: ${fonts.h2.fontWeight};
`;

export const AppScreen: FC<WindowProps> = ({
  children,
  onClose,
  title,
  id
}) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const windowRef = useRef<HTMLDivElement>(null);

  function handleTransition() {
    if (!windowRef.current) return;

    windowRef.current.style.transition = 'ease-in-out 0.3s';

    setTimeout(() => {
      if (!windowRef.current) return;
      return (windowRef.current.style.transition = 'none');
    }, 300);
  }

  function handleCloseWindow() {
    if (!windowRef.current) return;

    handleTransition();

    windowRef.current.style.transform = 'translateX(50%)';
    windowRef.current.style.opacity = '0';

    setTimeout(() => {
      onClose();
    }, 200);
  }

  return (
    <WindowWrapper
      id={id}
      ref={windowRef}
      onClick={() => dispatch(changeWindowOnFocus(id))}
    >
      <HeaderWindow>
        <WindowButton onClick={() => dispatch(handleCloseWindow())}>
          <BiChevronLeft size={40} color={theme.text} />
        </WindowButton>
        <HeaderTitle>{title}</HeaderTitle>
        <WindowButton />
      </HeaderWindow>
      <div className="window--content">{children}</div>
    </WindowWrapper>
  );
};
