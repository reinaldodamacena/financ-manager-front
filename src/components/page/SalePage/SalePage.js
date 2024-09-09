import React, { useState } from 'react';
import { Grid, Divider } from '@mui/material';
import { Background } from '../../atoms/Index';
import { Layout } from '../../organisms/Index';
import { ClientSection, ProductList, PaymentSection } from '../../molecules/Index';
import { CartSection } from '../../organisms/Index';
import { useSales } from '../../../hooks/useSales/useSales';
import { useSaleServiceContext } from '../../../context/Sale/SaleServiceProvider';

const SalesPage = () => {
  const { handleAddToCart, handleRemoveFromCart, cart, totals, loading, updateCartDetails, handleCompleteSale } = useSales(useSaleServiceContext); // Adicionar updateCartQuantity
  const [customerId, setCustomerId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const userSale = JSON.parse(localStorage.getItem('user'));

  return (
    <Background>
      <Layout>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ClientSection onClientSelect={setCustomerId} />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: 'primary.main', marginBottom: 2 }} />
          </Grid>
          <Grid item xs={12} md={8}>
            <ProductList
              onAddToCart={(product, quantity) => {
                console.log("Produto enviado para o carrinho:", product);
                console.log("Quantidade enviada para o carrinho:", quantity);  // Verifique se a quantidade está sendo passada corretamente
                handleAddToCart(product, customerId, userSale, quantity);  // Passa a quantidade corretamente
              }}
            />

          </Grid>
          <Grid item xs={12} md={4}>
            <PaymentSection
              onFinalizeSale={() => handleCompleteSale(paymentMethod, userSale.userId)}
              totalGross={totals?.totalGross || 0}
              totalDiscount={totals?.totalDiscount || 0}
              totalNet={totals?.totalNet || 0}
              setPaymentMethod={setPaymentMethod}
              paymentMethod={paymentMethod}
              loading={loading}
            />

          </Grid>
          <CartSection
            cart={cart}
            onUpdateDetail={updateCartDetails}  // Função para atualizar os detalhes do item no carrinho
            onRemove={(saleDetailId) => {
              console.log(`Removendo item com SaleDetailId: ${saleDetailId}`);
              handleRemoveFromCart(saleDetailId);  // Função que remove o item do carrinho
            }}
          />

        </Grid>
      </Layout>
    </Background>
  );
};

export default SalesPage;
