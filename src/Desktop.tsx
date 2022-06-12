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
  getInfo,
  getPortfolio,
  getTools,
  minimizeWindow,
  useAppSelector,
  changeWindowOnFocus
} from 'src/redux';
import { useDispatch } from 'react-redux';
import { AboutMe, EmbedModel, HomeInfo } from './components/_shared';

import whiteIcon from 'src/assets/images/GabrielRamos-whiteIcon.png';
import folderIcon from 'src/assets/images/folder.png';
import EmailIcon from 'src/assets/images/email.png';
import WebsiteIcon from 'src/assets/images/website.png';
import { colors } from './constants/colors';

const PageWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  width: 100%;
  background-color: ${(props) => rgba(props.theme.primary, 0.7)};
`;

const DesktopWrapper = styled.article`
  flex: 1;
  position: relative;
`;

export const Desktop: FC = () => {
  const dispatch = useDispatch();
  const { windowsList, MYINFO, theme } = useAppSelector(
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
      dispatch(changeWindowOnFocus(""));
    }
  }

  useEffect(() => {
    dispatch(getInfo());
    dispatch(getTools());
    dispatch(getPortfolio());
  }, []);

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme.window);
  }, [theme]);

  return (
    <PageWrapper>
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
        <DesktopIcon
          label="No-sense website I just made for fun"
          imageSource={WebsiteIcon}
          id="infinity_scroller"
        >
          <div
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: colors.white
            }}
          >
            <EmbedModel url="https://gaoliver.github.io/scroller/" />
          </div>
        </DesktopIcon>
        <DesktopIcon
          label="About the project"
          imageSource={WebsiteIcon}
          id="post_about_project"
        >
          <EmbedModel url="https://www.linkedin.com/embed/feed/update/urn:li:share:6941295016061358081" />
        </DesktopIcon>

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
