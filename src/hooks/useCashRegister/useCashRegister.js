import { useState, useEffect } from 'react';

export const useCashRegister = (useCashRegisterContext) => {
  const { abrirCaixa, fecharCaixa, registrarOperacao, fetchData } = useCashRegisterContext();
  const [caixasAbertos, setCaixasAbertos] = useState([]);
  const [selectedCaixaId, setSelectedCaixaId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para carregar caixas abertos
  const carregarCaixasAbertos = async () => {
    try {
      setLoading(true);
      setError(null);
      const caixas = await fetchData(); // Obtém os caixas abertos
      setCaixasAbertos(caixas);
    } catch (error) {
      console.error('Erro ao carregar caixas abertos:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Função para abrir um novo caixa
  const handleAbrirCaixa = async (openingBalance, operatorId) => {
    try {
      setLoading(true);
      setError(null);
      await abrirCaixa({ openingBalance, operatorId });
      await carregarCaixasAbertos(); // Recarrega os caixas abertos
    } catch (error) {
      console.error('Erro ao abrir o caixa:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Função para fechar o caixa
  const handleFecharCaixa = async (cashRegisterId, operatorId) => {
    try {
      setLoading(true);
      setError(null);
      await fecharCaixa({ cashRegisterId, operatorId });
      await carregarCaixasAbertos(); // Recarrega os caixas abertos
      setSelectedCaixaId(null); // Desseleciona o caixa ao fechar
    } catch (error) {
      console.error('Erro ao fechar o caixa:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Função para registrar uma operação no caixa
  const handleRegistrarOperacao = async (cashRegisterId, amount, description, operationType, operatorId) => {
    try {
      setLoading(true);
      setError(null);
      await registrarOperacao({ cashRegisterId, amount, description, operationType, operatorId });
      await carregarCaixasAbertos(); // Recarrega os caixas abertos
    } catch (error) {
      console.error('Erro ao registrar a operação:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar caixas abertos ao montar o componente
  useEffect(() => {
    carregarCaixasAbertos();
  }, []);

  return {
    caixasAbertos,
    selectedCaixaId,
    loading,
    error,
    handleAbrirCaixa,
    handleFecharCaixa,
    handleRegistrarOperacao,
  };
};
