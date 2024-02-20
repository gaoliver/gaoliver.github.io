import {
  Taskbar,
  Window,
  TaskSettings,
  DesktopIcon,
  Portfolio,
  Contact
} from 'src/components/_desktop';
import { rgba } from 'polished';
import React, { FC } from 'react';
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
import { TextModel } from './components/_desktop/_organisms/TextModel';
import { Note } from './components/_desktop/_organisms/Note';
import { ThemeModelApi } from './@types/Models';

import DesktopImage from 'src/assets/images/desktop_background_sofa.webp';

const PageWrapper = styled.main<
  Partial<typeof styled.main> & { backgrounds: ThemeModelApi }
>`
  display: flex;
  flex-direction: column;
  height: 100svh;
  width: 100%;
  background-image: ${(props) =>
    `url(${props.backgrounds.desktopBackgroundImage || DesktopImage})`};
  background-size: cover;
  background-position: center;
  background-color: ${(props) => rgba(props.theme.home.background, 0.7)};
  background-blend-mode: soft-light;
`;

const DesktopWrapper = styled.article`
  position: relative;
  flex: 1;
  position: relative;
  columns: 12;
  column-fill: auto;
  overflow: hidden;
`;

export const Desktop: FC = () => {
  const dispatch = useDispatch();
  const { windowsList, MYINFO, isLoading, desktop, themeConfig, stickyNotes } =
    useAppSelector((state: AppState) => state);

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

  if (isLoading) {
    return (
      <PageWrapper backgrounds={themeConfig}>
        <Loading />
        <DesktopWrapper id="desktop" style={{ columns: 1 }}></DesktopWrapper>
      </PageWrapper>
    );
  }

  if (themeConfig?.isMaintenanceMode || !MYINFO || !desktop) {
    return (
      <PageWrapper backgrounds={themeConfig}>
        <DesktopWrapper id="desktop" style={{ columns: 1 }}>
          <HomeInfo
            info={MYINFO}
            isMaintenanceMode
            maintenanceText={themeConfig?.maintenanceText}
          />
        </DesktopWrapper>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper backgrounds={themeConfig}>
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
                {...(folder.type === 'Video' && {
                  youtubeVideoId: folder.youTubeVideoId
                })}
                isNotWorking={folder.isNotWorking}
                notWorkingText={folder.notWorkingText}
              />
            )}
            {folder.type === 'Text' && <TextModel text={folder.text} />}
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

        {stickyNotes.map((note, index) => (
          <Note note={note} noteIndex={index} key={index} />
        ))}

        <TaskSettings />
      </DesktopWrapper>
      <Taskbar windowsList={windowsList} onClickWindow={handleToggleWindow} />
    </PageWrapper>
  );
};
