import React, { useState } from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import { Input, Icon } from '../../atoms/Index';
import { useSaleServiceContext } from '../../../context/Sale/SaleServiceProvider';

const ClientSection = () => {
  const { updateSale } = useSaleServiceContext();
  const [cpf, setCpf] = useState('');
  const [clientName, setClientName] = useState('');

  const handleCpfSearch = () => {
    // Simulação de busca do cliente por CPF
    const customer = { customerId: 1, name: 'Fulano de tal da Silva e Silva' }; // Dados mockados
    setClientName(customer.name);
    updateSale({ customerId: customer.customerId });
  };

  return (
    <div>
      <Typography variant="h5" color="textPrimary">
        Cliente
      </Typography>
      <Divider sx={{ borderColor: 'primary.main', marginBottom: 2, width: '121%' }} />
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} sm={6} md={4}>
          <Input
            label="Busca CPF"
            mask="999.999.999-99"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            icon={() => <Icon name="Search" size="2rem" color="primary.main" />}
            onBlur={handleCpfSearch}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" color="textPrimary">
            {clientName || 'Cliente não selecionado'}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ClientSection;
