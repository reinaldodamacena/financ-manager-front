import React, { useState } from 'react';
import { Grid, Divider, Box } from '@mui/material';
import { Background } from '../../atoms/Index';
import { Layout } from '../../organisms/Index';
import { ClientSection, ProductList, PaymentSection, CartItem } from '../../molecules/Index';
import { useSaleServiceContext } from '../../../context/Sale/SaleServiceProvider';

const SalesPage = () => {
  const { startSale, addSaleDetail, completeSale, getSaleTotals } = useSaleServiceContext();
  const [cart, setCart] = useState([]);
  const [totals, setTotals] = useState({ totalGross: 0, totalDiscount: 0, totalNet: 0 });
  const [currentSaleId, setCurrentSaleId] = useState(null);
  const [customerId, setCustomerId] = useState(null); // Armazena o ID do cliente selecionado

  const handleAddToCart = async (product) => {
    const userSale = JSON.parse(localStorage.getItem('user'));
    console.log("Usuário logado:", userSale);

    if (!userSale || !userSale.userId) {
      console.log("Nenhum ID de usuário encontrado.");
      return;
    }

    if (!customerId) {
      console.log("Nenhum cliente selecionado.");
      return;
    }

    // Verificando se já existe uma venda criada
    if (!currentSaleId) {
      console.log("Nenhuma venda ativa encontrada. Criando nova venda...");
      try {
        const sale = await startSale(customerId, 1, parseInt(userSale.userId)); // Usa o customerId do ClientSection
        console.log("Resposta ao iniciar venda:", sale);  // Log para verificar a resposta
        setCurrentSaleId(sale.saleId);
        console.log("Venda criada com sucesso. ID da venda:", sale.saleId);
      } catch (error) {
        console.error("Erro ao criar a venda:", error);
        return;
      }
    }

    try {
      const saleDetail = {
        productId: product.productId,
        quantity: product.quantity || 1, // Usar a quantidade selecionada
        createdBy: parseInt(userSale.userId),
      };

      console.log("Adicionando produto ao carrinho. Detalhes:", saleDetail);

      // Adicionando o detalhe da venda
      await addSaleDetail(saleDetail);
      console.log("Produto adicionado à venda com sucesso.");

      // Atualizando os totais da venda
      const updatedTotals = await getSaleTotals(currentSaleId);
      setTotals(updatedTotals);
      console.log("Totais atualizados:", updatedTotals);

      // Atualizando o carrinho
      setCart((prevCart) => {
        const existingItem = prevCart.find(item => item.productId === product.productId);
        if (existingItem) {
          return prevCart.map(item =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: product.quantity }];
      });

      console.log("Carrinho atualizado:", cart);
    } catch (error) {
      console.error("Falha ao adicionar o produto ao carrinho:", error);
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
            <ClientSection onClientSelect={setCustomerId} /> {/* Passa o callback para atualizar o cliente */}
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
