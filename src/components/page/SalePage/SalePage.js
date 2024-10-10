import React, { useState, useEffect } from 'react';
import { Grid, Divider, CircularProgress, Typography } from '@mui/material';
import { Background } from '../../atoms/Index';
import { Layout } from '../../organisms/Index';
import { ClientSection, ProductList, PaymentSection } from '../../molecules/Index';
import { CartSection } from '../../organisms/Index';
import { useSales } from '../../../hooks/useSales/useSales';
import { useSaleServiceContext } from 'context/Sale/SaleServiceProvider';

const SalesPage = () => {
  const { 
    handleAddToCart, 
    handleRemoveFromCart, 
    cart, 
    totals, 
    loading, 
    updateCartDetails, 
    handleCompleteSale,
    handleAdjustDiscountPercentage,  
    handleAdjustNewTotal,            
    handleAdjustTotalDiscount        
  } = useSales(useSaleServiceContext);  

  const [customerId, setCustomerId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [saleComplete, setSaleComplete] = useState(false); 
  const userSale = JSON.parse(localStorage.getItem('user'));

  // Atualiza os totais sempre que o carrinho ou métodos de pagamento mudam
  useEffect(() => {
    if (cart.length > 0 && totals) {
      console.log("Carrinho atualizado, totais:", totals);
    }
  }, [cart, totals]);

  // Função para resetar todos os estados e componentes da página após finalização
  const resetPage = () => {
    setCustomerId(null);  
    setPaymentMethod('');  
    setSaleComplete(false);  
  };

  // Finaliza a venda e reseta a página após sucesso
  const finalizeSale = async () => {
    if (paymentMethod && customerId) {  // Certifica que os campos essenciais estão preenchidos
      await handleCompleteSale(paymentMethod, userSale.userId);
      setSaleComplete(true);  
      setTimeout(() => {
        resetPage();  
      }, 3000);  
    } else {
      alert("Selecione um método de pagamento e cliente.");
    }
  };

  // Ajusta o percentual de desconto
  const adjustDiscountPercentage = async (discount) => {
    if (cart.length > 0 && cart[0].saleId) {
      console.log("Ajustando desconto no SalesPage:", discount);
      await handleAdjustDiscountPercentage(cart[0].saleId, discount);
    }
  };
  
  const adjustNewTotal = async (newTotalNetAmount) => {
    if (cart.length > 0 && cart[0].saleId) {
      console.log("Ajustando novo total no SalesPage:", newTotalNetAmount);
      await handleAdjustNewTotal(cart[0].saleId, newTotalNetAmount);
    }
  };
  
  const adjustTotalDiscount = async (totalDiscount) => {
    if (cart.length > 0 && cart[0].saleId) {
      console.log("Ajustando total de desconto no SalesPage:", totalDiscount);
      await handleAdjustTotalDiscount(cart[0].saleId, totalDiscount);
    }
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
                  totals={totals}  
                  setPaymentMethod={setPaymentMethod}
                  paymentMethod={paymentMethod}
                  loading={loading}
                  onDiscountChange={adjustDiscountPercentage}  
                  onNewTotalChange={adjustNewTotal}    
                  onTotalDiscountChange={adjustTotalDiscount} 
                />
              </Grid>

              {/* Seção do carrinho */}
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
