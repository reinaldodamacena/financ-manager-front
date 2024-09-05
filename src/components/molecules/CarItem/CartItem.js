import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, IconButton, TextField, Typography } from '@mui/material';
import { Icon } from '../../atoms/Index';

const CartItem = ({ saleDetail, onQuantityChange, onRemove }) => {
  if (!saleDetail) {
    return null; // Verifique se o saleDetail é válido antes de renderizar
  }

  const handleQuantityChange = (event) => {
    onQuantityChange(saleDetail.saleDetailId, event.target.value);
  };

  return (
    <Box mb={2} p={2} border={1} borderRadius={2} borderColor="divider">
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body1">{saleDetail.productDescription}</Typography>
        </Grid>
        <Grid item xs={2}>
          <TextField
            type="number"
            value={saleDetail.quantity}
            onChange={handleQuantityChange}
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
    </Box>
  );
};

CartItem.propTypes = {
  saleDetail: PropTypes.object.isRequired, // Espera que o saleDetail seja passado
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
