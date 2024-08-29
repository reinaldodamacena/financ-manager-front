import React from 'react';
import { Grid} from '@mui/material';
import { ProductForm } from '../../molecules/Index';
import { Layout } from '../../organisms/Index';
import { ProductServiceProvider, useEnhancedProductService } from '../../../context/Product/ProductServiceProvider';
import { ConfigurableBox, Background } from '../../atoms/Index';

const ProductRegistrationPage = () => {
  const { data: productData } = useEnhancedProductService(); // Opcional: pode ser usado para preencher o formulário com dados existentes, se necessário

  return (
    <ProductServiceProvider>
      <Background>
        <Layout overflowY='auto'>
          <Grid container spacing={4}>
            <Grid item xs={12}>
                <ProductForm
                  product={productData?.product || {}}
                  priceFormation={productData?.priceFormation || {}}
                />           
            </Grid>
          </Grid>
        </Layout>
      </Background>
    </ProductServiceProvider>
  );
};

export default ProductRegistrationPage;
