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
    fontFamily: theme.typography.fontFamily,
    borderRadius: theme.shape.borderRadius, // Usa o borderRadius global do tema
    padding: theme.spacing(1, 2), // Padding usando o sistema de espaçamento do tema
    fontSize: theme.typography.button.fontSize, // Usa o fontSize do botão definido no tema
    fontWeight: theme.typography.button.fontWeight, // Usa o fontWeight do botão definido no tema
    textTransform: 'uppercase',
    boxShadow: theme.shadows[2], // Usa a sombra definida no tema
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
      duration: theme.transitions.duration.short,
    }),
  };
});

export default StyledButton;
