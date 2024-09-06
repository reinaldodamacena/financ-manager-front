import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Typography } from '@mui/material';
import { Icon, Input, Button } from '../../atoms/Index';
import { useEnhancedProductService } from '../../../context/Product/ProductServiceProvider';

const ProductList = ({ onAddToCart }) => {
  const { fetchByDescription, fetchByCode } = useEnhancedProductService();
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeQuery, setBarcodeQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantities, setQuantities] = useState({}); // Gerenciar a quantidade de cada produto

  useEffect(() => {
    const fetchData = async () => {
      try {
        let products = [];
        if (searchQuery) {
          products = await fetchByDescription(searchQuery);
        } else if (barcodeQuery) {
          products = await fetchByCode(barcodeQuery);
        }
        setFilteredProducts(products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setFilteredProducts([]);
      }
    };

    fetchData();
  }, [searchQuery, barcodeQuery, fetchByDescription, fetchByCode]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setBarcodeQuery(''); // Limpar a consulta de código de barras ao pesquisar por descrição
  };

  const handleBarcodeChange = (event) => {
    setBarcodeQuery(event.target.value);
    setSearchQuery(''); // Limpar a consulta de descrição ao pesquisar por código de barras
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value > 0 ? value : 1,
    }));
  };

  const handleAddToCartClick = (product) => {
    const quantity = quantities[product.productId] || 1;
    // Passa o produto e a quantidade diretamente para o `onAddToCart` que é definido pelo `hook`
    onAddToCart(product, quantity);
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ marginBottom: 3, justifyContent: 'space-between' }}>
        <Grid item xs={12} sm={6}>
          <Input
            label="Pesquisar por nome"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            icon={() => <Icon name="PersonSearch" size="2rem" color="primary.main" />} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            label="Código de barras"
            variant="outlined"
            fullWidth
            value={barcodeQuery}
            onChange={handleBarcodeChange}
            icon={() => <Icon name="Barcode" size="2rem" color="primary.main" />} 
          />
        </Grid>
      </Grid>
      {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
        <List>
          {filteredProducts.map((product) => {
            const quantity = quantities[product.productId] || 1;
            const totalPrice = (product.price * quantity).toFixed(2);

            return (
              <ListItem key={product.productId} divider sx={{ padding: 2 }}>
                <ListItemText
                  primary={
                    <Typography variant="h6" color="text.primary">
                      {product.description} - R$ {totalPrice}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      Código: {product.manufacturerCode} | Estoque: {product.quantityInStock} | Preço Unitário: R$ {product.price.toFixed(2)}
                    </Typography>
                  }
                />
                <TextField
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(product.productId, parseInt(e.target.value))}
                  label="Quantidade"
                  variant="outlined"
                  sx={{ width: 100, marginRight: 10 }}
                  InputProps={{
                    inputProps: { min: 1 }
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="adicionar"
                    onClick={() => handleAddToCartClick(product)} // Agora chama o `handleAddToCartClick`
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }}
                  >
                    <Icon name="AddShoppingCart" size="2rem" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Typography variant="body1" color="text.primary">
          Nenhum produto disponível
        </Typography>
      )}
    </Box>
  );
};

ProductList.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductList;
