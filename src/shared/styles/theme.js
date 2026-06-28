import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  primary: {
    main: '#9A98F0'
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
  palette: {
    white: '#FFFFFF',
    black: '#000000',
    logo: '#9A98F0',
    grey: '#F7F7F7',
    danger: '#CC0000',
    lightGrey: '#F5F5F5',
    borderGrey: '#C4C4C4',
    bg: '#000000',
    bgGrey: '#D9D9D9',
    editBg: '#FFF4CD',
    editColor: '#DD9200',
    removeBg: '#FFD5D8',
    removeColor: '#CC0000',
  },
  fontSize: {
    xxl: '36px',
    xl: '30px',
    lg: '24px',
    md: '20px',
    sm: '18px',
    xs: '16px',
    xxs: '12px',
    vs: '10px',
  },
  fontWeight: {
    xxl: 800,
    xl: 700,
    lg: 500
  }
});
