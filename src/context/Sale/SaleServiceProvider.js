import React, { createContext, useContext, useState } from 'react';
import { saleService } from '../../api/saleService';

export const SaleServiceContext = createContext();

export const SaleServiceProvider = ({ children }) => {
  const [saleData, setSaleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startSale = async (customerId, companyId, createdBy) => {
    console.log("Iniciando venda com os dados:", { customerId, companyId, createdBy });
    setLoading(true);
    setError(null);
    try {
      const saleInfo = {
        customerId: customerId || 0,
        companyId: companyId || 0,
        createdBy: createdBy || 0,
      };
  
      const result = await saleService.start(saleInfo);
      console.log("Resposta do servidor ao iniciar venda:", result);  // Log para verificar a resposta do servidor
      setSaleData(result.data);
      return result.data;
    } catch (err) {
      setError(err);
      console.error("Erro ao iniciar venda:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  

  const addSaleDetail = async (saleDetail) => {
    setLoading(true);
    setError(null);
    try {
      const result = await saleService.addDetail(saleDetail); // Use 'addDetail' do saleService
      setSaleData(result.data);
      return result.data;
    } catch (err) {
      setError(err);
      throw err; // Propaga o erro para o componente chamador
    } finally {
      setLoading(false);
    }
  };

  const completeSale = async (saleInfo) => {
    setLoading(true);
    setError(null);
    try {
      const result = await saleService.complete(saleInfo); // Use 'complete' do saleService
      setSaleData(result.data);
      return result.data;
    } catch (err) {
      setError(err);
      throw err; // Propaga o erro para o componente chamador
    } finally {
      setLoading(false);
    }
  };

  return (
    <SaleServiceContext.Provider value={{ saleData, loading, error, startSale, addSaleDetail, completeSale }}>
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
