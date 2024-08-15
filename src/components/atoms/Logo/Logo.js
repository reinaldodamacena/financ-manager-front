import React from 'react';
import { styled } from '@mui/material/styles';
import logo from 'assets/images/Logo.png';

const LogoWrapper = styled('div')(({ top, left, right, bottom, width, height }) => ({
  position: 'absolute',
  top: top || '-6vw', 
  left: left || '11vh', 
  right: right || '11vh', 
  bottom: bottom || '20vw', 
  backgroundImage: `url(${logo})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundBlendMode: 'darken',
  backgroundPosition: 'center',
  width: width || 'auto', // Define a largura, se fornecida
  height: height || 'auto', // Define a altura, se fornecida
  '@media (max-width: 768px)': {
    top: '10px', 
    bottom: 'unset',
    left: '50%',
    transform: 'translateX(-50%)',
    width: width ? `calc(${width} * 0.8)` : 'auto', // Ajusta a largura para telas menores
    height: height ? `calc(${height} * 0.8)` : 'auto', // Ajusta a altura para telas menores
  },
}));

const Logo = ({ top, left, right, bottom, width, height }) => {
  return <LogoWrapper top={top} left={left} right={right} bottom={bottom} width={width} height={height} />;
};

export default Logo;
