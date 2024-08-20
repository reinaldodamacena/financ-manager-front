import React from 'react';
import { useTheme } from '@mui/material/styles';
import { ConfigurableBox } from '../../atoms/Index';
import { Typography } from '@mui/material';

const NavBar = () => {
  const theme = useTheme(); // Obtém o tema atual

  return (
    <ConfigurableBox
      borderRadius= "0"
      sx={{
        position: 'fixed',
        top: 0,
        padding: {
          xs: theme.spacing(1, 2), // Usando theme.spacing para ajuste de padding
          sm: theme.spacing(1.4, 1.4),
        },
        height: {
          xs: '8vh',
          sm: '6vh',
        },
        backgroundColor: theme.palette.background.paper, // Cor de fundo usando o tema
        zIndex: theme.zIndex.appBar, // Garantindo que a NavBar fique acima dos outros elementos
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" color="textPrimary">
        Meu Aplicativo
      </Typography>
    </ConfigurableBox>
  );
};

export default NavBar;
