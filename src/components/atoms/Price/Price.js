import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Price = ({ unitPrice, totalPrice }) => {
  return (
    <>
      <Typography variant="body1" color="text.primary">
        Preço Unitário: R$ {unitPrice.toFixed(2)}
      </Typography>
      <Typography variant="body1" color="text.primary">
        Total: R$ {totalPrice.toFixed(2)}
      </Typography>
    </>
  );
};

Price.propTypes = {
  unitPrice: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default Price;
