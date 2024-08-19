import React from 'react';
import { Input, Dropdown } from '../../atoms/Index';
import { Typography, Grid } from '@mui/material';

const PaymentSection = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <Input label="Desconto R$" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Input label="Desconto %" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Dropdown 
        label="Pagamento" 
        options={[
          { value: 'dinheiro', label: 'Dinheiro' },
          { value: 'cartao', label: 'Cartão' }
        ]} 
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Input label="Valor recebido R$" />
    </Grid>
    <Grid item xs={12}>
      <Typography variant="body1">Troco R$: 15,34</Typography>
    </Grid>
  </Grid>
);

export default PaymentSection;
