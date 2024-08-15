import React from 'react';
import Background from '../../atoms/Background/Index';
import Ellipse from '../../atoms/Ellipse/Index';

const PageBackground = ({ children }) => {
  return (
    <Background>
      <Ellipse 
        width="27vw" 
        height="27vw" 
        left="19vw" 
        top="55vh" 
        bgColor="#BF522A" 
      />
      <Ellipse 
        width="32vw" 
        height="32vw" 
        left="52vw" 
        top="-5vh" 
        bgColor="#F2C6B6" 
      />
      <Ellipse 
        width="23vw" 
        height="23vw" 
        left="90vw" 
        top="66vh" 
        bgColor="#D9805F" 
      />
      <Ellipse
        width="11vw"
        height="11vw"
        left="-5vw"
        top="21vh"
        bgColor="rgba(217, 128, 95, 0.75)"
        rotate="-11.62"
      />
      {children}
    </Background>
  );
};

export default PageBackground;
