import React from 'react';
import { Grid, Divider } from '@mui/material';
import { Background } from '../../atoms/Index';
import { Layout } from '../../organisms/Index';
import { ClientSection, ProductList, SummaryCard } from '../../molecules/Index';

const SalesPage = () => {
  const salesData = [
    // Dados simulados de vendas
  ];

  return (
    <Background>
      <Layout>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <ClientSection />
          </Grid>
          {/* Divider between ClientSection and ProductList */}
          <Grid item xs={8}>
            <Divider />
          </Grid>
          <Grid item xs={8} md={8}>
            <ProductList data={salesData} />
          </Grid>
          {/* Divider between ProductList and SummaryCard */}
          <Grid item xs={8} md={4}>
            <Divider  />
            <SummaryCard total={634.66} paymentOptions={["Dinheiro", "Cartão"]} />
          </Grid>
        </Grid>
      </Layout>
    </Background>
  );
};

export default SalesPage;
