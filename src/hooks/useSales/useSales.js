import { useState } from 'react';
import { format } from 'date-fns'; // Para formatar as datas


export const useSales = (useSaleServiceContext) => {
    const {
        startSale,
        addSaleDetail,
        getSaleTotals,
        removeSaleDetail,
        fetchSaleDetails,
        completeSale,
        updateSaleDetail,
        fetchSalesHistory,  // Adiciona a função para buscar o histórico de vendas
        salesHistory,
        adjustDiscountPercentage,  // Função para ajustar percentual de desconto
        adjustNewTotal,            // Função para ajustar o novo total líquido
        adjustTotalDiscount 
    } = useSaleServiceContext();  // Adiciona completeSale


    const [cart, setCart] = useState([]);
    const [currentSaleId, setCurrentSaleId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totals, setTotals] = useState({
        totalGross: 0,
        totalDiscount: 0,
        totalNet: 0,
    });
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');  // Estado para a data de início
    const [endDate, setEndDate] = useState('');      // Estado para a data de fim

    // Função para adicionar um item ao carrinho
    const handleAddToCart = async (product, customerId, userSale, quantity) => {
    console.log("Iniciando processo de adicionar ao carrinho...");
    console.log("Produto recebido:", product);
    console.log("Quantidade recebida:", quantity);
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
            quantity: quantity || 1,  // Use a quantidade recebida
            createdBy: parseInt(userSale.userId),
            discount: 0,
        };

        console.log("SaleDetail construído:", saleDetail);

        let saleId = currentSaleId; // Use uma variável temporária para o saleId

        if (!saleId) {
            // Inicia uma nova venda
            console.log("Nenhuma venda em andamento, iniciando nova venda...");
            const sale = await startSale(customerId, parseInt(userSale.userId), parseInt(userSale.userId), saleDetail);
            console.log("Venda iniciada com sucesso. SaleId:", sale.saleId);

            setCurrentSaleId(sale.saleId);
            saleId = sale.saleId; // Atualize a variável temporária com o novo saleId

            // Buscar os detalhes da venda após a criação
            const saleDetailsFromDB = await fetchSaleDetails(saleId);
            console.log("Detalhes da venda obtidos do banco de dados:", saleDetailsFromDB);
            setCart(saleDetailsFromDB);  // Atualiza o carrinho com os detalhes da venda

            // Atualizar os totais após adicionar o item
            const saleTotals = await getSaleTotals(saleId);  // Corrigido para usar o saleId atualizado
            console.log("Totais atualizados da venda:", saleTotals);
            setTotals(saleTotals);  // Certifique-se de definir os totais corretamente
        } else {
            // Adiciona um novo detalhe à venda existente
            console.log("Adicionando novo detalhe à venda existente. SaleId:", saleId);
            await addSaleDetail(saleId, saleDetail);

            // Buscar os detalhes da venda atualizada
            const saleDetailsFromDB = await fetchSaleDetails(saleId);
            console.log("Detalhes atualizados da venda do banco de dados:", saleDetailsFromDB);
            setCart(saleDetailsFromDB);  // Atualiza o carrinho com os detalhes da venda

            // Atualizar os totais após adicionar o item
            const saleTotals = await getSaleTotals(saleId);
            console.log("Totais atualizados da venda:", saleTotals);
            setTotals(saleTotals);
        }
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        setError(error);
    } finally {
        setLoading(false);
    }
};


    // Função para remover um item do carrinho
    const handleRemoveFromCart = async (saleDetailId) => {
        try {
            await removeSaleDetail(currentSaleId, saleDetailId);

            // Atualiza o carrinho removendo o item
            const updatedCart = cart.filter((item) => item.saleDetailId !== saleDetailId);
            setCart(updatedCart);

            // Atualizar os totais logo após remover o item
            const saleTotals = await getSaleTotals(currentSaleId);
            console.error('Totais atualizados após remover:', saleTotals);
            setTotals(saleTotals);
        } catch (error) {
            console.error('Erro ao remover produto:', error);
            setError(error);
        }
    };



    // Função para completar a venda
    const handleCompleteSale = async (paymentMethod, updatedBy) => {
        try {
            setLoading(true);
            setError(null);
            console.log(`Finalizando venda com SaleId=${currentSaleId}, PaymentMethod=${paymentMethod}`);
            const result = await completeSale(currentSaleId, paymentMethod, updatedBy);
            console.log("Venda finalizada com sucesso:", result);

            // Resetar o carrinho após completar a venda
            setCart([]);
            setCurrentSaleId(null);
            setTotals({
                totalGross: 0,
                totalDiscount: 0,
                totalNet: 0,
            });
        } catch (error) {
            console.error('Erro ao finalizar a venda:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const updateCartDetails = async (saleDetailId, updatedDetail) => {
        try {
            await updateSaleDetail(saleDetailId, updatedDetail);  // Atualiza no backend

            // Atualiza o estado localmente após o retorno do backend
            const updatedCart = cart.map((item) =>
                item.saleDetailId === saleDetailId ? { ...item, ...updatedDetail } : item
            );
            setCart(updatedCart);
            const saleTotals = await getSaleTotals(currentSaleId);
            console.error('Totais atualizados após remover:', saleTotals);
            setTotals(saleTotals);
        } catch (error) {
            console.error('Erro ao atualizar o detalhe da venda:', error);
        }

    };


    // Função para formatar as datas no padrão MM/dd/yyyy
    const formatDate = (date) => {
        return format(new Date(date), 'MM/dd/yyyy');
    };

    // Validação das datas
    const isValidDateRange = startDate && endDate && new Date(startDate) <= new Date(endDate);

    // Função para buscar o histórico de vendas (passada ao SalesFilter)
    const handleFetchSalesHistory = async () => {
        if (!isValidDateRange) {
            setError('A data de início não pode ser maior que a data de fim.');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const formattedStartDate = formatDate(startDate);  // Formatar a data de início
            const formattedEndDate = formatDate(endDate);      // Formatar a data de fim

            const history = await fetchSalesHistory(formattedStartDate, formattedEndDate);  // Chamada da API
            console.log('Histórico de vendas buscado com sucesso:', history);
        } catch (err) {
            console.error('Erro ao buscar histórico de vendas:', err);
            setError('Ocorreu um erro ao buscar o histórico de vendas.');
        } finally {
            setLoading(false);
        }
    };
    // Função para ajustar o percentual de desconto
    const handleAdjustDiscountPercentage = async (saleId, discountPercentage) => {
        try {
            setLoading(true);
            await adjustDiscountPercentage(saleId, discountPercentage);
            const saleTotals = await getSaleTotals(saleId);
            setTotals(saleTotals);
        } catch (err) {
            console.error('Erro ao ajustar percentual de desconto:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Função para ajustar o novo valor total líquido
    const handleAdjustNewTotal = async (saleId, newTotalNetAmount) => {
        try {
            setLoading(true);
            await adjustNewTotal(saleId, newTotalNetAmount);
            const saleTotals = await getSaleTotals(saleId);
            setTotals(saleTotals);
        } catch (err) {
            console.error('Erro ao ajustar o novo total líquido:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Função para ajustar o total de desconto
    const handleAdjustTotalDiscount = async (saleId, totalDiscount) => {
        try {
            setLoading(true);
            await adjustTotalDiscount(saleId, totalDiscount);
            const saleTotals = await getSaleTotals(saleId);
            setTotals(saleTotals);
        } catch (err) {
            console.error('Erro ao ajustar o total de desconto:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };



    return {
        startDate,
        setStartDate,  // Retornar a função para atualizar a data de início
        endDate,
        setEndDate,
        cart,
        currentSaleId,
        loading,
        totals,
        error,
        salesHistory,  // Disponibiliza o histórico de vendas
        handleFetchSalesHistory,
        handleAddToCart,
        handleRemoveFromCart,
        handleCompleteSale,
        updateCartDetails,  // Adiciona a função para completar a venda
        handleAdjustDiscountPercentage,  // Disponibiliza a função de ajuste de percentual de desconto
        handleAdjustNewTotal,            // Disponibiliza a função de ajuste do novo total líquido
        handleAdjustTotalDiscount        // Disponibiliza a função de ajuste do total de desconto
    };
};
