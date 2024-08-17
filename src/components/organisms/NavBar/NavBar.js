import React from 'react';
import { ConfigurableBoxWrapper } from '../../atoms/Index';
import { Typography } from '@mui/material';

const NavBar = () => (
  <ConfigurableBoxWrapper top='1' borderRadius='10' padding='1.4vh 1.4vw' height='8vh' >
    <Typography variant="h6" >Meu Aplicativo</Typography>
  </ConfigurableBoxWrapper>
);

export default NavBar;
