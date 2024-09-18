import React, { useState, useEffect } from 'react';
import { Grid, Typography, InputAdornment, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button as MuiButton } from '@mui/material';
import { TransparentBox, Button, Dropdown, Icon, SmallTransparentBox } from '../../atoms/Index';
import { useSaleServiceContext } from '../../../context/Sale/SaleServiceProvider'; // Use o contexto

const PaymentSection = ({ onFinalizeSale, paymentMethod, setPaymentMethod }) => {
  const { totals } = useSaleServiceContext();  // Obtemos os totais do contexto
  const [receivedAmount, setReceivedAmount] = useState(''); // Inicializar como string vazia para aceitar entrada de texto
  const [change, setChange] = useState(0);
  const [openConfirmation, setOpenConfirmation] = useState(false); // Estado para controlar o modal de confirmação
  const [errorMessage, setErrorMessage] = useState(''); // Mensagem de erro para validação

  // Atualiza o troco com base no valor recebido
  useEffect(() => {
    const parsedReceivedAmount = parseFloat(receivedAmount.replace(',', '.')) || 0;
    setChange(parsedReceivedAmount - totals.totalNet);
  }, [receivedAmount, totals.totalNet]);

  // Atualiza o método de pagamento selecionado
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setErrorMessage(''); // Limpa a mensagem de erro ao mudar o método de pagamento
  };

  // Atualiza o valor recebido, permitindo que o usuário digite com ponto ou vírgula
  const handleReceivedAmountChange = (event) => {
    const value = event.target.value;
    setReceivedAmount(value); // Permitir digitação livre de números e vírgulas
  };

  // Verifica se o pagamento é em dinheiro para habilitar/desabilitar o campo de troco
  const isCashPayment = paymentMethod === 'Dinheiro';

  // Valida se todos os campos estão corretos antes de finalizar a venda
  const validateFields = () => {
    if (!paymentMethod) {
      setErrorMessage('Selecione um método de pagamento.');
      return false;
    }
    if (isCashPayment && parseFloat(receivedAmount.replace(',', '.')) < totals.totalNet) {
      setErrorMessage('O valor recebido não pode ser menor que o valor total.');
      return false;
    }
    return true;
  };

  // Função para mostrar o modal de confirmação
  const handleFinalizeSale = () => {
    if (validateFields()) {
      setOpenConfirmation(true); // Exibe o modal de confirmação
    }
  };

  // Função que confirma a venda e reseta os campos
  const confirmSale = () => {
    onFinalizeSale();  // Chama a função de finalização original
    setOpenConfirmation(false); // Fecha o modal
    setReceivedAmount(''); // Limpa o valor recebido
    setPaymentMethod(''); // Limpa o método de pagamento
    setErrorMessage(''); // Limpa a mensagem de erro
  };

  // Função que fecha o modal sem finalizar a venda
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
          {totals.totalNet.toFixed(2)} {/* Total líquido formatado */}
        </Typography>
      </SmallTransparentBox>

      <Grid container spacing={3} marginTop="25%">
        {/* Campos de desconto e total bruto */}
        <Grid item xs={6}>
          <TextField
            label="Desconto R$"
            variant="outlined"
            size="small"
            value={totals.totalDiscount.toFixed(2)}  // Valor de desconto formatado
            fullWidth
            InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Total Bruto R$"
            variant="outlined"
            size="small"
            value={totals.totalGross.toFixed(2)}  // Valor total bruto formatado
            fullWidth
            InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
          />
        </Grid>

        {/* Dropdown para selecionar método de pagamento */}
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
            error={!!errorMessage} // Exibe erro se houver
          />
        </Grid>

        {/* Exibe campos de "Valor Recebido" e "Troco" apenas se o pagamento for em dinheiro */}
        {isCashPayment && (
          <>
            {/* Campo de valor recebido */}
            <Grid item xs={6}>
              <TextField
                label="Valor Recebido R$"
                variant="outlined"
                size="small"
                value={receivedAmount}
                onChange={handleReceivedAmountChange}
                fullWidth
                InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
                error={!!errorMessage} // Exibe erro se houver
                helperText={errorMessage && isCashPayment ? errorMessage : ''}
              />
            </Grid>

            {/* Campo de troco */}
            <Grid item xs={6}>
              <TextField
                label="Troco R$"
                variant="outlined"
                size="small"
                value={change.toFixed(2).replace('.', ',')} // Troco formatado
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
              />
            </Grid>
          </>
        )}

        {/* Botões para finalizar e cancelar a venda */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<Icon name="CheckCircle" />}
            sx={{ marginBottom: 2 }}
            onClick={handleFinalizeSale} // Chama a função que valida e exibe o modal
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
