import { ThemeColorsProps, UniversalThemeColors } from 'src/@types/Settings';
import { colors } from 'src/constants/colors';

export const universalColors: UniversalThemeColors = {
  destruct: colors.red
};

export const light: ThemeColorsProps = {
  ...universalColors,
  primary: colors.primary,
  primaryDark: colors.primaryDark,
  secondary: colors.secondary,
  text: colors.black,
  window: colors.white,
  home: {
    background: colors.primary
  },
  selection: colors.primaryDark,
  selectedText: colors.white,
  h1: colors.primary,
  h2: colors.black,
  h3: colors.black,
  button: {
    background: colors.primary,
    label: colors.white
  }
};

export const dark: ThemeColorsProps = {
  ...universalColors,
  primary: colors.secondary,
  primaryDark: colors.secondaryDark,
  secondary: colors.primary,
  home: {
    background: colors.primaryDark
  },
  window: colors.black,
  selection: colors.secondary,
  selectedText: colors.black,
  h1: colors.secondary,
  h2: colors.white,
  h3: colors.white,
  text: colors.white,
  button: {
    background: colors.secondary,
    label: colors.black
  }
};
