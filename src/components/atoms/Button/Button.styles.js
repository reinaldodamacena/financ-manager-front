// src/components/atoms/Button.js
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5.43609px 14.4962px',
  position: 'relative',
  backgroundColor: theme.palette.primary.main, // Usando a cor primária do tema
  boxShadow: '0px 0.906015px 4.53008px rgba(0, 0, 0, 0.12), 0px 1.81203px 1.81203px rgba(0, 0, 0, 0.14), 0px 2.71805px 0.906015px -1.81203px rgba(0, 0, 0, 0.2)',
  borderRadius: '13.5902px',
  width: '310.76px',
  height: '57.98px',
  color: '#FFFFFF', // Cor do texto definida manualmente
  fontFamily: theme.typography.fontFamily, // Usando a tipografia definida no tema
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '28.9925px',
  lineHeight: '22px',
  textTransform: 'uppercase',
  textAlign: 'center',
  textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark, // Simula um efeito de hover usando o tema
  },
}));

const Button = ({ children, onClick, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
