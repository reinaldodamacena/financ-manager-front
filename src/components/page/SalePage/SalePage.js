import React from 'react';
import { Grid, Divider } from '@mui/material';
import { Background } from '../../atoms/Index';
import { Layout } from '../../organisms/Index';
import { ClientSection, ProductList, PaymentSection } from '../../molecules/Index';

const SalesPage = () => {
  const salesData = [
    // Dados simulados de vendas
  ];

  return (
    <Background>
      <Layout 
      overflowY= 'auto'
      >
        <Grid container spacing={4}>
          <Grid item xs={8} md={10}>
            <ClientSection />
          </Grid>
          <Grid item xs={15}>
          <Divider sx={{ borderColor: 'primary.main', marginBottom: 2, width: '100%' }} />
          </Grid>
          <Grid item xs={8} md={8}>
            <ProductList data={salesData} />
          </Grid>
          <Grid item xs={8} md={4}>
            <PaymentSection />
          </Grid>
        </Grid>
      </Layout>
    </Background>
  );
};

export default SalesPage;
