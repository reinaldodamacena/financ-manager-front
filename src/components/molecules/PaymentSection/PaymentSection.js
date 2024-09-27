import React, { useState, useEffect } from 'react';
import { Grid, Typography, InputAdornment, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button as MuiButton } from '@mui/material';
import { TransparentBox, Button, Dropdown, Icon, SmallTransparentBox } from '../../atoms/Index';
import debounce from 'lodash.debounce';

const PaymentSection = ({
  onFinalizeSale,
  totals,
  paymentMethod,
  setPaymentMethod,
  loading,
  onDiscountChange,
  onNewTotalChange,
  onTotalDiscountChange,
}) => {
  const [receivedAmount, setReceivedAmount] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(totals.discountPercentage || 0);
  const [totalGross, setTotalGross] = useState(totals.totalGross || 0);
  const [totalNet, setTotalNet] = useState(totals.totalNet || 0);
  const [totalDiscount, setTotalDiscount] = useState(totals.totalDiscount || 0);
  const [change, setChange] = useState(0);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const parsedReceivedAmount = parseFloat(receivedAmount.replace(',', '.')) || 0;
    setChange(parsedReceivedAmount - totalNet);
  }, [receivedAmount, totalNet]);

  useEffect(() => {
    if (totals) {
      setDiscountPercentage(totals.discountPercentage || 0);
      setTotalGross(totals.totalGross || 0);
      setTotalNet(totals.totalNet || 0);
      setTotalDiscount(totals.totalDiscount || 0);
    }
  }, [totals]);

  const handleUpdateOnBlur = (callback, value) => {
    if (typeof callback === 'function') {
      callback(value);
    }
  };

  const debouncedUpdate = debounce((callback, value) => {
    handleUpdateOnBlur(callback, value); // Chama a função apenas ao desfocar ou após o debounce
  }, 500);

  const handleDiscountChange = (event) => {
    const discount = parseFloat(event.target.value) || 0;
    setDiscountPercentage(discount);
  };

  const handleDiscountBlur = () => {
    debouncedUpdate(onDiscountChange, discountPercentage);
  };

  const handleNewTotalChange = (event) => {
    const newTotal = parseFloat(event.target.value) || 0;
    setTotalNet(newTotal);
  };

  const handleNewTotalBlur = () => {
    debouncedUpdate(onNewTotalChange, totalNet);
  };

  const handleTotalDiscountChange = (event) => {
    const newTotalDiscount = parseFloat(event.target.value) || 0;
    setTotalDiscount(newTotalDiscount);
  };

  const handleTotalDiscountBlur = () => {
    debouncedUpdate(onTotalDiscountChange, totalDiscount);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setErrorMessage('');
  };

  const handleReceivedAmountChange = (event) => {
    setReceivedAmount(event.target.value);
  };

  const validateFields = () => {
    if (!paymentMethod) {
      setErrorMessage('Selecione um método de pagamento.');
      return false;
    }
    if (paymentMethod === 'Dinheiro' && parseFloat(receivedAmount.replace(',', '.')) < totalNet) {
      setErrorMessage('O valor recebido não pode ser menor que o valor total.');
      return false;
    }
    return true;
  };

  const handleFinalizeSale = () => {
    if (validateFields()) {
      setOpenConfirmation(true);
    }
  };

  const confirmSale = () => {
    onFinalizeSale({
      totalNet,
      discountPercentage,
      totalDiscount,
      paymentMethod,
      receivedAmount,
    });

    setOpenConfirmation(false);
    setReceivedAmount('');
    setPaymentMethod('');
    setErrorMessage('');
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  return (
    <TransparentBox alignContent="center" position="relative" left="0%" height="100%" width="100%">
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

      <SmallTransparentBox width="90%" height="10%" justifyContent="center" right="auto" left="auto" maxWidth="300px" padding="10%" top="5%">
        <Typography variant="body1" color="primary" align="left">Total R$</Typography>
        <Typography variant="h4" color="textPrimary" align="center">{totalNet.toFixed(2)}</Typography>
      </SmallTransparentBox>

      <Grid container spacing={3} marginTop="25%">
        <Grid item xs={6}>
          <TextField
            label="Desconto (%)"
            variant="outlined"
            size="small"
            value={discountPercentage}
            onChange={handleDiscountChange}
            onBlur={handleDiscountBlur}  // Apenas atualiza o desconto ao sair do campo
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
            value={totalGross.toFixed(2)}
            fullWidth
            InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Total Líquido R$"
            variant="outlined"
            size="small"
            value={totalNet.toFixed(2)}
            onChange={handleNewTotalChange}
            onBlur={handleNewTotalBlur}  // Apenas atualiza o total líquido ao sair do campo
            fullWidth
            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Valor do Desconto R$"
            variant="outlined"
            size="small"
            value={totalDiscount.toFixed(2)}
            onChange={handleTotalDiscountChange}
            onBlur={handleTotalDiscountBlur}  // Apenas atualiza o valor do desconto ao sair do campo
            fullWidth
            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
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

        {paymentMethod === 'Dinheiro' && (
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
                helperText={errorMessage && paymentMethod === 'Dinheiro' ? errorMessage : ''}
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
