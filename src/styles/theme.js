export const theme = {
  colors: {
    brightGray: '#e7eff6',
    white: '#fff',
    auroMetalSaurus: '#6f7c85',
    oxfordBlue: '#011f4b',
    red: '#ff0000',
    alana: '#ffb700',
    black: '#000000',
    oldSilver: '#868686',
    trueBlue: '#006ce4',
    lightBlueGray: 'rgb(0 108 228/ 20%)',
    lightRed: 'rgb(237 28 36/ 20%)',
    pantone: '#00249c',
    gainsboro: '#dddddd',
    graniteGray: '#666666',
    charlestonGreen: '#2b2b2b',
    eerieBlack: '#1A1A1A',
    lavender: '#FFF9E7',
    sonicSilver: '#767676',
    cultured: '#f5f5f5',
    raisinBlack: '#242424',
    outerSpace: '#474747',
  },
  sizes: ['425px', '768px', '1080px', '1440px', '1920px', '2560px'],
};

export const lightTheme = {
  mode: {
    appBg: theme.colors.cultured,
    textColor: theme.colors.black,
    headerBg: theme.colors.oxfordBlue,
    elementsBg: theme.colors.cultured,
    calendarHover: theme.colors.lavender,
    hotelCardBg: theme.colors.white,
    elementsBorder: theme.colors.gainsboro,
  },
  colors: theme.colors,
  sizes: theme.sizes,
};

export const darkTheme = {
  mode: {
    appBg: theme.colors.charlestonGreen,
    textColor: theme.colors.cultured,
    headerBg: theme.colors.charlestonGreen,
    elementsBg: theme.colors.eerieBlack,
    calendarHover: theme.colors.sonicSilver,
    hotelCardBg: theme.colors.raisinBlack,
    elementsBorder: theme.colors.outerSpace,
  },
  colors: theme.colors,
  sizes: theme.sizes,
};
