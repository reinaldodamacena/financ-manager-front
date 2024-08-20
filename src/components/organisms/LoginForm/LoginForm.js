import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import {
  Logo,
  UserIcon,
  Input,
  Button,
  SmallTransparentBox,
  TransparentBox,
  Icon,
} from '../../atoms/Index';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  const handleSignUp = () => {
    navigate('/cadastro');
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh', backgroundColor: 'background.default' }}
    >
      <TransparentBox
        right="auto"
        left="auto"
        alignContent="flex-end"
        top="auto"
        bottom="auto"
        height="95%"
        width="30%" // Tornando o box responsivo
        padding='1.5%'
        maxWidth="600px" // Largura máxima para garantir que não fique muito grande em telas grandes
      >
        <Logo bottom="60%" />

        <SmallTransparentBox width="90%" height="60%" justifyContent="center" right="auto"
        left="auto"  maxWidth="300px" padding='15%'>
          <UserIcon />
          <Typography variant="h6" align="center" sx={{ mt: 8, color: '#6E7781' }}>
            ENTRAR
          </Typography>
          <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 0  }}>
            <Grid container spacing={1}   justifyContent='center'>
              <Grid item xs={12}>
                <Input  
                  label="Usuário"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={() => <Icon name="PersonOutline" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Input  
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={() => <Icon name="LockOutlined" />}
                />
              </Grid>
              <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0 }}>
                <Typography variant="body2" color="textSecondary">
                  <a href="#" style={{ color: '#6E7781', textDecoration: 'none' }}>
                    Recuperar senha
                  </a>
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}>
                <Button type="submit" variant="contained" sx={{ width: '50%', py: 1 }}>
                  <Typography variant="button">Login</Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}>
                <Typography variant="body2" color="textSecondary">
                  <button
                    onClick={handleSignUp}
                    style={{
                      color: '#F17A65',
                      cursor: 'pointer',
                      border: 'none',
                      background: 'none',
                    }}
                  >
                    Realizar cadastro
                  </button>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </SmallTransparentBox>
      </TransparentBox>
    </Grid>
  );
};

export default LoginForm;
