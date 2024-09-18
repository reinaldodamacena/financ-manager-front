import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import { Input, Icon } from '../../atoms/Index';
import { useEnhancedProductService } from '../../../context/Product/ProductServiceProvider';
import { useTheme } from '@mui/material/styles';
import { ProductCard } from '../Index'; // Importando o ProductCard

const ProductList = ({ onAddToCart }) => {
  const theme = useTheme(); // Usando o tema personalizado
  const { fetchByDescription, fetchByCode } = useEnhancedProductService();
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeQuery, setBarcodeQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState(''); // Debounce state

  // Função para buscar produtos
  const fetchData = async (queryType, queryValue) => {
    setLoading(true);
    setError(null);
    try {
      let products = [];
      if (queryType === 'description' && queryValue) {
        products = await fetchByDescription(queryValue);
      } else if (queryType === 'barcode' && queryValue) {
        products = await fetchByCode(queryValue);
      }
      setFilteredProducts(products);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setError('Erro ao buscar produtos. Tente novamente.');
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce para evitar requisições a cada caractere digitado
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedQuery(searchQuery || barcodeQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, barcodeQuery]);

  // Executa a busca apenas quando o debounce finalizar
  useEffect(() => {
    if (debouncedQuery) {
      if (searchQuery) {
        fetchData('description', searchQuery);
      } else if (barcodeQuery) {
        fetchData('barcode', barcodeQuery);
      }
    }
  }, [debouncedQuery, searchQuery, barcodeQuery]);

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
    onAddToCart(product, quantity);
  };

  return (
    <Box>
      {/* Barra de pesquisa */}
      <Grid container spacing={2} sx={{ marginBottom: theme.spacing(3), justifyContent: 'space-between' }}>
        <Grid item xs={12} sm={6}>
          <Input
            label="Pesquisar por nome"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Digite o nome do produto"
            icon={() => <Icon name="PersonSearch" size="2rem" color={theme.palette.primary.main} />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            label="Código de barras"
            variant="outlined"
            fullWidth
            value={barcodeQuery}
            onChange={handleBarcodeChange}
            placeholder="Digite o código de barras"
            icon={() => <Icon name="Barcode" size="2rem" color={theme.palette.primary.main} />}
          />
        </Grid>
      </Grid>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      ) : filteredProducts.length > 0 ? (
        <Grid container spacing={1}>
          {filteredProducts.slice(0, 3).map((product) => { // Limitando a exibição para 3 produtos
            if (!product) return null; // Ignora produtos indefinidos ou nulos

            const quantity = quantities[product.productId] || 1;

            return (
              <Grid item xs={12} key={product.productId}>
                <ProductCard
                  product={product}
                  quantity={quantity}
                  onQuantityChange={handleQuantityChange}
                  onAddToCart={handleAddToCartClick}
                  isForSalePage={true}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.primary" align="center">
          Nenhum produto encontrado
        </Typography>
      )}
    </Box>
  );
};

ProductList.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductList;
