import {
  Taskbar,
  Window,
  TaskSettings,
  DesktopIcon,
  Portfolio,
  Contact
} from 'src/components/_desktop';
import { rgba } from 'polished';
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import {
  AppState,
  closeWindow,
  minimizeWindow,
  useAppSelector,
  changeWindowOnFocus
} from 'src/redux';
import { useDispatch } from 'react-redux';
import { AboutMe, EmbedModel, HomeInfo, Loading } from './components/_shared';

import whiteIcon from 'src/assets/images/GabrielRamos-whiteIcon.png';
import folderIcon from 'src/assets/images/folder.png';
import EmailIcon from 'src/assets/images/email.png';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100svh;
  width: 100%;
  background-color: ${(props) => rgba(props.theme.primary, 0.7)};
`;

const DesktopWrapper = styled.article`
  flex: 1;
  position: relative;
  columns: 10;
  column-fill: auto;
  overflow: hidden;
`;

export const Desktop: FC = () => {
  const dispatch = useDispatch();
  const { windowsList, MYINFO, isLoading, desktop } = useAppSelector(
    (state: AppState) => state
  );

  function handleToggleWindow(id: string) {
    dispatch(minimizeWindow(id));
  }

  function onCloseWindow(id: string) {
    dispatch(closeWindow(id));
    history.back();

    if (windowsList.length) {
      dispatch(changeWindowOnFocus(windowsList[windowsList.length - 1].id));
    } else {
      dispatch(changeWindowOnFocus(''));
    }
  }

  useEffect(() => {
    document.addEventListener('contextmenu', (ev: MouseEvent) =>
      ev.preventDefault()
    );
  }, []);

  return (
    <PageWrapper>
      {isLoading && <Loading />}

      {MYINFO && <HomeInfo info={MYINFO} />}
      <DesktopWrapper id="desktop">
        <DesktopIcon label="About me" imageSource={whiteIcon} id="about_me">
          <AboutMe />
        </DesktopIcon>
        <DesktopIcon label="Portfolio" imageSource={folderIcon} id="portfolio">
          <Portfolio />
        </DesktopIcon>
        <DesktopIcon label="Contact" imageSource={EmailIcon} id="contact">
          <Contact />
        </DesktopIcon>

        {desktop?.map((folder) => (
          <DesktopIcon
            label={folder.name}
            imageSource={folder.image.file.url}
            id={folder.id}
            key={folder.id}
          >
            {(folder.type === 'Embed' || folder.type === 'Video') && (
              <EmbedModel
                {...(folder.type === 'Embed' && { url: folder.url })}
                {...(folder.type === 'Video' && { youtubeVideoId: folder.youTubeVideoId })}
                isNotWorking={folder.isNotWorking}
                notWorkingText={folder.notWorkingText}
              />
            )}
          </DesktopIcon>
        ))}

        {windowsList.map((window) => {
          return (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              onClose={onCloseWindow}
            >
              {window.content}
            </Window>
          );
        })}
        <TaskSettings />
      </DesktopWrapper>
      <Taskbar windowsList={windowsList} onClickWindow={handleToggleWindow} />
    </PageWrapper>
  );
};
