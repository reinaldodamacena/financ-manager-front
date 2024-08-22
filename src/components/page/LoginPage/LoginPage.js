import React from 'react';
import { PageBackground } from 'components/molecules/Index';
import { LoginForm } from '../../organisms/Index';
import { useAuthContext } from '../../../context/authContext'; // Certifique-se de que o caminho esteja correto
import { Typography } from '@mui/material';

const LoginPage = () => {
  const { login, loading, error } = useAuthContext();

  const handleLogin = async (credentials) => {
    await login(credentials);
  };

  return (
    <PageBackground>
      <LoginForm onSubmit={handleLogin} />
      {loading && <Typography variant="body2">Carregando...</Typography>}
      {error && <Typography variant="body2" color="error">{error}</Typography>}
    </PageBackground>
  );
};

export default LoginPage;
