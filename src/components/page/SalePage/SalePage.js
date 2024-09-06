import React, { useState } from 'react';
import { Grid, Divider } from '@mui/material';
import { Background } from '../../atoms/Index';
import { Layout } from '../../organisms/Index';
import { ClientSection, ProductList, PaymentSection } from '../../molecules/Index';
import { CartSection } from '../../organisms/Index';
import { useSales } from '../../../hooks/useSales/useSales';
import { useSaleServiceContext } from '../../../context/Sale/SaleServiceProvider';

const SalesPage = () => {
  const { handleAddToCart, handleRemoveFromCart, cart, totals, loading, updateCartQuantity } = useSales(useSaleServiceContext); // Adicionar updateCartQuantity
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
              onAddToCart={(product) => {
                console.log("Produto enviado para o carrinho:", product);
                handleAddToCart(product, customerId, userSale);
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <PaymentSection
              totalGross={totals?.totalGross || 0}
              totalDiscount={totals?.totalDiscount || 0}
              totalNet={totals?.totalNet || 0}
              setPaymentMethod={setPaymentMethod}
              paymentMethod={paymentMethod}
              loading={loading}
            />

          </Grid>
          <CartSection
            cart={cart}  // Certifique-se de passar os dados corretamente
            onQuantityChange={(id, quantity) => {
              console.log(`Alterando quantidade do item com SaleDetailId: ${id} para ${quantity}`);
              const updatedCart = cart.map((item) =>
                item.saleDetailId === id ? { ...item, quantity } : item
              );
              console.log("Carrinho atualizado após mudança de quantidade:", updatedCart);
              setCart(updatedCart);
            }}
            onRemove={(id) => {
              console.log(`Removendo item com SaleDetailId: ${id} do carrinho.`);
              handleRemoveFromCart(id);
            }}
          />
        </Grid>
      </Layout>
    </Background>
  );
};

export default SalesPage;
