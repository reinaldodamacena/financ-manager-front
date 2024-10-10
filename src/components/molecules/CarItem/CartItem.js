import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, IconButton, Box, Divider, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Importando o useTheme para acessar o tema
import { Icon } from '../../atoms/Index';

const CartItem = ({ saleDetail, onUpdateDetail, onRemove, index }) => {
  const theme = useTheme(); // Acessando o tema
  const [localSaleDetail, setLocalSaleDetail] = useState(saleDetail);

  useEffect(() => {
    setLocalSaleDetail(saleDetail);
  }, [saleDetail]);

  const formatPrice = (price) => price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

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

  // Função para garantir que o valor sempre tenha duas casas decimais
  const handlePriceChange = (event) => {
    let rawValue = event.target.value.replace(/[^\d]/g, ''); // Remove qualquer caractere que não seja dígito

    if (rawValue) {
      // Se o valor for menor que 100, garante que seja mostrado como "0,50" ou "0,05", etc.
      if (rawValue.length <= 2) {
        rawValue = rawValue.padStart(3, '0'); // Adiciona zero à esquerda, se necessário
      }

      const newPrice = (parseFloat(rawValue) / 100).toFixed(2); // Converte para número decimal e garante 2 casas decimais
      triggerUpdate({ unitPrice: newPrice });
    }
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    triggerUpdate({ productDescription: newDescription });
  };

  return (
    <Box
      sx={{
        marginBottom: theme.spacing(3),
        padding: theme.spacing(1),
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between" spacing={1} sx={{padding: theme.spacing(0),marginBottom: theme.spacing(0),marginTop: theme.spacing(1)}}>
        {/* Exibe o índice do item */}
        <Grid item xs={1}>
          <Typography variant="body1" sx={{ fontWeight: theme.typography.fontWeightBold, textAlign: 'center' }}>
            {index + 1}.
          </Typography>
        </Grid>

        {/* Descrição do Produto */}
        <Grid item xs={4} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Descrição"
              value={localSaleDetail.productDescription}
              onChange={handleDescriptionChange}
              fullWidth
              size="small"
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[1],
              }}
              InputProps={{ style: { textAlign: 'center' } }}
            />
          </Box>
        </Grid>

        {/* Quantidade */}
        <Grid item xs={2} md={2}>
          <TextField
            type="number"
            label="Quantidade"
            value={localSaleDetail.quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
            size="small"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[1],
            }}
            InputProps={{ style: { textAlign: 'center' } }}
          />
        </Grid>

        {/* Preço Unitário com o prefixo "R$" e duas casas decimais */}
        <Grid item xs={2} md={2}>
          <TextField
            type="text"
            label="Preço Unitário"
            value={Number(localSaleDetail.unitPrice).toFixed(2)} // Garante a exibição com 2 casas decimais
            onChange={handlePriceChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              style: { textAlign: 'center' }
            }}
            size="small"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[1],
            }}
          />
        </Grid>

        {/* Total (Preço * Quantidade) */}
        <Grid item xs={2} md={2}>
          <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.success.main, textAlign: 'center' }}>
            {formatPrice(localSaleDetail.unitPrice * localSaleDetail.quantity)}
          </Typography>
        </Grid>

        {/* Botão de Remover */}
        <Grid item xs={1} md={1} sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton
            onClick={() => onRemove(localSaleDetail.saleDetailId)}
            sx={{
              backgroundColor: theme.palette.error.main,
              color: theme.palette.error.contrastText,
              '&:hover': {
                backgroundColor: theme.palette.error.dark,
              },
            }}
          >
            <Icon name="Delete" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;
