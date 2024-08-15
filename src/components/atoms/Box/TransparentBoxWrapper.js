// src/components/atoms/TransparentBox.js
import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const TransparentBoxWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '532px',
  height: '836px',
  left: '694px',
  top: '122px',
  background: 'rgba(255, 255, 255, 0.75)', // Transparência
  boxShadow: '8px -11px 28px rgba(0, 0, 0, 0.25)',
  borderRadius: '9px',
  // Você pode utilizar as cores do tema aqui, caso necessário
  color: theme.palette.text.primary, // Exemplo: Usando a cor de texto primária do tema
}));

const TransparentBox = ({ children }) => {
  return <TransparentBoxWrapper>{children}</TransparentBoxWrapper>;
};

TransparentBox.propTypes = {
  children: PropTypes.node, // Permite que a TransparentBox contenha outros elementos
};

export default TransparentBox;
