import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#BF4011',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#BF522A',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D9805F',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F2C6B6',
      contrastText: '#000000',
    },
    background: {
      default: '#F2F2F2',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F1F1F',
      secondary: '#4F4F4F',
      disabled: '#9E9E9E',
    },
    divider: '#E0E0E0',
  },
  typography: {
    fontFamily: 'Urbanist, Roboto, sans-serif',
    h1: {
      fontFamily: 'Urbanist',
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      color: '#1F1F1F',
    },
    h2: {
      fontFamily: 'Urbanist',
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.3,
      color: '#1F1F1F',
    },
    body1: {
      fontFamily: 'Urbanist',
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#4F4F4F',
    },
    button: {
      fontFamily: 'Urbanist',
      fontWeight: 600,
      fontSize: '1rem',
      textTransform: 'none',
      color: '#FFFFFF',
    },
    caption: {
      fontFamily: 'Urbanist',
      fontSize: '0.875rem',
      color: '#9E9E9E',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1)',
    '0px 3px 6px rgba(0, 0, 0, 0.1), 0px 3px 6px rgba(0, 0, 0, 0.15)',
    '0px 10px 20px rgba(0, 0, 0, 0.15), 0px 6px 6px rgba(0, 0, 0, 0.2)',
    '0px 14px 28px rgba(0, 0, 0, 0.15), 0px 10px 10px rgba(0, 0, 0, 0.2)',
  ],
  spacing: 8,
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

theme.components = {
  MuiButton: {
    styleOverrides: {
      root: {
        padding: theme.spacing(2, 3),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        '&:hover': {
          boxShadow: theme.shadows[3],
        },
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(1.5, 2.5),
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        marginBottom: theme.spacing(2),
        boxShadow: theme.shadows[1],
        [theme.breakpoints.down('sm')]: {
          marginBottom: theme.spacing(1),
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        padding: theme.spacing(3),
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(2),
        },
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: theme.palette.background.default,
        fontFamily: theme.typography.fontFamily,
        fontSize: '16px',
        [theme.breakpoints.down('sm')]: {
          fontSize: '14px',
        },
      },
    },
  },
};

export default theme;
