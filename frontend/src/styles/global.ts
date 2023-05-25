import { createGlobalStyle } from 'styled-components';
import { fonts } from 'src/constants/fonts';
import { ThemeModelApi } from 'src/@types/Models';

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
    @media screen and (max-width: 800px) {
      background-image: ${(props) =>
        `url(${props.backgrounds.mobileBackgroundImage})`};

    }
  }

  ::selection {
    background-color: ${(props) => props.theme.selection};
    color: ${(props) => props.theme.selectedText}
  }

  h1 {
    ${fonts.h1};
  }
  h2 {
    ${fonts.h2}
  }
  h3 {
    ${fonts.h3};
    margin-top: 30px;
  }

  p {
    ${fonts.body};
    line-height: 1.5;
    margin-bottom: 20px;
  }

  button {
    ${fonts.button}
  }

  ul, ol {
    margin: 20px 40px;
  }

  li p {
    margin-bottom: 10px;
  }

`;
