export type FontStyle = {
  fontSize: string;
  fontWeight: fontWeights;
  lineHeight?: number
};

export type FontStyles = {
  h1: FontStyle;
  h2: FontStyle;
  h3: FontStyle;
  body: FontStyle;
  label: FontStyle;
  button: FontStyle;
};

export enum fontWeights {
  light = 300,
  regular = 400,
  medium = 500,
  semiBold = 600,
  bold = 700
}

export const fonts: FontStyles = {
  h1: {
    fontSize: '3rem',
    fontWeight: fontWeights.bold
  },
  h2: {
    fontSize: '2rem',
    fontWeight: fontWeights.bold
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: fontWeights.medium
  },
  body: {
    fontSize: '1rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.5
  },
  button: {
    fontSize: '1.2rem',
    fontWeight: fontWeights.medium
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: fontWeights.regular
  }
};
