import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import {Input, Button} from '../../atoms/Index';


const CashRegisterForm = ({ onSubmit, action }) => {
  const [valorInicial, setValorInicial] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ valorInicial: parseFloat(valorInicial) });
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
      <Button label={action === 'open' ? 'Abrir Caixa' : 'Fechar Caixa'} type="submit" variant="contained" />
    </Box>
  );
};

export default CashRegisterForm;