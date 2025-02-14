import React from 'react';
import { styled } from '@mui/material/styles';
import logo from 'assets/images/Logo.png';

const LogoWrapper = styled('div')(({ theme, top, left, right, bottom, width, height }) => ({
  position: 'absolute',
  top: top || theme.spacing(-6), 
  left: left || theme.spacing(11), 
  right: right || theme.spacing(11), 
  bottom: bottom || theme.spacing(20), 
  backgroundImage: `url(${logo})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundBlendMode: 'darken',
  backgroundPosition: 'center',
  width: width || 'auto', // Define a largura, se fornecida
  height: height || 'auto', // Define a altura, se fornecida
  transition: theme.transitions.create(['top', 'left', 'width', 'height'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
}));

const Logo = ({ top, left, right, bottom, width, height }) => {
  return <LogoWrapper top={top} left={left} right={right} bottom={bottom} width={width} height={height} />;
};

export default Logo;
