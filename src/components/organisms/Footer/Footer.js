import React from 'react';
import { ConfigurableBox } from '../../atoms/Index';
import { Typography, Box } from '@mui/material';

const Footer = () => (
  <ConfigurableBox
    sx={{
      padding: 3,
      backgroundColor: 'background.default',
      boxShadow: 3, // Adiciona uma sombra leve para destacar o footer
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="body2" color="textSecondary" align="center">
        © 2024 Meu Aplicativo. Todos os direitos reservados.
      </Typography>
    </Box>
  </ConfigurableBox>
);

export default Footer;
