import React from 'react';
import { Grid } from '@mui/material';
import { CartItem } from '../../molecules/Index';

const CartSection = ({ cart = [], onQuantityChange, onRemove }) => {
    // Garantir que o cart seja um array válido
    if (!Array.isArray(cart) || cart.length === 0) {
      return <p>Carrinho vazio</p>;  // Mensagem exibida se o carrinho estiver vazio
    }
  
    return (
      <Grid container>
        {cart.map((saleDetail) => (
          <CartItem
            key={saleDetail.saleDetailId}
            saleDetail={saleDetail}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
      </Grid>
    );
  };
  
  export default CartSection;