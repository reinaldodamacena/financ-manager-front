// src/components/atoms/Logo.js
import React from 'react';
import { styled } from '@mui/material/styles';


const LogoWrapper = styled('div')({
  position: 'absolute',
  left: '24.25%',
  right: '19.55%',
  top: '-2.75%',
  bottom: '72.13%',
  backgroundImage: `../../assets/images/Logo.png`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundBlendMode: 'darken',
  backgroundPosition: 'center',
});

const Logo = () => {
  return <LogoWrapper />;
};

export default Logo;
