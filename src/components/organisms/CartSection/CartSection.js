import React from 'react';
import { Grid } from '@mui/material';
import { CartItem } from '../../molecules/Index';

const CartSection = ({ cart = [], onQuantityChange, onRemove, onDetailUpdate }) => {
  // Verificar se o carrinho está vazio
  if (!Array.isArray(cart) || cart.length === 0) {
    return <p>Carrinho vazio</p>;
  }

  return (
    <Grid container spacing={2}>
      {cart.map((saleDetail) => (
        <CartItem
          key={saleDetail.saleDetailId}
          saleDetail={saleDetail}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
          onDetailUpdate={onDetailUpdate} // Passa a função de atualização dos detalhes
        />
      ))}
    </Grid>
  );
};

export default CartSection;
