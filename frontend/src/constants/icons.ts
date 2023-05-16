import { ReactComponent as Logo } from 'src/assets/svg/gabrielramos-logo.svg';
import { ReactComponent as LogoTransparent } from 'src/assets/svg/gabrielramos-logo-transparent.svg';
import { ReactComponent as LogoWithBackground } from 'src/assets/svg/gabrielramos-logowithbackground.svg';
import { ReactComponent as Instagram } from 'src/assets/svg/instagram.svg';
import { ReactComponent as LinkedIn } from 'src/assets/svg/linkedin.svg';
import { ReactComponent as GitHub } from 'src/assets/svg/github.svg';

export const icons = {
  logo: Logo,
  'logo-transparent': LogoTransparent,
  'logo-with-background': LogoWithBackground,
  instagram: Instagram,
  linkedin: LinkedIn,
  github: GitHub
};

export type IconOption = keyof typeof icons;
