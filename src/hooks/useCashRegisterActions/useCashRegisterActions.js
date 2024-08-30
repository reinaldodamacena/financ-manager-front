import { useState } from 'react';
import CashRegisterService from '../../api/cashRegisterService';

const useCashRegisterActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abrirCaixa = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await CashRegisterService.abrirCaixa(data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fecharCaixa = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await CashRegisterService.fecharCaixa(data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    abrirCaixa,
    fecharCaixa,
    loading,
    error,
  };
};

export default useCashRegisterActions;
