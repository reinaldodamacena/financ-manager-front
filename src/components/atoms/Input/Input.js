import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme, borderRadius, borderWidth, borderColor, focusBorderColor, hoverBorderColor }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1], // Usando a sombra do tema
    borderRadius: borderRadius || theme.shape.borderRadius,
    padding: '0vh 1vw',
    fontFamily: theme.typography.fontFamily,
    fontSize: '3vh',
    color: theme.palette.text.primary,
    width: '100%',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
    '&:hover': {
      boxShadow: theme.shadows[2], // Usando a sombra do tema
      transform: 'scale(1.01)',
    },
    '&.Mui-focused': {
      boxShadow: theme.shadows[3], // Usando a sombra do tema
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.6vh',
      padding: '0vh 0.8vw',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: borderColor || theme.palette.divider,
      borderRadius: borderRadius || theme.shape.borderRadius,
      borderWidth: borderWidth || '1px',
    },
    '&:hover fieldset': {
      borderColor: hoverBorderColor || theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: focusBorderColor || theme.palette.primary.dark,
    },
  },
  '& .MuiInputAdornment-root': {
    marginRight: '0.5vw',
    color: theme.palette.primary.main,
    transition: 'color 0.3s ease',
    fontSize: '2.5vh',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2vh',
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: theme.typography.fontFamily,
    top: '50%', // Posição centralizada inicial
    left: '0.7vw', // Distância da borda esquerda
    transform: 'translate(0, -100%) scale(1.25)', // Mantém o label centralizado verticalmente
    transformOrigin: 'top left',
    transition: 'color 0.3s ease, transform 0.2s ease-out',
    fontSize: '2vh',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2vh',
      left: '1.5vw',
    },
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '&.MuiInputLabel-shrink': {
      top: '1.4vh', // Posição ao encolher (label sobe)
      fontSize: '2vh',
      color: theme.palette.primary.main,
    },
  },
}));

const Input = ({ label, icon: IconComponent, borderRadius, borderWidth, borderColor, focusBorderColor, hoverBorderColor, ...props }) => {
  return (
    <StyledTextField
      label={label}
      variant="outlined"
      InputProps={{
        startAdornment: IconComponent ? (
          <InputAdornment position="start" aria-label={label}>
            <IconComponent />
          </InputAdornment>
        ) : null,
      }}
      aria-label={label}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      borderColor={borderColor}
      focusBorderColor={focusBorderColor}
      hoverBorderColor={hoverBorderColor}
      {...props}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType, // Agora é um componente que será renderizado
  borderRadius: PropTypes.string,
  borderWidth: PropTypes.string,
  borderColor: PropTypes.string,
  focusBorderColor: PropTypes.string,
  hoverBorderColor: PropTypes.string,
};

export default Input;
