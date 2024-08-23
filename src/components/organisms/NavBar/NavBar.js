import React from 'react';
import { useTheme } from '@mui/material/styles';
import { ConfigurableBox } from '../../atoms/Index';
import {NavBarSection } from '../../molecules/Index';
import { Box, Typography, IconButton } from '@mui/material';
import { Icon } from '../../atoms/Index';
import { useAuthContext } from '../../../context/Auth/AuthServiceProvider'; // Importa o contexto de autenticação
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const theme = useTheme();
  const { user, logout } = useAuthContext(); // Obtém o usuário autenticado e a função de logout
  const navigate = useNavigate();

  const itemsLeft = [
    { iconName: 'home', onClick: () => navigate('/home') },
    { iconName: 'info', onClick: () => navigate('/about') },
  ];

  const itemsRight = [
    { iconName: 'notifications', onClick: () => console.log('Notifications clicked') },
    { iconName: 'settings', onClick: () => navigate('/settings') },
  ];

  return (
    <ConfigurableBox
      borderRadius="0"
      sx={{
        position: 'fixed',
        top: 0,
        padding: {
          xs: theme.spacing(1, 2),
          sm: theme.spacing(1.4, 1.4),
        },
        height: {
          xs: '8vh',
          sm: '6vh',
        },
        backgroundColor: theme.palette.background.paper,
        zIndex: theme.zIndex.appBar,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <NavBarSection items={itemsLeft} />
      {user ? (
        <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 2 }}>
          <Icon name="user" sx={{ marginRight: 1 }} />
          <Typography variant="body1" color="textPrimary">
            {user.username}
          </Typography>
          <IconButton onClick={logout} sx={{ marginLeft: 2 }}>
            <Icon name="logout" />
          </IconButton>
        </Box>
      ) : (
        <IconButton onClick={() => navigate('/login')} sx={{ marginLeft: 2 }}>
          <Icon name="login" />
        </IconButton>
      )}
      <NavBarSection items={itemsRight} />
    </ConfigurableBox>
  );
};

export default NavBar;
