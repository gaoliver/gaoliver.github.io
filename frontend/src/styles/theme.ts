import { colors } from 'src/constants/colors';

export const themeColors = {
  primary: colors.primary,
  primaryDark: colors.primaryDark,
  secondary: colors.secondary,
  destruct: colors.red
};

export const light = {
  ...themeColors,
  primary: colors.primary,
  text: colors.black,
  window: colors.white,
  selection: colors.primaryDark,
  selectedText: colors.white,
  h1: colors.primary,
  button: colors.primary
};

export const dark = {
  ...themeColors,
  primary: colors.primaryDark,
  text: colors.white,
  window: colors.black,
  selection: colors.secondary,
  selectedText: colors.black,
  h1: colors.secondary,
  button: colors.primary
};
