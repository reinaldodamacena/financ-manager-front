import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PropTypes from 'prop-types';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0.9px 4.5px rgba(0, 0, 0, 0.12), 0px 1.8px 1.8px rgba(0, 0, 0, 0.14), 0px 2.7px 0.9px -1.8px rgba(0, 0, 0, 0.2)',
    borderRadius: '2vh', // Usando vh para border-radius
    padding: '1vh 2vw', // Usando vh e vw para padding
    fontFamily: theme.typography.fontFamily,
    fontSize: '2vh', // Ajustando a fonte para usar vh
    color: 'rgba(110, 119, 129, 0.7)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5vh', // Ajusta a fonte para telas pequenas
      padding: '1vh 1.5vw', // Ajusta o padding para telas pequenas
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
  },
}));

const StyledTextField = ({ label, type, icon: Icon, ...props }) => {
  return (
    <CustomTextField
      variant="outlined"
      label={label}
      type={type}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {Icon && <Icon />}
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

StyledTextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  icon: PropTypes.elementType, // Permite passar qualquer ícone como componente
};

StyledTextField.defaultProps = {
  type: 'text',
  icon: null, // Ícone é opcional
};

export default StyledTextField;
