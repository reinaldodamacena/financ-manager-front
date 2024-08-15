import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)(({ theme, variant }) => {
  const variantStyles = {
    primary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    secondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },
    },
    tertiary: {
      backgroundColor: theme.palette.grey[500],
      color: theme.palette.text.primary,
      '&:hover': {
        backgroundColor: theme.palette.grey[700],
      },
    },
  };

  return {
    ...variantStyles[variant],
    borderRadius: '1.5vw', // Arredondamento responsivo
    padding: '1vw 2vw', // Padding responsivo utilizando vw
    fontSize: '2vh', // Tamanho de fonte responsivo utilizando vh
    fontWeight: 600,
    textTransform: 'uppercase',
    boxShadow: '0px 0.3vh 0.6vh rgba(0, 0, 0, 0.1)', // Sombra responsiva utilizando vh
    '@media (max-width: 600px)': {
      padding: '1.5vw 3vw', // Ajuste de padding para telas menores
      fontSize: '1.8vh', // Ajuste de tamanho de fonte para telas menores
    },
    '@media (max-width: 400px)': {
      padding: '2vw 4vw', // Mais ajustes para dispositivos móveis
      fontSize: '1.6vh',
    },
  };
});

export default StyledButton;
