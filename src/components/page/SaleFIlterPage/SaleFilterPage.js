import React, { useState } from 'react';
import { Background } from '../../atoms/Index';
import { Layout } from '../../organisms/Index';
import { SalesFilter } from '../../molecules/Index';
import { useSales } from '../../../hooks/useSales/useSales';
import { useSaleServiceContext } from '../../../context/Sale/SaleServiceProvider';

const SalesFilterPage = () => {
  const { handleAddToCart, handleRemoveFromCart, cart, totals, loading, updateCartDetails, handleCompleteSale } = useSales(useSaleServiceContext); // Adicionar updateCartQuantity
  const [customerId, setCustomerId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const userSale = JSON.parse(localStorage.getItem('user'));

  return (
    <Background>
      <Layout>
        <SalesFilter/>
      </Layout>
    </Background>
  );
};

export default SalesFilterPage;
