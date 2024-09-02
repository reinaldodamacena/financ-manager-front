import { useState, useCallback } from 'react';
import CashRegisterService from '../../api/cashRegisterService';

const useCashRegisterActions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (fetchFunction, params = null) => {
    setLoading(true);
    setError(null);
    try {
      const result = await (params ? fetchFunction(params) : fetchFunction());
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const abrirCaixa = useCallback(async (data) => {
    return await fetchData(CashRegisterService.abrirCaixa, data);
  }, [fetchData]);

  const fecharCaixa = useCallback(async (data) => {
    return await fetchData(CashRegisterService.fecharCaixa, data);
  }, [fetchData]);

  const obterCaixaPorId = useCallback(async (id) => {
    return await fetchData(CashRegisterService.obterCaixaPorId, id);
  }, [fetchData]);

  const obterAuditoriasPorCaixaId = useCallback(async (id) => {
    return await fetchData(CashRegisterService.obterAuditoriasPorCaixaId, id);
  }, [fetchData]);

  const obterCaixasAbertos = useCallback(async () => {
    return await fetchData(CashRegisterService.obterCaixasAbertos);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    abrirCaixa,
    fecharCaixa,
    obterCaixaPorId,
    obterAuditoriasPorCaixaId,
    obterCaixasAbertos,
  };
};

export default useCashRegisterActions;
