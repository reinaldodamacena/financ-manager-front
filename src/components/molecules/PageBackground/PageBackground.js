import React from 'react';
import Background from '../../atoms/Background/Index';
import Ellipse from '../../atoms/Ellipse/Index';
import { useTheme } from '@mui/material/styles';

const PageBackground = ({ children }) => {
  const theme = useTheme();

  return (
    <Background>
      <Ellipse 
        width="27vw" 
        height="27vw" 
        left="19vw" 
        top="55vh" 
        bgColor={theme.palette.secondary.main} // Usando a cor do tema
      />
      <Ellipse 
        width="32vw" 
        height="32vw" 
        left="52vw" 
        top="-5vh" 
        bgColor={theme.palette.secondary.light} // Usando uma cor mais clara do tema
      />
      <Ellipse 
        width="23vw" 
        height="23vw" 
        left="90vw" 
        top="66vh" 
        bgColor={theme.palette.error.main} // Usando a cor de erro do tema
      />
      <Ellipse
        width="11vw"
        height="11vw"
        left="-5vw"
        top="21vh"
        bgColor="rgba(217, 128, 95, 0.75)" // Cor personalizada
        rotate="-11.62"
      />
      {children}
    </Background>
  );
};

export default PageBackground;
