import React, { useState, useEffect } from 'react';
import { Grid, Typography, InputAdornment, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button as MuiButton } from '@mui/material';
import { TransparentBox, Button, Dropdown, Icon, SmallTransparentBox } from '../../atoms/Index';

const PaymentSection = ({ 
  onFinalizeSale, 
  totals, 
  paymentMethod, 
  setPaymentMethod, 
  loading, 
  onDiscountChange,         // Função para ajuste de desconto
  onNewTotalChange,         // Função para ajuste de novo total líquido
  onTotalDiscountChange     // Função para ajuste de total de desconto
}) => {
  const [receivedAmount, setReceivedAmount] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [change, setChange] = useState(0);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Atualiza o troco com base no valor recebido
  useEffect(() => {
    const parsedReceivedAmount = parseFloat(receivedAmount.replace(',', '.')) || 0;
    setChange(parsedReceivedAmount - (totals?.totalNet || 0));
  }, [receivedAmount, totals?.totalNet]);

  // Lida com a alteração no método de pagamento
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setErrorMessage('');
  };

  // Lida com a alteração no valor recebido
  const handleReceivedAmountChange = (event) => {
    setReceivedAmount(event.target.value);
  };

  // Lida com a alteração no desconto e chama o handler correspondente
  const handleDiscountChange = async (event) => {
    const discount = parseFloat(event.target.value) || 0;
    setDiscountPercentage(discount);
    if (totals?.saleId) {
      await onDiscountChange(discount);  // Chama a função de ajuste de desconto no SalesPage
    }
  };

  // Verifica se o pagamento é em dinheiro
  const isCashPayment = paymentMethod === 'Dinheiro';

  // Valida os campos antes de finalizar a venda
  const validateFields = () => {
    if (!paymentMethod) {
      setErrorMessage('Selecione um método de pagamento.');
      return false;
    }
    if (isCashPayment && parseFloat(receivedAmount.replace(',', '.')) < totals?.totalNet) {
      setErrorMessage('O valor recebido não pode ser menor que o valor total.');
      return false;
    }
    return true;
  };

  // Lida com a finalização da venda
  const handleFinalizeSale = () => {
    if (validateFields()) {
      setOpenConfirmation(true);
    }
  };

  // Confirma e finaliza a venda
  const confirmSale = () => {
    onFinalizeSale();  // Chama a função de finalização no SalesPage
    setOpenConfirmation(false);
    setReceivedAmount('');
    setPaymentMethod('');
    setErrorMessage('');
  };

  // Fecha o modal de confirmação
  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  return (
    <TransparentBox alignContent="center" position="relative" left="0%" height="100%" width="100%">
      {/* Modal de confirmação */}
      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Finalizar Venda</DialogTitle>
        <DialogContent>
          <Typography>Você tem certeza que deseja finalizar a venda?</Typography>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleCloseConfirmation} color="secondary">Cancelar</MuiButton>
          <MuiButton onClick={confirmSale} color="primary">Confirmar</MuiButton>
        </DialogActions>
      </Dialog>

      {/* Caixa mostrando o total */}
      <SmallTransparentBox width="90%" height="10%" justifyContent="center" right="auto" left="auto" maxWidth="300px" padding="10%" top="5%">
        <Typography variant="body1" color="primary" align="left">
          Total R$
        </Typography>
        <Typography variant="h4" color="textPrimary" align="center">
          {totals?.totalNet ? totals.totalNet.toFixed(2) : '0.00'}
        </Typography>
      </SmallTransparentBox>

      {/* Grid com os campos de pagamento e desconto */}
      <Grid container spacing={3} marginTop="25%">
        <Grid item xs={6}>
          <TextField
            label="Desconto (%)"
            variant="outlined"
            size="small"
            value={discountPercentage}
            onChange={handleDiscountChange}  // Chama a função ao alterar o desconto
            fullWidth
            InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
            error={!!errorMessage}
            helperText={errorMessage}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Total Bruto R$"
            variant="outlined"
            size="small"
            value={totals?.totalGross?.toFixed(2) || '0.00'}
            fullWidth
            InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
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
            error={!!errorMessage}
          />
        </Grid>

        {isCashPayment && (
          <>
            <Grid item xs={6}>
              <TextField
                label="Valor Recebido R$"
                variant="outlined"
                size="small"
                value={receivedAmount}
                onChange={handleReceivedAmountChange}
                fullWidth
                InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
                error={!!errorMessage}
                helperText={errorMessage && isCashPayment ? errorMessage : ''}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Troco R$"
                variant="outlined"
                size="small"
                value={change.toFixed(2).replace('.', ',')}
                fullWidth
                InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<Icon name="CheckCircle" />}
            onClick={handleFinalizeSale}
            disabled={loading}
          >
            Finalizar venda
          </Button>
        </Grid>
      </Grid>
    </TransparentBox>
  );
};

export default PaymentSection;
