import React, { useState } from 'react';
import { Box, Typography, TextField, MenuItem } from '@mui/material';
import { Button } from '../../atoms/Index'; // Supondo que o botão já exista nos seus átomos

const CashRegisterOperationForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [operationType, setOperationType] = useState('Withdrawal'); // Tipo de operação padrão
  const usercash = JSON.parse(localStorage.getItem('user')); // Pegando o ID do usuário autenticado

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!amount || !description) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const operatorId = usercash ? usercash.userId : null;

    if (!operatorId) {
      alert('Erro: Usuário não autenticado. Por favor, faça login novamente.');
      return;
    }

    const operationData = {

      amount: parseFloat(amount),
      description,
      operationType,
      operatorId
    };
    console.log(operationData);

    onSubmit(operationData); // Chama a função de callback que será passada no onSubmit
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Registrar Operação no Caixa</Typography>
      <TextField
        label="Valor"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
      />
      <TextField
        select
        label="Tipo de Operação"
        value={operationType}
        onChange={(e) => setOperationType(e.target.value)}
        fullWidth
        required
      >
        <MenuItem value="Withdrawal">Retirada</MenuItem>
        <MenuItem value="Payment">Pagamento</MenuItem>
      </TextField>
      <Button variant="primary" type="submit">
        Registrar Operação
      </Button>
    </Box>
  );
};

export default CashRegisterOperationForm;
