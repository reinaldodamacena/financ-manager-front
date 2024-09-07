import React, { useState } from 'react';
import { Grid, TextField, Typography, IconButton } from '@mui/material';
import { Icon } from '../../atoms/Index';

const CartItem = ({ saleDetail, onUpdateDetail, onRemove }) => {
  const [localQuantity, setLocalQuantity] = useState(saleDetail.quantity);
  const [localUnitPrice, setLocalUnitPrice] = useState(saleDetail.unitPrice);
  const [localDescription, setLocalDescription] = useState(saleDetail.productDescription);

  // Unificar o comportamento de atualização de qualquer campo
  const triggerUpdate = (updatedFields) => {
    const updatedData = {
      ...saleDetail,
      ...updatedFields,
    };
    onUpdateDetail(saleDetail.saleDetailId, updatedData);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      setLocalQuantity(newQuantity);
      triggerUpdate({ quantity: newQuantity });
    }
  };

  const handlePriceChange = (event) => {
    const newPrice = parseFloat(event.target.value);
    if (newPrice >= 0) {
      setLocalUnitPrice(newPrice);
      triggerUpdate({ unitPrice: newPrice });
    }
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    setLocalDescription(newDescription);
    triggerUpdate({ productDescription: newDescription });
  };

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={4}>
        <TextField
          label="Descrição"
          value={localDescription}
          onChange={handleDescriptionChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="number"
          label="Quantidade"
          value={localQuantity}
          onChange={handleQuantityChange}
          inputProps={{ min: 1 }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="number"
          label="Preço Unitário"
          value={localUnitPrice}
          onChange={handlePriceChange}
          inputProps={{ min: 0 }}
        />
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">{(localUnitPrice * localQuantity).toFixed(2)}</Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton color="secondary" onClick={() => onRemove(saleDetail.saleDetailId)}>
          <Icon name="Delete" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CartItem;
