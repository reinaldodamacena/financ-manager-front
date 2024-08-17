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
    borderRadius: 12, // Cantos ligeiramente arredondados para um visual moderno
  },
  shadows: [
    'none',
    '0px 0.2vh 0.6vh rgba(0, 0, 0, 0.05), 0px 0.4vh 0.8vh rgba(0, 0, 0, 0.1)', // Sombra leve para nível 1
    '0px 0.2vh 1vh rgba(0, 0, 0, 0.1), 0px 0.4vh 1.2vh rgba(0, 0, 0, 0.15)',   // Sombra leve para nível 2
    '0px 0.2vh 1.2vh rgba(0, 0, 0, 0.15), 0px 0.4vh 1.4vh rgba(0, 0, 0, 0.2)', // Sombra leve para nível 3
    '0px 0.3vh 1.5vh rgba(0, 0, 0, 0.15), 0px 0.6vh 1.8vh rgba(0, 0, 0, 0.2)',  // Sombra para nível 4
    // Adicione mais níveis conforme necessário
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '0.8rem 1.5rem',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Usando sombras padrão do nível 2
          '&:hover': {
            boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.15)', // Usando sombras padrão do nível 3
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '1vh',
          boxShadow: theme => theme.shadows[1], // Usando sombras padrão do nível 1
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '1.5rem',
          boxShadow: theme => theme.shadows[2], // Usando sombras padrão do nível 2
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
        },
      },
    },
  },
});

export default theme;
