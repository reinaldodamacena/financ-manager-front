import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const TransparentBoxWrapper = styled('div')(({ theme, justifyContent, top, left, right, bottom, height, width }) => ({
  position: 'absolute',
  top: top || '0', // Valor padrão para top
  left: left || '80vh', // Valor padrão para left
  right: right || '10vh', // Valor padrão para right
  bottom: bottom || 'auto', // Valor padrão para bottom
  width: width || '30vw', // O box ocupa 30% da largura da viewport
  height: height || '100vh', // O box ocupa 100% da altura da viewport
  padding: '2vw',
  background: 'rgba(255, 255, 255, 0.75)', // Transparência
  boxShadow: '8px -11px 28px rgba(0, 0, 0, 0.25)',
  borderRadius: '9px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: justifyContent || 'flex-start', // Alinha o conteúdo conforme a prop passada
  '@media (max-width: 768px)': {
    padding: '3vw', // Reduz o padding em telas menores
    margin: '5vh auto',
  },
  '@media (max-width: 480px)': {
    padding: '4vw', // Padding reduzido para telas muito pequenas
    margin: '2vh auto',
  },
}));

const TransparentBox = ({ children, alignContent, top, left, right, bottom, height, width }) => {
  return (
    <TransparentBoxWrapper 
      justifyContent={alignContent}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      height={height}
      width={width}
    >
      {children}
    </TransparentBoxWrapper>
  );
};

TransparentBoxWrapper.propTypes = {
  children: PropTypes.node,
  alignContent: PropTypes.oneOf(['flex-start', 'flex-end']), // Prop para controle do alinhamento
  top: PropTypes.string, // Prop para a posição top
  left: PropTypes.string, // Prop para a posição left
  right: PropTypes.string, // Prop para a posição right
  bottom: PropTypes.string, // Prop para a posição bottom
  height: PropTypes.string, // Prop para a altura do box
  width: PropTypes.string, // Prop para a largura do box
};



export default TransparentBox;
