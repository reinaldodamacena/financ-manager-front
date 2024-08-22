import React, { useContext, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { TransparentBox, Button, Icon, Input } from '../../atoms/Index';
import { useUserServiceContext } from '../../../context/User/userContext';

const UserRegistrationForm = () => {
  const { createData, loading, error } = useUserServiceContext(); // Acessando métodos do contexto de serviço de usuário
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repeatPassword: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      alert('As senhas não correspondem');
      return;
    }
    createData(formData); // Usa o método do contexto para criar o usuário
  };

  return (
    <TransparentBox left='0%' top="auto" bottom="auto" height="center" width="auto">
      <Typography variant="h6" align="left" sx={{ mb: 2, color: 'text.secondary' }}>
        CADASTRO DE USUÁRIO
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              label="Usuário"
              name="username"
              value={formData.username}
              onChange={handleChange}
              icon={() => <Icon name="PersonOutline" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Senha"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              icon={() => <Icon name="LockOutlined" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Repetir Senha"
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              icon={() => <Icon name="LockOutlined" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              icon={() => <Icon name="Email" />}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ width: '15vw', py: 1 }}>
              <Typography variant="button">Cadastrar</Typography>
            </Button>
          </Grid>
          {loading && <Typography variant="body2">Carregando...</Typography>}
          {error && <Typography variant="body2" color="error">{error}</Typography>}
        </Grid>
      </Box>
    </TransparentBox>
  );
};

export default UserRegistrationForm;
