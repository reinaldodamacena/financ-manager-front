import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import { TransparentBox, Button, Input, Dropdown, Icon, SmallTransparentBox } from '../../atoms/Index';
import { Typography } from '@mui/material';

const PaymentSection = () => {
  const [paymentMethod, setPaymentMethod] = useState('Dinheiro');
  const [receivedAmount, setReceivedAmount] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [total, setTotal] = useState(634.66); // Valor total de exemplo
  const [change, setChange] = useState(0);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleReceivedAmountChange = (event) => {
    const value = parseFloat(event.target.value) || 0;
    setReceivedAmount(value);
    setChange(value - total);
  };

  return (
    <TransparentBox alignContent="center" position="relative" left="0%" height="100%" width="100%">
      <SmallTransparentBox width="90%" height="10%" justifyContent="center" right="auto"
        left="auto"  maxWidth="300px" padding='10%' top="5%">
            <Typography variant="body1" color="primary" align="left">
              Total R$
            </Typography>
            <Typography variant="h4" color="textPrimary" align="center">
              {total.toFixed(2)}
            </Typography>
          </SmallTransparentBox>
      <Grid marginTop="25%" container spacing={3}>
        <Grid item xs={6}>
          <Input
            label="Desconto R$"
            variant="outlined"
            size="small"
            value={discountAmount}
            onChange={(e) => setDiscountAmount(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Desconto %"
            variant="outlined"
            size="small"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Dropdown
            label="Pagamento"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            options={[
              { value: 'Dinheiro', label: 'Dinheiro' },
              { value: 'Cartão de Crédito', label: 'Cartão de Crédito' },
              { value: 'Cartão de Débito', label: 'Cartão de Débito' },
              { value: 'Pix', label: 'Pix' },
            ]}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label="Valor recebido R$"
            variant="outlined"
            size="small"
            value={receivedAmount}
            onChange={handleReceivedAmountChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Troco R$"
            variant="outlined"
            size="small"
            value={change.toFixed(2)}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<Icon name="CheckCircle" />}
            sx={{ marginBottom: 2 }}
          >
            Finalizar venda
          </Button>
          <Button
            variant="text"
            color="secondary"
            fullWidth
            endIcon={<Icon name="Cancel" />}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </TransparentBox>
  );
};

export default PaymentSection;
