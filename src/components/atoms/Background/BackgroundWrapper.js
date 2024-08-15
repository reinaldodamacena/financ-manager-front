// src/components/atoms/Background.js
import React from 'react';
import { styled } from '@mui/material/styles';

const BackgroundWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  backgroundColor: theme.palette.background.default, // Usa a cor de fundo do tema
}));

const Background = ({ children }) => {
  return <BackgroundWrapper>{children}</BackgroundWrapper>;
};

export default Background;
