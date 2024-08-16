import React, { useContext } from 'react';
import { TransparentBoxWrapper, Button, Icon,Input } from '../../atoms/Index';
import { Typography , Divider} from '@mui/material'; // Importando Divider
import { UserFormContext } from '../../../context/UserFormContext';

const UserRegistrationForm = () => {
  const { formData, handleChange, handleSubmit } = useContext(UserFormContext);

  return (
      <TransparentBoxWrapper top='6vh' bottom='6vh' height='center' left='50vw' width='45vw'>           
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1vw', marginTop: '1vh' }}>
            <Typography variant="h6" align="left" style={{ marginBottom: '1vh', color: '#6E7781' }}>
              CADASTRO DE USUÁRIO
            </Typography>
            
            <Input 
              label="Usuário" 
              name="username"
              value={formData.username} 
              onChange={handleChange} 
              icon={() => <Icon name="PersonOutline"  />} 
            />
            
            <Input 
              label="Senha" 
              type="password"
              name="password"
              value={formData.password} 
              onChange={handleChange} 
              icon={() => <Icon name="LockOutlined"/>} 
            />
            <Input 
              label="Repetir Senha" 
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword} 
              onChange={handleChange} 
              icon={() => <Icon name="LockOutlined" />} 
            />
            <Input 
              label="Email" 
              name="email"
              value={formData.email} 
              onChange={handleChange} 
              icon={() => <Icon name="Email" />} 
            />                
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" style={{ width: '15vw', padding: '1vh 0' }}>
                <Typography variant="button">
                  Cadastrar
                </Typography>
              </Button>
            </div>
          </form> 
          
      </TransparentBoxWrapper>
  );
};

export default UserRegistrationForm;
