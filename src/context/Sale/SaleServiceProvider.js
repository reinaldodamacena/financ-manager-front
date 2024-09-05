import React, { createContext, useContext, useState } from 'react';
import { saleService } from '../../api/saleService';

export const SaleServiceContext = createContext();

export const SaleServiceProvider = ({ children }) => {
  const [saleData, setSaleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Iniciar uma venda
  const startSale = async (customerId, companyId, createdBy, saleDetail = null) => {
    setLoading(true);
    setError(null);
    try {
      const saleInfo = {
        sale: {
          customerId: customerId || 0,
          companyId: companyId || 0,
          totalGrossAmount: saleDetail ? saleDetail.unitPrice * saleDetail.quantity : 0,
          totalDiscount: saleDetail ? saleDetail.discount : 0,
          totalNetAmount: saleDetail ? (saleDetail.unitPrice * saleDetail.quantity) - saleDetail.discount : 0,
          paymentMethod: "", 
          notes: "",
          isCompleted: false,
          createdBy: createdBy || 0,
          updatedBy: createdBy || 0,
          status: "Pending",
          saleDetails: saleDetail ? [saleDetail] : [] // Se houver um saleDetail, adicioná-lo à venda
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
  


  // Adicionar detalhes da venda
  const addSaleDetail = async (saleId, productId, quantity, createdBy) => {
    setLoading(true);
    setError(null);
    try {
      const saleDetail = {
        productId,
        quantity,
        unitPrice: 0, // Preço unitário do produto, adicione a lógica correta
        totalGrossAmount: 0, // Total bruto do item
        discount: 0, // Desconto aplicado
        totalNetAmount: 0, // Total líquido após desconto
        createdBy: createdBy || 0,
        updatedBy: createdBy || 0,
      };

      const result = await saleService.addDetail(saleDetail);
      setSaleData(result.data);
      return result.data;
    } catch (err) {
      setError(err);
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

  return (
    <SaleServiceContext.Provider
      value={{ saleData, loading, error, startSale, addSaleDetail, completeSale }}
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
