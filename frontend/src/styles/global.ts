import { createGlobalStyle } from 'styled-components';
import phoneImg from 'src/assets/images/optimized/mobile_background.webp';
import desktopImg from 'src/assets/images/optimized/desktop_background.webp';
import { fonts } from 'src/constants/fonts';

export default createGlobalStyle`
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
    background-image: url(${desktopImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: ${(props) => props.theme.text};
    transition: all 0.5s ease;
    @media screen and (max-width: 800px) {
      background-image: url(${phoneImg});
    }
  }

  ::selection {
    background-color: ${(props) => props.theme.selection};
    color: ${(props) => props.theme.selectedText}
  }

  h1 {
    ${fonts.h1}
  }
  h2 {
    ${fonts.h2}
  }
  h3 {
    ${fonts.h3}
  }
  p {
    ${fonts.body}
    line-height: 25px;
    margin-top: 30px;
  }
  button {
    ${fonts.button}
  }

`;
