import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {
  Logo,
  UserIcon,
  Input,
  Button,
  SmallTransparentBoxWrapper,
  TransparentBoxWrapper} from '../../atoms/Index';
import { Typography } from '@mui/material';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Utilize useNavigate para navegação

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  const handleSignUp = () => {
    navigate('/cadastro'); // Redireciona para a página de cadastro
  };

  return (

    <TransparentBoxWrapper alignContent="flex-end" top='6vh' bottom='6vh' height='center' >
      <Logo style={{ marginTop: '20vh' }} />

      <SmallTransparentBoxWrapper height='center' >
        <UserIcon />
        <Typography variant="h6" align="center" style={{ marginTop: '4vh', color: '#6E7781' }}>
          ENTRAR
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5vh', marginTop: '0vh' }}>
          <Input
            label="Usuário"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={PersonOutlineIcon}
          />
          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={LockOutlinedIcon}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1vh' , }}>
            <Typography variant="body2" color="textSecondary">
              <a href="#" style={{ color: '#6E7781', textDecoration: 'none' }}>Recuperar senha</a>
            </Typography>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0vh' }}>
          <Button type="submit" variant="contained" style={{ width: '15vw', padding: '1vh 0' }}>
                <Typography variant="button">
                 Login
                </Typography>
          </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0vh' }}>
            <Typography variant="body2" color="textSecondary">
              <button onClick={handleSignUp} style={{ color: '#F17A65', cursor: 'pointer', border: 'none', background: 'none' }}>Realizar cadastro</button>
            </Typography>
          </div>
        </form>
      </SmallTransparentBoxWrapper>
    </TransparentBoxWrapper>
  );
};

export default LoginForm;
