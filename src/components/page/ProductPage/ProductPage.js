import React, { useState } from 'react';
import { Grid, Divider, Box } from '@mui/material';
import { Background, Button, Icon } from '../../atoms/Index';
import { Layout } from '../../organisms/Index';
import { ProductForm, ProductList } from '../../molecules/Index';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddProduct = () => {
    setEditingProduct({ name: '', code: '', price: '', setName, setCode, setPrice });
    setIsFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product, setName, setCode, setPrice });
    setIsFormOpen(true);
  };

  const handleSaveProduct = () => {
    if (editingProduct.id) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    } else {
      setProducts([...products, { ...editingProduct, id: Date.now() }]);
    }
    setIsFormOpen(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const setName = (name) => setEditingProduct(prev => ({ ...prev, name }));
  const setCode = (code) => setEditingProduct(prev => ({ ...prev, code }));
  const setPrice = (price) => setEditingProduct(prev => ({ ...prev, price }));

  return (
    <Background>
      <Layout overflowY='auto'>
        <Box sx={{ padding: '2rem', backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                endIcon={<Icon name="AddCircle" />}
                sx={{
                  marginBottom: 2,
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                }}
                onClick={handleAddProduct}
              >
                Adicionar Produto
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ borderColor: 'primary.main', marginBottom: 2, width: '100%' }} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <ProductList 
                    products={products} 
                    onEdit={handleEditProduct} 
                    onDelete={handleDeleteProduct} 
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  {isFormOpen && (
                    <ProductForm 
                      product={editingProduct} 
                      onSave={handleSaveProduct} 
                      onCancel={() => setIsFormOpen(false)} 
                      open={isFormOpen}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </Background>
  );
};

export default ProductPage;
