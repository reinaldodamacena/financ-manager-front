import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, IconButton, TextField, Typography } from '@mui/material';
import { Icon } from '../../atoms/Index';

const CartItem = ({ product, onQuantityChange, onRemove }) => {
  const handleQuantityChange = (event) => {
    onQuantityChange(product.productId, event.target.value);
  };

  return (
    <Box mb={2} p={2} border={1} borderRadius={2} borderColor="divider">
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body1">{product.description}</Typography>
        </Grid>
        <Grid item xs={2}>
          <TextField
            type="number"
            value={product.quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1">{(product.price * product.quantity).toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton color="secondary" onClick={() => onRemove(product.productId)}>
            <Icon name="Delete" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
