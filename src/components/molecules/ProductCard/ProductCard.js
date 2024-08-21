import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { Icon, ConfigurableBox } from '../../atoms/Index';

const ProductCard = ({ product, onEdit, onDelete }) => (
  <ConfigurableBox
    sx={{
      padding: 3,
      borderRadius: 2,
      boxShadow: 3,
      backgroundColor: 'background.paper',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 4,
      },
    }}
  >
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" color="text.primary" sx={{ marginBottom: 1 }}>
        {product.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Código: {product.code}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Preço: R${product.price.toFixed(2)}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Icon
          name="Edit"
          sx={{
            color: 'primary.main',
            '&:hover': {
              color: 'primary.dark',
            },
          }}
          onClick={onEdit}
        />
        <Icon
          name="Delete"
          sx={{
            color: 'error.main',
            '&:hover': {
              color: 'error.dark',
            },
          }}
          onClick={onDelete}
        />
      </Box>
    </Box>
  </ConfigurableBox>
);

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductCard;
