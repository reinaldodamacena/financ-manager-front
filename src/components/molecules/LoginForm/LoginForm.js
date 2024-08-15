import React, { useState } from 'react';
import Button from '../../atoms/Button/Index';
import StyledTextField from '../../atoms/Text/Index'; 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SmallTransparentBoxWrapper, TransparentBoxWrapper } from '../../atoms/Box/Index';
import UserIcon from '../../atoms/Icon/Index';
import Logo from '../../atoms/Logo/Index';
import { Typography } from '@mui/material';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      
      <TransparentBoxWrapper>
      <Logo />
        <UserIcon />
        <Typography variant="h5" align="center" style={{ marginTop: '120px', marginBottom: '30px', color: '#6E7781' }}>
          ENTRAR
        </Typography>
        <SmallTransparentBoxWrapper style={{ padding: '20px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <StyledTextField 
              label="Usuário" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              icon={LockOutlinedIcon} 
            />
            <StyledTextField 
              label="Senha" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              icon={LockOutlinedIcon} 
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
              <a href="#" style={{ color: '#6E7781', textDecoration: 'none' }}>Recuperar senha</a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" style={{ width: '100%' }}>Login</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <a href="#" style={{ color: '#F17A65', textDecoration: 'none' }}>Realizar cadastro</a>
            </div>
          </form>
        </SmallTransparentBoxWrapper>
      </TransparentBoxWrapper>
    </div>
  );
};

export default LoginForm;
