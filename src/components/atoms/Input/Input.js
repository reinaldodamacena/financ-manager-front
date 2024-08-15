import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0.9vh 4.5vh rgba(0, 0, 0, 0.12), 0px 1.8vh 1.8vh rgba(0, 0, 0, 0.14), 0px 2.7vh 0.9vh -1.8vh rgba(0, 0, 0, 0.2)',
    borderRadius: '2vh',
    padding: '1vh 0.7vw',
    fontFamily: theme.typography.fontFamily,
    fontSize: '2vh',
    color: 'rgba(110, 119, 129, 0.7)',
    width: 'calc(100% - 1vw)', // Ajusta a largura para garantir alinhamento
    maxWidth: '100%', // Limita o tamanho máximo para ocupar o espaço do container
    height: '6.5vh', // Altura responsiva do campo
    margin: '0 auto', // Centraliza o campo
    [theme.breakpoints.down('sm')]: {
      fontSize: '2vh',
      padding: '0.8vh 1.5vw',
      width: 'calc(100% - 2vw)', // Ajusta a largura para telas menores
      height: '5vh', // Ajuste de altura para telas menores
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputAdornment-root': {
    marginRight: '0.5vw', // Garante que o ícone não encoste no texto
  }
}));

const Input = ({ label, icon: Icon, ...props }) => {
  return (
    <StyledTextField
      label={label}
      variant="outlined"
      InputProps={{
        startAdornment: Icon ? (
          <InputAdornment position="start">
            <Icon style={{ fontSize: '3vh' }} /> {/* Ícone responsivo */}
          </InputAdornment>
        ) : null,
      }}
      {...props}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType, // Tipo do ícone, se houver
};

export default Input;
