import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const SmallTransparentBoxWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  background: 'rgba(242, 198, 182, 0.33)', // Transparência com cor
  borderRadius: '2vw',
  height: '50vh', // O box ocupará 50% da altura da viewport
  maxWidth: '500px', // Largura máxima em px
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '5vh 2vw', // Padding ajustado para telas maiores
  '@media (max-width: 768px)': {
    padding: '3vw', // Reduz o padding em telas menores
    margin: '5vh auto',
  },
  '@media (max-width: 480px)': {
    padding: '4vw', // Padding reduzido para telas muito pequenas
    margin: '2vh auto',
  },
}));

const SmallTransparentBox = ({ children }) => {
  return <SmallTransparentBoxWrapper>{children}</SmallTransparentBoxWrapper>;
};

SmallTransparentBox.propTypes = {
  children: PropTypes.node,
};

export default SmallTransparentBox;
