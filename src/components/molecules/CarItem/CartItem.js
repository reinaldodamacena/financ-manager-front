import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, IconButton } from '@mui/material';
import { Icon } from '../../atoms/Index';

const CartItem = ({ saleDetail, onUpdateDetail, onRemove }) => {
  const [localSaleDetail, setLocalSaleDetail] = useState(saleDetail);

  // Atualiza o estado local quando o saleDetail muda
  useEffect(() => {
    setLocalSaleDetail(saleDetail);
  }, [saleDetail]);

  // Unificar o comportamento de atualização de qualquer campo
  const triggerUpdate = (updatedFields) => {
    const updatedData = {
      ...localSaleDetail,
      ...updatedFields,
    };
    setLocalSaleDetail(updatedData);
    onUpdateDetail(updatedData.saleDetailId, updatedData);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      triggerUpdate({ quantity: newQuantity });
    }
  };

  const handlePriceChange = (event) => {
    const newPrice = parseFloat(event.target.value);
    if (newPrice >= 0) {
      triggerUpdate({ unitPrice: newPrice });
    }
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    triggerUpdate({ productDescription: newDescription });
  };

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={4}>
        <TextField
          label="Descrição"
          value={localSaleDetail.productDescription}
          onChange={handleDescriptionChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="number"
          label="Quantidade"
          value={localSaleDetail.quantity}
          onChange={handleQuantityChange}
          inputProps={{ min: 1 }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="number"
          label="Preço Unitário"
          value={localSaleDetail.unitPrice}
          onChange={handlePriceChange}
          inputProps={{ min: 0 }}
        />
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">{(localSaleDetail.unitPrice * localSaleDetail.quantity).toFixed(2)}</Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton color="secondary" onClick={() => onRemove(localSaleDetail.saleDetailId)}>
          <Icon name="Delete" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CartItem;
