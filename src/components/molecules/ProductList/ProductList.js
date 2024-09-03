import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@mui/material';
import { CustomTable } from '../../molecules/Index';
import { Icon, Input, Button } from '../../atoms/Index';
import { useEnhancedProductService } from '../../../context/Product/ProductServiceProvider';

const ProductList = ({ onAddToCart }) => {
  const { fetchByDescription, fetchByCode } = useEnhancedProductService();
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeQuery, setBarcodeQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  const columns = [
    { field: 'productId', headerName: 'ID' },
    { field: 'manufacturerCode', headerName: 'Código' },
    { field: 'description', headerName: 'Produto' },
    { field: 'barcode', headerName: 'Código de Barras' },
    { field: 'quantityInStock', headerName: 'Quantidade' },
    { 
      field: 'price', 
      headerName: 'Preço', 
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      field: 'actions',
      headerName: 'Ações',
      renderCell: (product) => (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => onAddToCart(product)}
        >
          Adicionar
        </Button>
      ),
    },
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setBarcodeQuery(''); // Limpar a consulta de código de barras ao pesquisar por descrição
  };

  const handleBarcodeChange = (event) => {
    setBarcodeQuery(event.target.value);
    setSearchQuery(''); // Limpar a consulta de descrição ao pesquisar por código de barras
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
        <CustomTable columns={columns} data={filteredProducts} title="Itens" />
      ) : (
        <p>Nenhum produto disponível</p>
      )}
    </Box>
  );
};

ProductList.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductList;
