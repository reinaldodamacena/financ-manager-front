import React, { createContext, useContext, useState, useCallback } from 'react';
import { saleService } from '../../api/saleService';

export const SaleServiceContext = createContext();

export const SaleServiceProvider = ({ children }) => {
  const [saleData, setSaleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startSale = async (saleInfo) => {
    setLoading(true);
    setError(null);
    try {
      const result = await saleService.create(saleInfo);
      setSaleData(result.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addSaleDetail = async (saleDetail) => {
    setLoading(true);
    setError(null);
    try {
      const updatedSale = { ...saleData, saleDetails: [...saleData.saleDetails, saleDetail] };
      await saleService.update(updatedSale);
      setSaleData(updatedSale);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const completeSale = async (saleInfo) => {
    setLoading(true);
    setError(null);
    try {
      const result = await saleService.update(saleInfo);
      setSaleData(result.data);
    } catch (err) {
      setError(err);
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
