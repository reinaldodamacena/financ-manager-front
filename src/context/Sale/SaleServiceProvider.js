import React, { createContext, useContext, useState } from 'react';
import { saleService } from '../../api/saleService';
import { saleDetailService } from '../../api/saleDetailService';

export const SaleServiceContext = createContext();

export const SaleServiceProvider = ({ children }) => {
  const [saleData, setSaleData] = useState({
    saleDetails: []  // Inicialize como array vazio para evitar erros
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [salesHistory, setSalesHistory] = useState([]);
  const [totals, setTotals] = useState({
    totalGross: 0,
    totalDiscount: 0,
    totalNet: 0,
  })

  // Iniciar uma venda
  const startSale = async (customerId, companyId, createdBy, saleDetail = null) => {
    setLoading(true);
    setError(null);
    try {
      const saleInfo = {
        sale: {
          customerId: customerId || 0,
          companyId: companyId || 0,
          paymentMethod: "",
          notes: "",
          isCompleted: false,
          createdBy: createdBy || 0,
          updatedBy: createdBy || 0,
          status: "Pending",
          // Se houver um saleDetail, adicioná-lo à venda; caso contrário, um array vazio
          saleDetails: saleDetail ? [saleDetail] : []
        }
      };

      console.log("Criando venda com os seguintes detalhes:", saleInfo); // Log para depurar

      const result = await saleService.start(saleInfo);
      console.log("Venda criada com sucesso:", result.data); // Verificar a resposta do servidor
      setSaleData(result.data);
      return result.data;
    } catch (err) {
      setError(err);
      console.error("Erro ao iniciar a venda:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // Adicionar detalhes à venda existente
  const addSaleDetail = async (saleId, saleDetail) => {
    setLoading(true);
    setError(null);
    try {
      // Estrutura semelhante à do startSale, porém focada nos detalhes da venda
      const saleDetailInfo = {
        sale: {
          saleId: saleId, // Utilizamos o saleId existente
          saleDetails: [saleDetail] // Enviamos o detalhe de venda como um array
        }
      };

      console.log("Enviando detalhe de venda:", saleDetailInfo); // Verificação de dados

      const result = await saleDetailService.addDetail(saleDetailInfo);
      console.log("Detalhe de venda adicionado com sucesso:", result.data); // Verificar a resposta do servidor

      setSaleData(result.data);
      return result.data;
    } catch (err) {
      setError(err);
      console.error("Erro ao adicionar detalhe de venda:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  // Completar a venda
  const completeSale = async (saleId, paymentMethod, updatedBy) => {
    setLoading(true);
    setError(null);
    try {
      const saleCompletionInfo = {
        saleId,
        paymentMethod,
        updatedBy
      };
      const result = await saleService.complete(saleCompletionInfo);
      setSaleData(result.data);
      return result.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // Função para buscar os totais da venda
  const getSaleTotals = async (saleId) => {
    try {
      setLoading(true);
      const result = await saleService.getSaleTotals(saleId);
      if (result) {
        const totals = {
          totalGross: result.totalGrossAmount || 0,
          totalDiscount: result.totalDiscount || 0,
          totalNet: result.totalNetAmount || 0,
        };
  
        console.log("Atualizando os totais com os seguintes valores:", totals);
        setTotals(totals);  // Atualiza o estado com os valores recebidos
        return totals;  // Retorna os totais para serem utilizados onde necessário
      } else {
        console.error("Erro: Totais retornados são indefinidos");
        setTotals({ totalGross: 0, totalDiscount: 0, totalNet: 0 });
        return { totalGross: 0, totalDiscount: 0, totalNet: 0 };
      }
    } catch (err) {
      setError(err);
      console.error("Erro ao buscar os totais da venda:", err);
      return undefined;  // Retorna undefined explicitamente se houver erro
    } finally {
      setLoading(false);
      console.log("Finalizando o processo de busca dos totais.");
    }
  };
  
  



  // Remover um detalhe de venda
  const removeSaleDetail = async (saleId, saleDetailId) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Removendo SaleDetail com saleId=${saleId} e saleDetailId=${saleDetailId}`); // Log para verificar os parâmetros enviados
      await saleDetailService.removeDetail(saleId, saleDetailId); // Verifica se os IDs estão sendo passados corretamente
      const updatedSaleData = {
        ...saleData,
        saleDetails: saleData.saleDetails.filter((detail) => detail.saleDetailId !== saleDetailId),
      };
      console.log("Atualizando SaleData após remoção:", updatedSaleData); // Log para verificar o estado atualizado
      setSaleData(updatedSaleData);
    } catch (err) {
      console.error("Erro ao remover detalhe de venda:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSaleDetails = async (saleId) => {
    try {
      console.log(`Buscando detalhes da venda para SaleId: ${saleId}`);  // Log SaleId
      const response = await saleDetailService.getSaleDetails(saleId);
      console.log("Resposta completa do backend ao buscar detalhes da venda:", response);  // Log do conteúdo completo retornado
      return response.saleDetails || [];  // Certifique-se de retornar apenas `saleDetails`
    } catch (error) {
      console.error("Erro ao buscar detalhes da venda:", error);
      return [];
    }
  };
  // Função para buscar o histórico de vendas
  const fetchSalesHistory = async (startDate, endDate) => {
    setLoading(true);
    setError(null);
    try {
      const sales = await saleService.getSalesHistory(startDate, endDate);
      setSalesHistory(sales);  // Atualiza o estado com o histórico de vendas recebido
      return sales;
    } catch (err) {
      setError(err);
      console.error("Erro ao buscar o histórico de vendas:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // No SaleServiceProvider
  const updateSaleDetail = async (saleDetailId, updatedData) => {
    setLoading(true);
    setError(null);

    try {
      // Remover campos que não precisam ser enviados à API
      const sanitizedData = {
        saleDetailDto: {
          saleDetailId,
          saleId: updatedData.saleId,
          productId: updatedData.productId,
          manufacturerCode: updatedData.manufacturerCode,
          productDescription: updatedData.productDescription,
          quantity: updatedData.quantity,
          unit: updatedData.unit,
          unitPrice: updatedData.unitPrice,
          discount: updatedData.discount
        }
      };

      console.log(`Atualizando SaleDetail com saleDetailId=${saleDetailId} com dados:`, sanitizedData);

      const result = await saleDetailService.updateDetail(sanitizedData);

      // Verifique se saleDetails existe e é um array antes de mapear
      if (saleData && Array.isArray(saleData.saleDetails)) {
        // Atualiza o estado local com o detalhe atualizado
        const updatedSaleData = {
          ...saleData,
          saleDetails: saleData.saleDetails.map((detail) =>
            detail.saleDetailId === saleDetailId ? { ...detail, ...sanitizedData.saleDetailDto } : detail
          ),
        };

        setSaleData(updatedSaleData);
      } else {
        console.error("Erro: saleDetails está indefinido ou não é um array.");
        // Aqui, você pode tomar uma ação corretiva, como re-inicializar saleDetails
        setSaleData({
          ...saleData,
          saleDetails: []  // Inicialize como array vazio
        });
      }

      return result;

    } catch (err) {
      setError(err);
      console.error("Erro ao atualizar detalhe de venda:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // **Novo método para ajustar o percentual de desconto**
  const adjustDiscountPercentage = async (saleId, discountPercentage) => {
    try {
      setLoading(true);
      const result = await saleService.adjustDiscountPercentage(saleId, discountPercentage);
      setSaleData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // **Novo método para ajustar o novo total líquido**
  const adjustNewTotal = async (saleId, newTotalNetAmount) => {
    try {
      setLoading(true);
      const result = await saleService.adjustNewTotal(saleId, newTotalNetAmount);
      setSaleData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // **Novo método para ajustar o total de desconto**
  const adjustTotalDiscount = async (saleId, totalDiscount) => {
    try {
      setLoading(true);
      const result = await saleService.adjustTotalDiscount(saleId, totalDiscount);
      setSaleData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SaleServiceContext.Provider
      value={{
        saleData,
        loading,
        error,
        salesHistory, // Disponibiliza o histórico de vendas no contexto
        totals,
        fetchSaleDetails,
        startSale,
        addSaleDetail,
        updateSaleDetail,
        completeSale,
        getSaleTotals,
        fetchSalesHistory,  // Disponibiliza a função de busca no contexto 
        removeSaleDetail,
        adjustDiscountPercentage,  // Disponibiliza o ajuste de percentual de desconto
        adjustNewTotal,            // Disponibiliza o ajuste do novo total líquido
        adjustTotalDiscount        // Disponibiliza o ajuste do total de desconto
      }}
    >
      {children}
    </SaleServiceContext.Provider>
  );
};

export const useSaleServiceContext = () => {
  const context = useContext(SaleServiceContext);
  if (!context) {
    throw new Error('useSaleServiceContext deve ser usado dentro de um SaleServiceProvider');
  }
  return context;
};
