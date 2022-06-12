import { rgba } from 'polished';
import React, { FC, useEffect } from 'react';
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
import WebsiteIcon from 'src/assets/images/website.png';
import {
  closeAllApps,
  closeWindow,
  getInfo,
  getPortfolio,
  getTools,
  useAppSelector
} from './redux';
import { AboutMe, Contact, EmbedModel } from './components/_shared';
import { useDispatch } from 'react-redux';

import Instagram from 'src/assets/svg/instagram.svg';
import LinkedIn from 'src/assets/svg/linkedin.svg';
import GitHub from 'src/assets/svg/github.svg';
import { colors } from './constants/colors';

type SocialOptions = 'instagram' | 'linkedin' | 'github';

const ScreenWrapper = styled.div`
  display: block;
  overflow: hidden;
  height: ${window.innerHeight}px;
  background-color: ${(props) => rgba(props.theme.primary, 0.4)};
`;

const InnerPage = styled.div`
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
  const { windowsList, MYINFO, theme } = useAppSelector((state) => state);

  function onCloseWindow(id: string) {
    dispatch(closeWindow(id));
  }

  function goToHome() {
    dispatch(closeAllApps());
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

  useEffect(() => {
    dispatch(getInfo());
    dispatch(getPortfolio());
    dispatch(getTools());
  }, []);

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme.window);
  }, [theme]);

  return (
    <ScreenWrapper>
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
        <FolderIconContainer>
          <ScreenIcon
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
          </ScreenIcon>
        </FolderIconContainer>
        <FolderIconContainer>
          <ScreenIcon
            label="About this project"
            imageSource={WebsiteIcon}
            id="post_about_project"
          >
            <EmbedModel url="https://www.linkedin.com/embed/feed/update/urn:li:share:6941295016061358081" />
          </ScreenIcon>
        </FolderIconContainer>
        {MYINFO?.social.map((social) => (
          <FolderIconContainer key={social.id}>
            <ScreenIcon
              id={social.id}
              label={social.title}
              imageSource={handleSocialImage(social.id as SocialOptions)}
            >
              <EmbedModel url={social.url} icon={social.id} notWorking />
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

      <Taskbar
        onBack={() => onCloseWindow(windowsList[windowsList.length - 1].id)}
        onHome={goToHome}
      />
    </ScreenWrapper>
  );
};
