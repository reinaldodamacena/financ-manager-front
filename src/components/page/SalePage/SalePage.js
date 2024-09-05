import React, { useState } from 'react';
import { Grid, Divider } from '@mui/material';
import { Background } from '../../atoms/Index';
import { Layout } from '../../organisms/Index';
import { ClientSection, ProductList, PaymentSection, CartItem } from '../../molecules/Index';
import { useSaleServiceContext } from '../../../context/Sale/SaleServiceProvider';
import { CompressOutlined } from '@mui/icons-material';

const SalesPage = () => {
  const { startSale, addSaleDetail, completeSale, saleData } = useSaleServiceContext();
  const [cart, setCart] = useState([]);
  const [totals, setTotals] = useState({ totalGross: 0, totalDiscount: 0, totalNet: 0 });
  const [currentSaleId, setCurrentSaleId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

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
      // Prepara o detalhe de venda
      const saleDetail = {
        productId: product.productId,
        manufacturerCode: product.manufacturerCode,
        productDescription: product.description,
        unit: product.unitOfExit,
        unitPrice: product.price,
        quantity: product.quantity || 1,
        createdBy: parseInt(userSale.userId),
        discount: 0, // Pode ajustar o valor conforme necessário
      };
  
      if (!currentSaleId) {
        console.log("Iniciando criação da venda com detalhe de venda...");
  
        // Envia o saleDetail ao iniciar a venda
        const sale = await startSale(customerId, 1, parseInt(userSale.userId), saleDetail);
        
        // Atualiza o SaleId após a venda ser criada
        setCurrentSaleId(sale.saleId);
  
        // Atualiza o saleDetail com o SaleId e adiciona ao carrinho
        const updatedSaleDetail = { ...saleDetail, saleId: sale.saleId }; // Aqui garantimos que o SaleId está presente
        setCart([...cart, updatedSaleDetail]);
  
        console.log("Detalhe de venda adicionado à nova venda:", updatedSaleDetail);
  
      } else {
        // Se a venda já foi criada, apenas adiciona o detalhe
        const updatedSaleDetail = { ...saleDetail, saleId: currentSaleId }; // Garantindo que o SaleId está sendo passado
  
        console.log("Adicionando detalhe à venda existente:", updatedSaleDetail);
  
        await addSaleDetail(updatedSaleDetail);
  
        // Adiciona o saleDetail atualizado com o SaleId ao carrinho
        setCart([...cart, updatedSaleDetail]);
      }
  
      // Atualiza os totais
      setTotals({
        totalGross: totals.totalGross + saleDetail.unitPrice * saleDetail.quantity,
        totalDiscount: totals.totalDiscount + saleDetail.discount,
        totalNet: totals.totalNet + (saleDetail.unitPrice * saleDetail.quantity - saleDetail.discount)
      });
  
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    } finally {
      setLoading(false); // Desativar estado de carregamento
    }
  };
  

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
      setTotals({ totalGross: 0, totalDiscount: 0, totalNet: 0 });
      setCurrentSaleId(null);
      console.log("Venda finalizada com sucesso");
    } catch (error) {
      console.error("Erro ao finalizar a venda:", error);
    } finally {
      setLoading(false); // Desativar estado de carregamento
    }
  };

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
            {cart.map(item => (
              <CartItem
                key={item.productId}
                product={item}
                onQuantityChange={(id, quantity) => {
                  const updatedCart = cart.map(product =>
                    product.productId === id ? { ...product, quantity } : product
                  );
                  setCart(updatedCart);
                }}
                onRemove={(id) => {
                  const updatedCart = cart.filter(product => product.productId !== id);
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
