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
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100svh;
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
      -webkit-opacity: 0;
      -webkit-transform: scale(0) translateY(-50%);
    }
    100% {
      -webkit-opacity: 1;
      -webkit-transform: scale(1);
    }
  }

  .window--content {
    width: 100%;
    flex: 1;
    overflow: scroll;

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
  height: 50px;
  flex-direction: row;
  justify-content: flex-end;
  background-color: ${(props) => props.theme.window};
  border-bottom: 1px solid ${(props) => rgba(props.theme.text, 0.1)};
`;

const HeaderTitle = styled.span`
  ${fonts.h3};
  display: -webkit-box;
  flex: 1;
  height: fit-content;
  align-items: center;
  justify-content: center;
  align-self: center;
  font-size: 1.5rem;
  opacity: 0.7;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
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
        <WindowButton onClick={() => dispatch(handleCloseWindow)}>
          <BiChevronLeft size={40} color={theme.text} />
        </WindowButton>
        <HeaderTitle>{title}</HeaderTitle>
        <WindowButton />
      </HeaderWindow>
      <div className="window--content">
        {children}
        <footer style={{ height: '80px' }} />
      </div>
    </WindowWrapper>
  );
};
