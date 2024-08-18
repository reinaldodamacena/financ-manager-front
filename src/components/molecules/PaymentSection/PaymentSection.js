import React from 'react';
import { Input, Dropdown } from '../../atoms/Index';
import { Typography } from '@mui/material';
 

const PaymentSection = () => (
  <div>
    <Input label="Desconto R$" />
    <Input label="Desconto %" />
    <Dropdown label="Pagamento" options={['Dinheiro', 'Cartão']} />
    <Input label="Valor recebido R$" />
    <Typography variant="body1">Troco R$: 15,34</Typography>
  </div>
);

export default PaymentSection;
