import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputMask from 'react-input-mask';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0, 2),
    fontFamily: theme.typography.fontFamily,
    fontSize: '3.5vh',
    color: theme.palette.text.primary,
    width: '100%',
    transition: theme.transitions.create(['box-shadow', 'transform'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
    '&:hover': {
      boxShadow: theme.shadows[2],
      transform: 'scale(1.01)',
    },
    '&.Mui-focused': {
      boxShadow: theme.shadows[3],
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.6vh',
      padding: theme.spacing(0, 1.5),
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.divider,
      borderRadius: theme.shape.borderRadius,
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.dark,
    },
  },
  '& .MuiInputAdornment-root': {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    fontSize: '2.5vh',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2vh',
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: theme.typography.fontFamily,
    top: 'auto', // Posição centralizada inicial
    left: theme.spacing(1.5), // Distância da borda esquerda
    transform: 'translate(0, -115%) scale(1.25)', // Mantém o label centralizado verticalmente
    transformOrigin: 'top left',
    transition: theme.transitions.create(['color', 'transform'], {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }),
    fontSize: '2vh',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2vh',
      left: theme.spacing(1.5),
    },
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '&.MuiInputLabel-shrink': {
      top: theme.spacing(1.5), // Posição ao encolher (label sobe)
      fontSize: '2vh',
      color: theme.palette.primary.main,
    },
  },
}));

const Input = ({ label, mask, icon: IconComponent, ...props }) => {
  return (
    <InputMask mask={mask} {...props}>
      {() => (
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
        />
      )}
    </InputMask>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  mask: PropTypes.string, // Adicionado suporte para máscara
  icon: PropTypes.elementType, // Agora é um componente que será renderizado
};

export default Input;
