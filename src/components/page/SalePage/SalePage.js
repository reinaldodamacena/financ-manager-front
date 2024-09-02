import React, { useContext, useEffect } from 'react';
import { Grid, Divider } from '@mui/material';
import { Background } from '../../atoms/Index';
import { Layout } from '../../organisms/Index';
import { ClientSection, ProductList, PaymentSection } from '../../molecules/Index';
import { SaleServiceProvider, useSaleServiceContext } from '../../../context/SaleServiceProvider';

const SalesPage = () => {
  const {
    startSale,
    addSaleDetail,
    completeSale,
    saleData,
    loading,
    error,
  } = useSaleServiceContext();

  useEffect(() => {
    // Inicia a venda ao carregar a página
    startSale({
      customerId: 1, // Esse ID pode ser atualizado após a seleção do cliente
      companyId: 1, // Assumindo uma única empresa para simplificação
      createdBy: localStorage.getItem('userId') // ID do usuário logado
    });
  }, [startSale]);

  const handleAddProduct = (product) => {
    addSaleDetail({
      saleId: saleData?.saleId,
      productId: product.productId,
      quantity: 1, // ou um valor selecionado pelo usuário
      discount: 0, // ou um valor calculado
      createdBy: localStorage.getItem('userId'),
    });
  };

  const handleCompleteSale = (paymentMethod) => {
    completeSale({
      saleId: saleData?.saleId,
      paymentMethod,
      updatedBy: localStorage.getItem('userId'),
    });
  };

  return (
    <Background>
      <Layout overflowY="auto">
        <Grid container spacing={4}>
          <Grid item xs={8} md={10}>
            <ClientSection />
          </Grid>
          <Grid item xs={15}>
            <Divider sx={{ borderColor: 'primary.main', marginBottom: 2, width: '100%' }} />
          </Grid>
          <Grid item xs={8} md={8}>
            <ProductList onAddProduct={handleAddProduct} />
          </Grid>
          <Grid item xs={8} md={4}>
            <PaymentSection onCompleteSale={handleCompleteSale} totalAmount={saleData?.totalNetAmount} />
          </Grid>
        </Grid>
      </Layout>
    </Background>
  );
};

export default function SalesPageWrapper() {
  return (
    <SaleServiceProvider>
      <SalesPage />
    </SaleServiceProvider>
  );
}
