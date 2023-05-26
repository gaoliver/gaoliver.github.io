export type UniversalThemeColors = {
  destruct: string;
};

export type ThemeColorsProps = UniversalThemeColors & {
  primary: string;
  primaryDark: string;
  secondary: string;
  home: {
    background: string;
  };
  window: string;
  selection: string;
  selectedText: string;
  h1: string;
  h2: string;
  h3: string;
  text: string;
  button: {
    background: string;
    label: string;
  };
};
