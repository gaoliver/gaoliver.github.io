import { createGlobalStyle } from 'styled-components';
import { fonts } from 'src/constants/fonts';
import { ThemeModelApi } from 'src/@types/Models';
import { rgba } from 'polished';

export default createGlobalStyle<{
  backgrounds: ThemeModelApi;
}>`
  :root {
    font-family: Ubuntu, sans-serif;
    font-size: 14px;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background-image: ${(props) =>
      `url(${props.backgrounds.desktopBackgroundImage})`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: ${(props) => props.theme.text};
    transition: all 0.5s ease;
    animation: opacityAnimation 1s;
    @media screen and (max-width: 800px) {
      background-image: ${(props) =>
        `url(${props.backgrounds.mobileBackgroundImage})`};

    }
  }

  ::selection {
    background-color: ${(props) => props.theme.selection};
    color: ${(props) => props.theme.selectedText}
  }

  main {
    background-color: ${(props) => rgba(props.theme.text, 0.7)};
  }

  h1 {
    ${fonts.h1};
    margin-top: 30px;
    margin-bottom: 20px;
  }
  h2 {
    ${fonts.h2};
    margin-top: 20px;
    margin-bottom: 10px;
  }
  h3 {
    ${fonts.h3};
    margin: 20px 0;
  }

  p {
    ${fonts.body};
    line-height: 1.5;
    margin-bottom: 20px;
  }

  button {
    ${fonts.button}
    background-color: ${(props) => props.theme.button.background};
    color: ${(props) => props.theme.button.label};
  }

  ul, ol {
    margin: 20px 40px;
  }

  li p {
    margin-bottom: 10px;
  }

  @keyframes opacityAnimation {
    from {
      opacity: 0
    }
    to {
      opacity: 1
    }
  }
`;
