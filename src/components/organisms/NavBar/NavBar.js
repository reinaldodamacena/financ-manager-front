import React from 'react';
import { Box, IconButton, InputBase, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Icon, Logo, UserIconNavBar } from '../../atoms/Index';
import { useAuthContext } from '../../../context/Auth/AuthServiceProvider';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate para navegação

const NavBar = ({ onToggleSidebar }) => {
  const theme = useTheme();
  const { user } = useAuthContext(); // Obtenha o usuário autenticado do contexto
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleLogoClick = () => {
    navigate('/home'); // Redireciona para a rota /home ao clicar no logo
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(1, 2),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        zIndex: theme.zIndex.appBar,
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
      }}
    >
      {/* Seção Esquerda */}
      <Box sx={{ display: 'flex', alignItems: 'center', [theme.breakpoints.down('sm')]: { width: '100%', justifyContent: 'space-between' } }}>
        <IconButton onClick={onToggleSidebar}>
          <Icon name="Menu" size="24px" />
        </IconButton>
        <Box sx={{ ml: 3, display: 'flex', alignItems: 'center' }}>
          <Box onClick={handleLogoClick} sx={{ cursor: 'pointer' }}>
            <Logo width="auto" right="85%" bottom="-70%" />
          </Box>
        </Box>
      </Box>

      {/* Seção Central (Campo de Pesquisa) */}
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: '600px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.grey[100],
          padding: theme.spacing(0.5, 1),
          borderRadius: theme.shape.borderRadius,
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
          [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginTop: theme.spacing(1),
          },
        }}
      >
        <Icon name="Search" size="20px" color={theme.palette.text.secondary} />
        <InputBase
          placeholder="Pesquisar"
          sx={{ marginLeft: theme.spacing(1), flex: 1 }}
        />
        <IconButton>
          <Icon name="Settings" size="24px" />
        </IconButton>
      </Box>

      {/* Seção Direita */}
      <Box sx={{ display: 'flex', alignItems: 'center', [theme.breakpoints.down('sm')]: { width: '100%', justifyContent: 'flex-end', marginTop: theme.spacing(1) } }}>
        <IconButton>
          <Icon name="HelpOutline" size="24px" />
        </IconButton>
        <IconButton>
          <Icon name="Apps" size="24px" />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <Typography variant="body1" sx={{ marginRight: theme.spacing(1), color: theme.palette.text.primary }}>
            {user?.username} {/* Exibe o nome do usuário */}
          </Typography>
          <IconButton>
            <UserIconNavBar width="40px" height="40px" /> {/* Uso do novo UserIconNavBar */}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
