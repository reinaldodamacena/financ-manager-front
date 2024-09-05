import React, { useState, useEffect } from 'react';
import { Grid, Typography, Input } from '@mui/material';
import { TransparentBox, Button, Dropdown, Icon, SmallTransparentBox } from '../../atoms/Index';
import { useSaleServiceContext } from '../../../context/Sale/SaleServiceProvider'; // Use o contexto

const PaymentSection = ({ onFinalizeSale, paymentMethod, setPaymentMethod }) => {
  const { totals } = useSaleServiceContext();  // Obtemos os totais do contexto
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [change, setChange] = useState(0);

  useEffect(() => {
    setChange(receivedAmount - totals.totalNet); // Atualiza o troco
  }, [receivedAmount, totals.totalNet]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);  // Atualizando o método de pagamento
  };

  const handleReceivedAmountChange = (event) => {
    const value = parseFloat(event.target.value) || 0;
    setReceivedAmount(value);
  };

  return (
    <TransparentBox alignContent="center" position="relative" left="0%" height="100%" width="100%">
      <SmallTransparentBox width="90%" height="10%" justifyContent="center" right="auto" left="auto" maxWidth="300px" padding='10%' top="5%">
        <Typography variant="body1" color="primary" align="left">
          Total R$
        </Typography>
        <Typography variant="h4" color="textPrimary" align="center">
          {totals.totalNet.toFixed(2)} {/* Usando o valor totalNet do backend */}
        </Typography>
      </SmallTransparentBox>
      <Grid marginTop="25%" container spacing={3}>
        <Grid item xs={6}>
          <Input
            label="Desconto R$"
            variant="outlined"
            size="small"
            value={totals.totalDiscount.toFixed(2)}  // Usando o valor totalDiscount do backend
            fullWidth
            readOnly
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Total Bruto R$"
            variant="outlined"
            size="small"
            value={totals.totalGross.toFixed(2)}  // Usando o valor totalGross do backend
            fullWidth
            readOnly
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
            onClick={onFinalizeSale}
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
