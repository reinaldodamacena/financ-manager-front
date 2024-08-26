import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@mui/material';
import { CustomTable } from '../../molecules/Index';
import { Icon, Input } from '../../atoms/Index';
import { productService } from '../../../api/productService';
import useService from '../../../hooks/useService';

const ProductList = () => {
  const { data: products, fetchData } = useService(productService);
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeQuery, setBarcodeQuery] = useState('');

  useEffect(() => {
    // Trigger a search whenever the searchQuery or barcodeQuery changes
    if (searchQuery) {
      fetchData(productService.fetchByDescription, searchQuery);
    } else if (barcodeQuery) {
      fetchData(productService.fetchByCode, { barcode: barcodeQuery });
    } else {
      fetchData(); // Fetch all if no query is present
    }
  }, [searchQuery, barcodeQuery, fetchData]);

  const columns = [
    { field: 'item', headerName: 'Item' },
    { field: 'code', headerName: 'Código' },
    { field: 'name', headerName: 'Produto' },
    { field: 'quantity', headerName: 'Quantidade' },
    { 
      field: 'unitPrice', 
      headerName: 'Unitário', 
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    { 
      field: 'offerPrice', 
      headerName: 'Oferta', 
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    { 
      field: 'totalPrice', 
      headerName: 'Total', 
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];

  const formattedData = products?.map((product) => ({
    ...product,
    unitPrice: columns.find(col => col.field === 'unitPrice').format(product.unitPrice),
    offerPrice: columns.find(col => col.field === 'offerPrice').format(product.offerPrice),
    totalPrice: columns.find(col => col.field === 'totalPrice').format(product.totalPrice),
  })) || [];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setBarcodeQuery(''); // Clear barcode query when searching by description
  };

  const handleBarcodeChange = (event) => {
    setBarcodeQuery(event.target.value);
    setSearchQuery(''); // Clear search query when searching by barcode
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
      <CustomTable columns={columns} data={formattedData} title="Itens" />
    </Box>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
};

export default ProductList;
