import React, { useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TransparentBox, Button, Icon, Input } from '../../atoms/Index';
import { useUserServiceContext } from 'context/User/userContext';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; // Importar ícones corretamente
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const UserRegistrationForm = () => {
  const { createData, loading, error } = useUserServiceContext(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Form submission started");

    if (password !== repeatPassword) {
      alert('As senhas não correspondem');
      console.log("Password mismatch");
      return;
    }

    const userToCreate = {
      username,
      password,
      email,
      firstName,
      lastName,
      securityQuestion,
      securityAnswerHash: securityAnswer,
    };

    console.log("User to create:", userToCreate);

    try {
      await createData(userToCreate); // Chame a função de criação de usuário aqui
      console.log("User creation successful");
      navigate('/home'); // Navega para a página inicial após o sucesso do cadastro
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
    }
  };

  return (
    <TransparentBox
      position='absolute'
      right="auto"
      left="50%"
      top="5%"
      bottom="5%"
      height="auto"
      width="30%"
      padding="1.5%"
      maxWidth="600px"
    >
      <Typography variant="h8" align="center" sx={{ mb: 2, color: '#6E7781' }}>
        CADASTRO DE USUÁRIO
      </Typography>

      <Box component="form" overflow="auto" padding="1%" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Input
              label="Usuário"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={() => <PersonOutlineIcon />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={() => <EmailIcon />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Primeiro Nome"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              icon={() => <PersonOutlineIcon />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Último Nome"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              icon={() => <PersonOutlineIcon />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={() => <LockOutlinedIcon />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Repetir Senha"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              icon={() => <LockOutlinedIcon />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Pergunta de Segurança"
              type="text"
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
              icon={() => <HelpOutlineIcon />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Resposta de Segurança"
              type="text"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              icon={() => <HelpOutlineIcon />}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ width: '50%', py: 1 }}>
              <Typography variant="button">Cadastrar</Typography>
            </Button>
          </Grid>
          {loading && <Typography variant="body2" align="center" color="text.secondary">Carregando...</Typography>}
          {error && <Typography variant="body2" align="center" color="error">{error}</Typography>}
        </Grid>
      </Box>
    </TransparentBox>
  );
};

export default UserRegistrationForm;
