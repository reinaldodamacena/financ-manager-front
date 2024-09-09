import React, { createContext, useContext, useState, useCallback } from 'react';
import CashRegisterService from '../../api/cashRegisterService';

const CashRegisterContext = createContext();

export const CashRegisterServiceProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função responsável por obter caixas abertos
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await CashRegisterService.obterCaixasAbertos();
      return result;
    } catch (err) {
      setError(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Abertura de caixa
  const abrirCaixa = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      await CashRegisterService.abrirCaixa(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fechamento de caixa
  const fecharCaixa = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      await CashRegisterService.fecharCaixa(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const registrarOperacao = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      await CashRegisterService.registrarOperacao(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CashRegisterContext.Provider
      value={{
        abrirCaixa,
        fecharCaixa,
        registrarOperacao,
        fetchData, // Função para obter caixas abertos
        loading,
        error,
      }}
    >
      {children}
    </CashRegisterContext.Provider>
  );
};

export const useCashRegisterContext = () => {
  const context = useContext(CashRegisterContext);
  if (!context) {
    throw new Error('useCashRegisterContext deve ser usado dentro de um CashRegisterProvider');
  }
  return context;
};
