import React from 'react';
import PropTypes from 'prop-types';
import { Box, useTheme, IconButton, Tooltip, Grid } from '@mui/material';
import { Icon, ConfigurableBox, Price, QuantityInput, StockStatus } from '../../atoms/Index';

const ProductCard = ({ product, onEdit, onDelete, onAddToCart, quantity, onQuantityChange, isForSalePage }) => {
  const theme = useTheme();

  // Verifica se o objeto `product` está definido antes de continuar
  if (!product) {
    return null; // Não renderiza nada se o produto for indefinido
  }

  const totalPrice = (product.price * quantity).toFixed(2);
  const stockStatus = product.quantityInStock > 10 ? 'success' : product.quantityInStock > 0 ? 'warning' : 'error';
  const stockLabel = product.quantityInStock > 10 ? 'EE' : product.quantityInStock > 0 ? 'PE' : 'E';

  return (
    <ConfigurableBox
  sx={{
    padding: theme.spacing(1), // Mantendo o padding reduzido para manter o card fino
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: theme.transitions.create(['background-color', 'transform'], {
      duration: theme.transitions.duration.shorter,
    }),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    boxSizing: 'border-box',
  }}
>
  <Grid container spacing={2} sx={{ width: '100%' }}>
    {/* Coluna do Nome do Produto e Preço */}
    <Grid item xs={12} md={8}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: theme.spacing(0) }}>
          {product.description}
        </Box>
        <Price unitPrice={product.price} totalPrice={parseFloat(totalPrice)} />
      </Box>
    </Grid>

    {/* Coluna do Status de Estoque */}
    <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <StockStatus status={stockStatus} label={stockLabel} />
    </Grid>

    {/* Seção de Quantidade */}
    <Grid item xs={5} md={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <QuantityInput
        value={quantity}
        onChange={(value) => onQuantityChange(product.productId, parseInt(value))}
        sx={{ maxWidth: '50px', textAlign: 'center' }} // Ajuste para largura menor
      />
    </Grid>

    {/* Botão de Adicionar ao Carrinho */}
    <Grid item xs={6} md={1} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
      <Tooltip title={`Adicionar ${product.description} ao carrinho`} arrow>
        <IconButton
          edge="end"
          aria-label={`Adicionar ${product.description} ao carrinho`}
          onClick={() => onAddToCart(product)}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: theme.spacing(1),
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          <Icon name="AddShoppingCart" size="1.2rem" />
        </IconButton>
      </Tooltip>
    </Grid>
  </Grid>
</ConfigurableBox>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onAddToCart: PropTypes.func,
  quantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  isForSalePage: PropTypes.bool,
};

ProductCard.defaultProps = {
  onEdit: () => { },
  onDelete: () => { },
  onAddToCart: () => { },
  isForSalePage: false,
};

export default ProductCard;
