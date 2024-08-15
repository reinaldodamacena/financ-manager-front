// src/components/molecules/PageBackground.js
import React from 'react';
import Background from '../../atoms/Background/Index';
import Ellipse from '../../atoms/Ellipse/Index';

const PageBackground = ({ children }) => {
  return (
    <Background>
      <Ellipse width="490px" height="490px" left="342px" top="534px" bgColor="#BF522A" />
      <Ellipse width="571px" height="571px" left="943px" top="-101px" bgColor="#F2C6B6" />
      <Ellipse width="410px" height="410px" left="1622px" top="621px" bgColor="#D9805F" />
      <Ellipse
        width="194.13px"
        height="194.13px"
        left="-99px"
        top="198.11px"
        bgColor="rgba(217, 128, 95, 0.75)"
        rotate="-11.62"
      />
      {children}
    </Background>
  );
};

export default PageBackground;
