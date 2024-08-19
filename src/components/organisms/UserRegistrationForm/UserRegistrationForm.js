import React, { useContext } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { TransparentBox, Button, Icon, Input } from '../../atoms/Index';
import { UserFormContext } from '../../../context/UserFormContext';

const UserRegistrationForm = () => {
  const { formData, handleChange, handleSubmit } = useContext(UserFormContext);

  return (
    <TransparentBox top="6vh" bottom="6vh" height="center" left="50vw" width="45vw">
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
        </Grid>
      </Box>
    </TransparentBox>
  );
};

export default UserRegistrationForm;
