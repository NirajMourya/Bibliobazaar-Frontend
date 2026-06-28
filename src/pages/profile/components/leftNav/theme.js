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
    danger:'#CC0000',
    lightGrey: '#F5F5F5',
    borderGrey: '#C4C4C4'
  },
  fontSize: {
    xxl: '36px',
    xl: '30px',
    lg: '24px',
    md: '20px',
    sm: '18px',
    xs: '16px'
  },
  fontWeight: {
    xxl: 800,
    xl: 700,
    lg: 500
  }
});
