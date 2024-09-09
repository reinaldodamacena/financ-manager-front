import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Input, Button } from '../../atoms/Index';

const CashRegisterForm = ({ onSubmit, action }) => {
  const [valorInicial, setValorInicial] = useState(action === 'open' ? '' : 0); // Valor inicial somente para abertura

  const handleSubmit = (event) => {
    event.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser ? storedUser.userId : null;

    if (!userId) {
      alert('Erro: Usuário não autenticado. Por favor, faça login novamente.');
      return;
    }

    if (action === 'open') {
      const openingBalance = parseFloat(valorInicial);
      onSubmit({ operatorId: userId, openingBalance });
    } else {
      onSubmit({ operatorId: userId }); // Apenas o `operatorId` para fechar
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">
        {action === 'open' ? 'Abrir Caixa' : 'Fechar Caixa'}
      </Typography>

      {action === 'open' && (
        <Input
          label="Valor Inicial"
          value={valorInicial}
          onChange={(e) => setValorInicial(e.target.value)}
          type="number"
          required
        />
      )}
      
      <Button variant="primary" type="submit">
        {action === 'open' ? 'Abrir Caixa' : 'Fechar Caixa'}
      </Button>
    </Box>
  );
};

export default CashRegisterForm;
