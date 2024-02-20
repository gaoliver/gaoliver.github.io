import { rgba } from 'polished';
import React, { FC } from 'react';
import styled from 'styled-components';
import {
  AppScreen,
  Portfolio,
  ScreenIcon,
  Taskbar
} from './components/_mobile';

import blackIcon from 'src/assets/images/GabrielRamos-blackIcon.png';
import folderIcon from 'src/assets/images/folder.png';
import EmailIcon from 'src/assets/images/email.png';
import { closeAllApps, closeWindow, useAppSelector } from './redux';
import {
  AboutMe,
  Contact,
  EmbedModel,
  HomeInfo,
  Loading,
  TextModel
} from './components/_shared';
import { useDispatch } from 'react-redux';

import Instagram from 'src/assets/svg/instagram.svg';
import LinkedIn from 'src/assets/svg/linkedin.svg';
import GitHub from 'src/assets/svg/github.svg';
import { ThemeModelApi } from './@types/Models';

import DesktopImage from 'src/assets/images/desktop_background_sofa.webp';

type SocialOptions = 'instagram' | 'linkedin' | 'github';

const ScreenWrapper = styled.main<
  Partial<typeof styled.main> & { backgrounds: ThemeModelApi }
>`
  display: block;
  overflow: hidden;
  height: 100svh;
  background-image: ${(props) =>
    `url(${props.backgrounds.mobileBackgroundImage || DesktopImage})`};
  background-size: 250%;
  background-position: center;
  background-color: ${(props) => rgba(props.theme.home.background, 0.7)};
  background-blend-mode: soft-light;
`;

const InnerPage = styled.div`
  position: relative;
  display: table;
  width: 100%;
  height: 100%;
  padding: 15px 0;
`;

const FolderIconContainer = styled.div`
  display: inline-table;
  margin: 5px ${window.innerWidth / 40}px;
`;

export const Mobile: FC = () => {
  const dispatch = useDispatch();
  const { windowsList, MYINFO, isLoading, desktop, themeConfig } =
    useAppSelector((state) => state);

  window.onhashchange = function () {
    dispatch(closeWindow(windowsList[windowsList.length - 1]?.id));
  };

  function onCloseWindow() {
    history.back();
  }

  function goToHome() {
    dispatch(closeAllApps());
    window.location.hash = '/';
  }

  function handleSocialImage(id: SocialOptions) {
    switch (id) {
      case 'github':
        return GitHub;

      case 'instagram':
        return Instagram;

      case 'linkedin':
        return LinkedIn;

      default:
        return '';
    }
  }

  if (isLoading) {
    return (
      <ScreenWrapper backgrounds={themeConfig}>
        <Loading />
        <InnerPage id="desktop" style={{ columns: 1 }}></InnerPage>
      </ScreenWrapper>
    );
  }

  if (themeConfig?.isMaintenanceMode || !MYINFO || !desktop) {
    return (
      <ScreenWrapper backgrounds={themeConfig}>
        <InnerPage id="desktop" style={{ columns: 1 }}>
          {MYINFO && (
            <HomeInfo
              info={MYINFO}
              isMaintenanceMode
              maintenanceText={themeConfig.maintenanceText}
            />
          )}
        </InnerPage>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper backgrounds={themeConfig}>
      {MYINFO && <HomeInfo info={MYINFO} />}

      <InnerPage>
        <FolderIconContainer>
          <ScreenIcon id="about-me" imageSource={blackIcon} label="About me">
            <AboutMe />
          </ScreenIcon>
        </FolderIconContainer>
        <FolderIconContainer>
          <ScreenIcon id="portfolio" imageSource={folderIcon} label="Portfolio">
            <Portfolio />
          </ScreenIcon>
        </FolderIconContainer>
        <FolderIconContainer>
          <ScreenIcon id="contact" imageSource={EmailIcon} label="Contact">
            <Contact />
          </ScreenIcon>
        </FolderIconContainer>

        {MYINFO?.social.map((social) => (
          <FolderIconContainer key={social.id}>
            <ScreenIcon
              id={social.id}
              label={social.name}
              imageSource={handleSocialImage(social.id as SocialOptions)}
            >
              <EmbedModel url={social.url} icon={social.id} isNotWorking />
            </ScreenIcon>
          </FolderIconContainer>
        ))}

        {desktop?.map((folder) => (
          <FolderIconContainer key={folder.id}>
            <ScreenIcon
              label={folder.name}
              imageSource={folder.image.file.url}
              id={folder.id}
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
            </ScreenIcon>
          </FolderIconContainer>
        ))}
      </InnerPage>

      {windowsList.map((window) => {
        return (
          <AppScreen
            key={window.id}
            id={window.id}
            title={window.title}
            onClose={onCloseWindow}
          >
            {window.content}
          </AppScreen>
        );
      })}

      <Taskbar onBack={onCloseWindow} onHome={goToHome} />
    </ScreenWrapper>
  );
};
