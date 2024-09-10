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

  // Função para obter os relatórios de todos os caixas
  const  getAllCashRegisters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await CashRegisterService.obterTodosOsCaixas(); // Nome ajustado
      console.log(result);
      return result;
    } catch (err) {
      setError(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para obter o relatório de um caixa específico
  const getCashRegisterReportById = useCallback(async (cashRegisterId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await CashRegisterService.obterRelatorioCaixa(cashRegisterId); // Chamada à função da API
      return result;
    } catch (err) {
      setError(err);
      return null;
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

  // Registrar operação
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
        getAllCashRegisters, // Função para obter os relatórios dos caixas
        getCashRegisterReportById, // Função para obter o relatório de um caixa específico
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
