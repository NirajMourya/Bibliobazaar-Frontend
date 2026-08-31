import { createTheme } from '@mui/material/styles';

// Colors shared between light and dark variants
const commonPalette = {
  logo: '#9A98F0',
  danger: '#CC0000',
  editBg: '#FFF4CD',
  editColor: '#DD9200',
  removeBg: '#FFD5D8',
  removeColor: '#CC0000',
};

const lightPalette = {
  mode: 'light',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#F7F7F7',
  lightGrey: '#F5F5F5',
  borderGrey: '#C4C4C4',
  bg: '#FFFFFF',
  bgGrey: '#D9D9D9',
  background: { default: '#FFFFFF', paper: '#FFFFFF' },
  text: { primary: '#000000', secondary: '#4B4B4B' },
  divider: '#C4C4C4',
};

const darkPalette = {
  mode: 'dark',
  white: '#FFFFFF',
  black: '#FFFFFF',
  grey: '#2A2A2A',
  lightGrey: '#2A2A2A',
  borderGrey: '#444444',
  bg: '#121212',
  bgGrey: '#333333',
  background: { default: '#121212', paper: '#1E1E1E' },
  text: { primary: '#FFFFFF', secondary: '#B0B0B0' },
  divider: '#333333',
};

export const getTheme = (mode = 'light') => createTheme({
  primary: {
    main: '#9A98F0'
  },
  typography: {
    fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    button: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  palette: {
    // Ensures MUI's built-in "primary" color (checkboxes, radios, focus rings,
    // progress bars, etc.) matches the brand color instead of MUI's default blue
    primary: { main: '#9A98F0', contrastText: '#FFFFFF' },
    secondary: { main: '#9A98F0', contrastText: '#FFFFFF' },
    ...commonPalette,
    ...(mode === 'dark' ? darkPalette : lightPalette),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
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

export const theme = getTheme('light');
