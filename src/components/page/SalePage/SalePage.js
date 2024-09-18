import React, { useState } from 'react';
import { Grid, Divider, CircularProgress, Typography } from '@mui/material';
import { Background } from '../../atoms/Index';
import { Layout } from '../../organisms/Index';
import { ClientSection, ProductList, PaymentSection } from '../../molecules/Index';
import { CartSection } from '../../organisms/Index';
import { useSales } from '../../../hooks/useSales/useSales';
import { useSaleServiceContext } from '../../../context/Sale/SaleServiceProvider';

const SalesPage = () => {
  const { handleAddToCart, handleRemoveFromCart, cart, totals, loading, updateCartDetails, handleCompleteSale } = useSales(useSaleServiceContext);
  const [customerId, setCustomerId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [saleComplete, setSaleComplete] = useState(false); // Estado para verificar se a venda foi finalizada
  const userSale = JSON.parse(localStorage.getItem('user'));

  // Função para resetar todos os estados e componentes da página
  const resetPage = () => {
    setCustomerId(null);  // Resetar cliente
    setPaymentMethod('');  // Resetar método de pagamento
    setSaleComplete(false);  // Resetar o status da venda
  };

  // Função que será chamada quando a venda for finalizada
  const finalizeSale = async () => {
    await handleCompleteSale(paymentMethod, userSale.userId);
    setSaleComplete(true); // Marca que a venda foi finalizada
    setTimeout(() => {
      resetPage(); // Reseta a página após a venda ser finalizada
    }, 3000); // Aguarda 3 segundos para mostrar o feedback de venda finalizada
  };

  return (
    <Background>
      <Layout>
        <Grid container spacing={4}>
          {/* Feedback visual de venda finalizada */}
          {saleComplete && (
            <Grid item xs={12}>
              <Typography variant="h4" color="success.main" align="center">
                Venda finalizada com sucesso!
              </Typography>
            </Grid>
          )}

          {!saleComplete && (
            <>
              {/* Seção de cliente */}
              <Grid item xs={12}>
                <ClientSection onClientSelect={setCustomerId} />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ borderColor: 'primary.main', marginBottom: 2 }} />
              </Grid>

              {/* Lista de produtos */}
              <Grid item xs={12} md={8}>
                <ProductList
                  onAddToCart={(product, quantity) => {
                    handleAddToCart(product, customerId, userSale, quantity);
                  }}
                />
              </Grid>

              {/* Seção de pagamento */}
              <Grid item xs={12} md={4}>
                <PaymentSection
                  onFinalizeSale={finalizeSale}
                  totalGross={totals?.totalGross || 0}
                  totalDiscount={totals?.totalDiscount || 0}
                  totalNet={totals?.totalNet || 0}
                  setPaymentMethod={setPaymentMethod}
                  paymentMethod={paymentMethod}
                  loading={loading}
                />
              </Grid>

              {/* Seção do carrinho dentro de um Grid */}
              <Grid item xs={12}>
                <CartSection
                  cart={cart}
                  onUpdateDetail={updateCartDetails}
                  onRemove={(saleDetailId) => {
                    handleRemoveFromCart(saleDetailId);
                  }}
                />
              </Grid>
            </>
          )}

          {/* Feedback de loading enquanto a venda está sendo processada */}
          {loading && (
            <Grid item xs={12} display="flex" justifyContent="center">
              <CircularProgress />
            </Grid>
          )}
        </Grid>
      </Layout>
    </Background>
  );
};

export default SalesPage;
