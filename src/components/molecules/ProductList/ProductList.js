import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@mui/material';
import { CustomTable } from '../../molecules/Index';
import { Icon, Input } from '../../atoms/Index';
import { productService } from '../../../api/productService';
import useService from '../../../hooks/useService';

const ProductList = ({ onAddProduct }) => {
  const { data: products, fetchData } = useService(productService);
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeQuery, setBarcodeQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery || barcodeQuery) {
      if (searchQuery) {
        fetchData(productService.fetchByDescription, searchQuery);
      } else if (barcodeQuery) {
        fetchData(productService.fetchByCode, { barcode: barcodeQuery });
      }
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, barcodeQuery, fetchData]);

  useEffect(() => {
    if (products) {
      const formattedData = products.map((product) => ({
        productId: product.productId,
        manufacturerCode: product.manufacturerCode,
        description: product.description,
        barcode: product.barcode,
        quantityInStock: product.quantityInStock,
        price: (product.price !== undefined ? product.price : 0).toFixed(2),
      }));
      setFilteredProducts(formattedData);
    }
  }, [products]);

  const columns = [
    { field: 'productId', headerName: 'ID' },
    { field: 'manufacturerCode', headerName: 'Código' },
    { field: 'description', headerName: 'Produto' },
    { field: 'barcode', headerName: 'Código de Barras' },
    { field: 'quantityInStock', headerName: 'Quantidade' },
    { field: 'price', headerName: 'Preço', align: 'right', format: (value) => value.toFixed(2) },
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setBarcodeQuery('');
  };

  const handleBarcodeChange = (event) => {
    setBarcodeQuery(event.target.value);
    setSearchQuery('');
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
      <CustomTable
        columns={columns}
        data={filteredProducts}
        title="Itens"
        onRowClick={(row) => onAddProduct(row)}
      />
    </Box>
  );
};

ProductList.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
};

export default ProductList;
