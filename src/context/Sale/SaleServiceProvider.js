import React, { createContext, useContext, useState } from 'react';
import { saleService } from '../../api/saleService';
import { saleDetailService } from '../../api/saleDetailService';

export const SaleServiceContext = createContext();

export const SaleServiceProvider = ({ children }) => {
  const [saleData, setSaleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
        setTotals({
          totalGross: result.totalGrossAmount || 0,
          totalDiscount: result.totalDiscount || 0,
          totalNet: result.totalNetAmount || 0,
        });
      } else {
        // Resetar caso não haja totais disponíveis
        setTotals({ totalGross: 0, totalDiscount: 0, totalNet: 0 });
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
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
  
      const result = await saleDetailService.updateDetail( sanitizedData);
      console.log("Detalhe de venda atualizado com sucesso:", result);
  
      // Atualiza o estado local com o detalhe atualizado
      const updatedSaleData = {
        ...saleData,
        saleDetails: saleData.saleDetails.map((detail) =>
          detail.saleDetailId === saleDetailId ? { ...detail, ...sanitizedData } : detail
        ),
      };
  
      setSaleData(updatedSaleData);
      return result;
  
    } catch (err) {
      setError(err);
      console.error("Erro ao atualizar detalhe de venda:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  

  
  

  return (
    <SaleServiceContext.Provider
      value={{ saleData, loading, error, fetchSaleDetails, startSale, addSaleDetail, updateSaleDetail ,completeSale, totals, getSaleTotals, removeSaleDetail }}
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
