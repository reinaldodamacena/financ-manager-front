import { useState } from 'react';

export const useSales = (useSaleServiceContext) => {
    const { startSale, addSaleDetail, getSaleTotals, removeSaleDetail, fetchSaleDetails } = useSaleServiceContext();
    const [cart, setCart] = useState([]);
    const [currentSaleId, setCurrentSaleId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totals, setTotals] = useState({
        totalGross: 0,
        totalDiscount: 0,
        totalNet: 0,
      });
      

    const handleAddToCart = async (product, customerId, userSale) => {
        console.log("Iniciando processo de adicionar ao carrinho...");
        console.log("Produto recebido:", product);
        console.log("Cliente ID:", customerId);
        console.log("Usuário logado:", userSale);

        try {
            setLoading(true);
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

            console.log("SaleDetail construído:", saleDetail);

            if (!currentSaleId) {
                // Inicia uma nova venda
                console.log("Nenhuma venda em andamento, iniciando nova venda...");
                const sale = await startSale(customerId, 1, parseInt(userSale.userId), saleDetail);
                console.log("Venda iniciada com sucesso. SaleId:", sale.saleId);

                setCurrentSaleId(sale.saleId);

                // Buscar os detalhes da venda após a criação
                const saleDetailsFromDB = await fetchSaleDetails(sale.saleId);
                console.log("Detalhes da venda obtidos do banco de dados:", saleDetailsFromDB);
                setCart(saleDetailsFromDB);  // Atualiza o carrinho com os detalhes da venda

                // Atualizar os totais após adicionar o item
                const saleTotals = await getSaleTotals(sale.saleId);  // Corrigido para usar o sale.saleId
                console.log("Totais atualizados da venda:", saleTotals);
                setTotals(saleTotals);  // Certifique-se de definir os totais corretamente
            }
            else {
                // Adiciona um novo detalhe à venda existente
                console.log("Adicionando novo detalhe à venda existente. SaleId:", currentSaleId);
                await addSaleDetail(currentSaleId, saleDetail);

                // Buscar os detalhes da venda atualizada
                const saleDetailsFromDB = await fetchSaleDetails(currentSaleId);
                console.log("Detalhes atualizados da venda do banco de dados:", saleDetailsFromDB);
                setCart(saleDetailsFromDB);  // Atualiza o carrinho com os detalhes da venda
            }

            // Atualizar os totais após adicionar o item
            const saleTotals = await getSaleTotals(currentSaleId);
            console.log("Totais atualizados da venda:", saleTotals);
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        } finally {
            setLoading(false);
        }
    };



    const handleRemoveFromCart = async (saleDetailId) => {
        try {
          await removeSaleDetail(currentSaleId, saleDetailId);
          
          // Atualiza o carrinho removendo o item
          const updatedCart = cart.filter((item) => item.saleDetailId !== saleDetailId);
          setCart(updatedCart);
          
          // Atualizar os totais logo após remover o item
          await getSaleTotals(currentSaleId);
        } catch (error) {
          console.error('Erro ao remover produto:', error);
        }
      };
      

    // Função para atualizar a quantidade de um item no carrinho
    const updateCartQuantity = (saleDetailId, newQuantity) => {
        const updatedCart = cart.map((item) =>
            item.saleDetailId === saleDetailId ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
    };

    return {
        cart,
        currentSaleId,
        loading,
        totals,
        handleAddToCart,
        handleRemoveFromCart,
        updateCartQuantity, // Adicionar essa função ao retorno
    };
};
