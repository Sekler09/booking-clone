export default {
  colors: {
    brightGray: '#e7eff6',
    white: '#fff',
    auroMetalSaurus: '#6f7c85',
    oxfordBlue: '#011f4b',
    red: '#ff0000',
    alana: '#f3d082',
    black: '#000000',
    oldSilver: '#868686',
    trueBlue: '#006ce4',
    lightBlueGray: 'rgb(0 108 228/ 6%)',
    pantone: '#00249c',
    gainsboro: '#dddddd',
    graniteGray: '#666666',
  },
};

const size = {
  tablet: '720px',
  laptop: '1080px',
  laptopL: '1440px',
  desktop: '1920px',
  desktopL: '2560px',
};

export const device = {
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktopL})`,
};
