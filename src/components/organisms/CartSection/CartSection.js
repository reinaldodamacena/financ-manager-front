import React from 'react';
import { Grid } from '@mui/material';
import { CartItem } from '../../molecules/Index';

const CartSection = ({ cart = [], onUpdateDetail, onRemove }) => {
  if (!Array.isArray(cart) || cart.length === 0) {
    return <p>Carrinho vazio</p>;
  }

  return (
    <Grid container>
      {cart.map((saleDetail) => (
        <CartItem
          key={saleDetail.saleDetailId}
          saleDetail={saleDetail}
          onUpdateDetail={onUpdateDetail}  // Certifique-se de que onUpdateDetail está sendo passado corretamente
          onRemove={onRemove}
        />
      ))}
    </Grid>
  );
};

export default CartSection;
