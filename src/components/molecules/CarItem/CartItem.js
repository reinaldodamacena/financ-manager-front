import React, { useState } from 'react';
import { Grid, TextField, Typography, IconButton, CircularProgress } from '@mui/material';
import { Icon } from '../../atoms/Index';

const CartItem = ({ saleDetail, onQuantityChange, onRemove, onDetailUpdate }) => {
  const [quantity, setQuantity] = useState(saleDetail.quantity);
  const [productDescription, setProductDescription] = useState(saleDetail.productDescription);
  const [unitPrice, setUnitPrice] = useState(saleDetail.unitPrice);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o loading
  
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity); // Atualiza o valor localmente primeiro
    if (newQuantity > 0) {
      triggerUpdate({ quantity: newQuantity });
    }
  };

  const handleDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleUnitPriceChange = (event) => {
    const newUnitPrice = parseFloat(event.target.value);
    setUnitPrice(newUnitPrice);
  };

  const triggerUpdate = async (updatedFields) => {
    setIsLoading(true);
    try {
      // Chama o serviço para atualizar os detalhes da venda no backend
      await onDetailUpdate(saleDetail.saleDetailId, {
        ...saleDetail,
        quantity,
        productDescription,
        unitPrice,
        ...updatedFields
      });
    } catch (error) {
      console.error("Erro ao atualizar o item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlur = () => {
    triggerUpdate({ productDescription, unitPrice });
  };

  return (
    <Grid container alignItems="center" spacing={2} sx={{ position: 'relative' }}>
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: '-12px',
            marginTop: '-12px',
          }}
        />
      )}
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          value={productDescription}
          onChange={handleDescriptionChange}
          onBlur={handleBlur} // Atualiza o nome do produto ao perder o foco
          fullWidth
          label="Nome do Produto"
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleBlur}>
                <Icon name="Edit" />
              </IconButton>
            ),
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          inputProps={{ min: 1 }}
          fullWidth
          label="Quantidade"
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="number"
          value={unitPrice}
          onChange={handleUnitPriceChange}
          onBlur={handleBlur} // Atualiza o preço ao perder o foco
          inputProps={{ min: 0, step: 0.01 }}
          fullWidth
          label="Preço Unitário"
        />
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">
          R$ {(unitPrice * quantity).toFixed(2)}
        </Typography>
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
