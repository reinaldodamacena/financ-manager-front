import React from 'react';
import { Grid, TextField, Typography, IconButton } from '@mui/material';
import { Icon } from '../../atoms/Index';

const CartItem = ({ saleDetail, onQuantityChange, onRemove }) => {
  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={4}>
        <Typography variant="body1">{saleDetail.productDescription}</Typography>
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="number"
          value={saleDetail.quantity}
          onChange={(e) => onQuantityChange(saleDetail.saleDetailId, e.target.value)}
          inputProps={{ min: 1 }}
        />
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">{(saleDetail.unitPrice * saleDetail.quantity).toFixed(2)}</Typography>
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
