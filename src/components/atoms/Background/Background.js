import React from 'react';
import { styled } from '@mui/material/styles';

const BackgroundWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '100%', // Largura ajustada ao tamanho da viewport
  height: '100%', // Altura ajustada ao tamanho da viewport
  top: 0,
  left: 0,
  backgroundColor: theme.palette.background.default, // Usa a cor de fundo do tema
  display: 'flex', // Adiciona flexbox para controle de layout dos elementos filhos
  justifyContent: 'center', // Centraliza conteúdo horizontalmente
  alignItems: 'center', // Centraliza conteúdo verticalmente
  overflow: 'hidden', // Esconde qualquer conteúdo que ultrapasse os limites
  '@media (max-width: 600px)': { // Ajustes para telas menores
    backgroundSize: 'cover', // Garante que a imagem de fundo cubra toda a tela
  },
  '@media (min-width: 601px)': { // Ajustes para telas maiores
    backgroundSize: 'contain', // Garante que a imagem de fundo seja contida dentro da tela
  },
}));

const Background = ({ children }) => {
  return <BackgroundWrapper>{children}</BackgroundWrapper>;
};

export default Background;
