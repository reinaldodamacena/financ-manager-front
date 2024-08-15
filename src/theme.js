import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#BF4011',
    },
    secondary: {
      main: '#BF522A',
    },
    error: {
      main: '#D9805F',
    },
    warning: {
      main: '#F2C6B6',
    },
    background: {
      default: '#F2F2F2',
    },
  },
  typography: {
    fontFamily: 'Urbanist, Roboto, sans-serif',
  },
});

export default theme;
