import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'src/styles/global';
import { Desktop } from './Desktop';
import { Mobile } from './Mobile';
import {
  getDesktop,
  getInfo,
  getPortfolio,
  getThemeApi,
  getTools,
  toggleLoading,
  toggleTheme,
  useAppSelector
} from './redux';
import { useDispatch } from 'react-redux';
import { dark, light } from './styles';

const App: React.FC = () => {
  const { theme, themeConfig, MYINFO } = useAppSelector((state) => state);
  const dispatch = useDispatch();
  const getCurrentTime = new Date().getHours();
  const [screenSize, setScreenSize] = useState({
    height: window.screen.height,
    width: window.screen.width
  });
  const aspectRatio = screenSize.height / screenSize.width;

  window.addEventListener('resize', () => {
    setScreenSize({
      height: window.screen.height,
      width: window.screen.width
    });
  });

  const autoTheme = () => {
    if (getCurrentTime < 18 && getCurrentTime > 6) {
      dispatch(toggleTheme(light));
    } else {
      dispatch(toggleTheme(dark));
    }
  };

  const RenderPlatform = useCallback(() => {
    if (aspectRatio < 1) {
      return <Desktop />;
    }

    return <Mobile />;
  }, [aspectRatio]);

  useEffect(() => {
    autoTheme();
  }, [getCurrentTime]);

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme.window);
  }, [theme]);

  useEffect(() => {
    if (MYINFO) {
      dispatch(toggleLoading(false));
    }
  }, [MYINFO]);

  useEffect(() => {
    if (window.location.hash) {
      window.location.hash = '';
    }

    dispatch(toggleLoading(true));
    dispatch(getThemeApi());
    dispatch(getInfo());
    dispatch(getTools());
    dispatch(getPortfolio());
    dispatch(getDesktop());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <RenderPlatform />
      <GlobalStyle backgrounds={themeConfig} />
    </ThemeProvider>
  );
};

export default App;
