import React from 'react';
import { ConfigurableBoxWrapper } from '../../atoms/Index';
import { Typography } from '@mui/material';

const Footer = () => (
  <ConfigurableBoxWrapper padding='3vh'>
    <Typography variant="body2" >© 2024 Meu Aplicativo. Todos os direitos reservados.</Typography>
  </ConfigurableBoxWrapper>
);

export default Footer;
