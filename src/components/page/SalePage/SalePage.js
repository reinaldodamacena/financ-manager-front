import React, { useState, useEffect } from 'react';
import { Grid, Divider } from '@mui/material';
import { Background } from '../../atoms/Index';
import { Layout } from '../../organisms/Index';
import { ClientSection, ProductList, PaymentSection, CartItem } from '../../molecules/Index';
import { useSaleServiceContext } from '../../../context/Sale/SaleServiceProvider';

const SalesPage = () => {
  const { startSale, addSaleDetail, completeSale, getSaleTotals, removeSaleDetail, totals } = useSaleServiceContext();
  const [cart, setCart] = useState([]);
  const [currentSaleId, setCurrentSaleId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para adicionar ao carrinho
  const handleAddToCart = async (product) => {
    const userSale = JSON.parse(localStorage.getItem('user'));

    if (!userSale || !userSale.userId) {
      console.log("Nenhum ID de usuário encontrado.");
      return;
    }

    if (!customerId) {
      console.log("Nenhum cliente selecionado.");
      return;
    }

    setLoading(true); // Ativar estado de carregamento
    try {
      const saleDetail = {
        productId: product.productId,
        manufacturerCode: product.manufacturerCode,
        productDescription: product.description,
        unit: product.unitOfExit,
        unitPrice: product.price,
        quantity: product.quantity || 1,
        createdBy: parseInt(userSale.userId),
        discount: 0,
      };

      console.log("Adicionando ao carrinho:", saleDetail);

      if (!currentSaleId) {
        const sale = await startSale(customerId, 12, parseInt(userSale.userId), saleDetail);
        console.log("Venda iniciada com SaleId:", sale.saleId);
        setCurrentSaleId(sale.saleId);

        // Atualiza o carrinho com o primeiro item
        setCart([saleDetail]);
      } else {
        const updatedSaleDetail = { ...saleDetail, saleId: currentSaleId };
        await addSaleDetail(currentSaleId, updatedSaleDetail);
        console.log("Detalhe de venda adicionado:", updatedSaleDetail);

        // Atualiza o carrinho
        setCart([...cart, updatedSaleDetail]);
      }

      // Atualiza os totais imediatamente após adicionar um item
      await getSaleTotals(currentSaleId);
      console.log("Totais atualizados após adição de item.");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    } finally {
      setLoading(false); // Desativar estado de carregamento
    }
  };

  // Função para remover do carrinho
  const handleRemoveFromCart = async (saleDetailId) => {
    console.log("Tentando remover saleDetailId:", saleDetailId);
    try {
      await removeSaleDetail(currentSaleId, saleDetailId);
      const updatedCart = cart.filter((item) => item.saleDetailId !== saleDetailId);
      console.log("Carrinho atualizado após remoção:", updatedCart);

      // Se o carrinho ficar vazio, reseta também os totais
      if (updatedCart.length === 0) {
        setCart([]);
        setCurrentSaleId(null);
      } else {
        setCart(updatedCart);
      }

      // Atualiza os totais imediatamente após remover um item
      await getSaleTotals(currentSaleId);
      console.log("Totais atualizados após remoção de item.");
    } catch (error) {
      console.error("Erro ao remover o produto:", error);
    }
  };

  // Função para finalizar a venda
  const handleFinalizeSale = async () => {
    const userSale = JSON.parse(localStorage.getItem('user'));
    if (!userSale || !userSale.userId) {
      console.log("Nenhum usuário logado.");
      return;
    }

    setLoading(true); // Ativar estado de carregamento
    try {
      await completeSale(currentSaleId, paymentMethod, parseInt(userSale.userId));
      setCart([]);
      setCurrentSaleId(null);
      console.log("Venda finalizada com sucesso");
    } catch (error) {
      console.error("Erro ao finalizar a venda:", error);
    } finally {
      setLoading(false); // Desativar estado de carregamento
    }
  };

  // Verifica se o carrinho está vazio e reseta os totais no PaymentSection
  useEffect(() => {
    const fetchTotalsIfNeeded = async () => {
      if (cart.length === 0 && currentSaleId !== null) {
        console.log("Carrinho vazio, resetando totais.");

        // Reseta os totais quando o carrinho estiver vazio e o saleId é diferente de null
        await getSaleTotals(null);

        // Só redefine o carrinho e o SaleId se necessário
        if (currentSaleId !== null) {
          setCurrentSaleId(null);
        }
      }
    };

    fetchTotalsIfNeeded();
  }, [cart, currentSaleId]); // Certifique-se de que o useEffect dependa também de currentSaleId



  return (
    <Background>
      <Layout>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <ClientSection onClientSelect={setCustomerId} />
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
              setPaymentMethod={setPaymentMethod}
              paymentMethod={paymentMethod}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12}>
            {cart.map((saleDetail) => (
              <CartItem
                key={saleDetail.saleDetailId}  // Use um identificador único, como saleDetailId
                saleDetail={saleDetail}        // Passe o saleDetail correto
                onQuantityChange={(id, quantity) => {
                  const updatedCart = cart.map((item) =>
                    item.saleDetailId === id ? { ...item, quantity } : item
                  );
                  setCart(updatedCart);
                }}
                onRemove={(id) => {
                  const updatedCart = cart.filter(item => item.saleDetailId !== id);
                  setCart(updatedCart);
                }}
              />
            ))}
          </Grid>

        </Grid>
      </Layout>
    </Background>
  );
};

export default SalesPage;
