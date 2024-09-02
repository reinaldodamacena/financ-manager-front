import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Input, Button } from '../../atoms/Index';

const CashRegisterForm = ({ onSubmit, action }) => {
  const [valorInicial, setValorInicial] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Recupera o usuário armazenado no localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser ? storedUser.userId : null;
    console.log("User ID:", userId);

    // Verifica se o usuário está autenticado
    if (!userId) {
      alert('Erro: Usuário não autenticado. Por favor, faça login novamente.');
      return;
    }

    // Converte o valor inicial para número decimal
    const openingBalance = parseFloat(valorInicial);

    // Chama a função onSubmit passando os dados necessários
    onSubmit({ operatorId: userId, openingBalance });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">{action === 'open' ? 'Abrir Caixa' : 'Fechar Caixa'}</Typography>
      <Input
        label="Valor Inicial"
        value={valorInicial}
        onChange={(e) => setValorInicial(e.target.value)}
        type="number"
        required
      />
      <Button variant="primary" type="submit">
        {action === 'open' ? 'Abrir Caixa' : 'Fechar Caixa'}
      </Button>
    </Box>
  );
};

export default CashRegisterForm;
