import React, { useState } from 'react';
import { Grid, Divider, Box } from '@mui/material';
import { Background } from '../../atoms/Index';
import { Layout } from '../../organisms/Index';
import { ClientSection, ProductList, PaymentSection, CartItem } from '../../molecules/Index';
import { useSaleServiceContext } from '../../../context/Sale/SaleServiceProvider';

const SalesPage = () => {
  const { createSale, addSaleDetail, completeSale, getSaleTotals } = useSaleServiceContext();
  const [cart, setCart] = useState([]);
  const [totals, setTotals] = useState({ totalGross: 0, totalDiscount: 0, totalNet: 0 });
  const [currentSaleId, setCurrentSaleId] = useState(null);

  const handleAddToCart = async (product) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    if (!currentSaleId) {
      const sale = await createSale(1, 1, parseInt(userId)); // Exemplo de criação de venda
      setCurrentSaleId(sale.saleId);
    }

    try {
      const saleDetail = {
        productId: product.productId,
        quantity: 1,
        createdBy: parseInt(userId),
      };

      await addSaleDetail(currentSaleId, saleDetail);
      
      const updatedTotals = await getSaleTotals(currentSaleId);
      setTotals(updatedTotals);

      setCart((prevCart) => {
        const existingItem = prevCart.find(item => item.productId === product.productId);
        if (existingItem) {
          return prevCart.map(item =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.productId === productId
          ? { ...item, quantity: parseInt(quantity) }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.productId !== productId));
  };

  const handleFinalizeSale = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      await completeSale(currentSaleId, 'paymentMethod', parseInt(userId));
      // Reset cart and totals after successful sale completion
      setCart([]);
      setTotals({ totalGross: 0, totalDiscount: 0, totalNet: 0 });
      setCurrentSaleId(null);
    } catch (error) {
      console.error("Failed to complete sale:", error);
    }
  };

  return (
    <Background>
      <Layout>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <ClientSection />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: 'primary.main', marginBottom: 2 }} />
          </Grid>
          <Grid item xs={12} md={8}>
            <ProductList onAddToCart={handleAddToCart} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PaymentSection 
              totalGross={totals.totalGross} 
              totalDiscount={totals.totalDiscount} 
              totalNet={totals.totalNet} 
              onFinalizeSale={handleFinalizeSale} 
            />
          </Grid>
          <Grid item xs={12}>
            {cart.map(item => (
              <CartItem 
                key={item.productId} 
                product={item} 
                onQuantityChange={handleQuantityChange} 
                onRemove={handleRemoveFromCart} 
              />
            ))}
          </Grid>
        </Grid>
      </Layout>
    </Background>
  );
};

export default SalesPage;
