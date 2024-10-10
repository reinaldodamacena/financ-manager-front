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
    padding: theme.spacing(0, 0.5), // Ajuste de padding para mais compactação
    fontFamily: theme.typography.fontFamily,
    fontSize: '1rem', // Diminui o tamanho da fonte
    color: theme.palette.text.primary,
    width: '100%',
    transition: theme.transitions.create(['box-shadow', 'transform'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
    '&:hover': {
      boxShadow: theme.shadows[2],
      transform: 'scale(1.0)',
    },
    '&.Mui-focused': {
      boxShadow: theme.shadows[3],
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem', // Fonte ainda menor para telas pequenas
      padding: theme.spacing(0, 0.75),
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
    marginRight: theme.spacing(0.5), // Menor espaço para adornos
    color: theme.palette.primary.main,
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    fontSize: '1.25rem', // Diminui o tamanho do ícone
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem', // Tamanho do ícone menor para telas pequenas
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: theme.typography.fontFamily,
    top: 'auto', // Posição centralizada inicial
    left: theme.spacing(1), // Ajuste de espaçamento
    transform: 'translate(0, -115%) scale(1)', // Escala reduzida
    transition: theme.transitions.create(['color', 'transform'], {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }),
    fontSize: '0.875rem', // Tamanho da label ajustado
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem', // Reduz ainda mais em telas pequenas
    },
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '&.MuiInputLabel-shrink': {
      top: theme.spacing(1.5),
      fontSize: '0.875rem',
      color: theme.palette.primary.main,
    },
  },
}));

const Input = ({ label, mask, icon: IconComponent, value, onChange, type }) => {
  const renderTextField = (inputProps) => (
    <StyledTextField
      {...inputProps}
      label={label}
      variant="outlined"
      type={type}
      InputProps={{
        startAdornment: IconComponent ? (
          <InputAdornment position="start" aria-label={label}>
            <IconComponent />
          </InputAdornment>
        ) : null,
      }}
      aria-label={label}
    />
  );

  // Se uma máscara foi fornecida, usar InputMask
  if (mask) {
    return (
      <InputMask mask={mask} value={value} onChange={onChange}>
        {(inputProps) => renderTextField(inputProps)}
      </InputMask>
    );
  }

  // Caso contrário, renderizar o TextField diretamente
  return renderTextField({ value, onChange });
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  mask: PropTypes.string,
  icon: PropTypes.elementType,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Input;
