import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, MenuItem, InputAdornment, Alert } from '@mui/material';
import { Button } from '../../atoms/Index';
import { useCashRegister } from '../../../hooks/useCashRegister/useCashRegister';
import { useCashRegisterContext } from '../../../context/CashRegister/CashRegisterServiceProvider'; // Importando o contexto

const CashRegisterOperationForm = () => {
  const {
    caixasAbertos, // Traz os caixas abertos
    handleRegistrarOperacao, // Usando o handler do hook
    loading,
    error,
  } = useCashRegister(useCashRegisterContext); // Integração com o contexto

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [operationType, setOperationType] = useState('Withdrawal');
  const [errorMessage, setErrorMessage] = useState('');
  const usercash = JSON.parse(localStorage.getItem('user'));
  const [cashRegisterId, setCashRegisterId] = useState(null);

  useEffect(() => {
    if (caixasAbertos && caixasAbertos.length > 0) {
      setCashRegisterId(caixasAbertos[0].cashRegisterId); // Pega o primeiro caixa aberto
    }
  }, [caixasAbertos]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!amount || !description) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    const operatorId = usercash ? usercash.userId : null;
    if (!operatorId || !cashRegisterId) {
      setErrorMessage('Erro: Caixa ou Usuário não autenticado. Por favor, faça login novamente.');
      return;
    }

    try {
      await handleRegistrarOperacao(cashRegisterId, parseFloat(amount), description, operationType, operatorId);
      setAmount(''); // Limpa os campos após sucesso
      setDescription('');
      setErrorMessage('Operação registrada com sucesso.');
    } catch (error) {
      setErrorMessage('Erro ao registrar a operação.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 500,
        margin: 'auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h5" color="primary" textAlign="center">
        Registrar Operação no Caixa
      </Typography>

      {(errorMessage || error) && (
        <Alert severity="error">{errorMessage || error}</Alert>
      )}

      <TextField
        label="Valor"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        required
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
      />

      <TextField
        label="Descrição"
        placeholder="Ex: Pagamento de fornecedor"
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
        <MenuItem value="Receipt">Recebimento</MenuItem>
      </TextField>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ marginTop: 2 }}
        disabled={loading} // Desabilita o botão enquanto carrega
      >
        {loading ? 'Registrando...' : 'Registrar Operação'}
      </Button>
    </Box>
  );
};

export default CashRegisterOperationForm;
