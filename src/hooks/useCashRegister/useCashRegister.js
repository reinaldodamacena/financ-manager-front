import { useState, useEffect } from 'react';

export const useCashRegister = (useCashRegisterContext) => {
  const {
    abrirCaixa,
    fecharCaixa,
    registrarOperacao,
    fetchData, // Carrega caixas abertos
    getAllCashRegisters, // Carrega todos os caixas (abertos e fechados)
    getCashRegisterReportById,
  } = useCashRegisterContext();

  const [caixasAbertos, setCaixasAbertos] = useState([]);
  const [todosCaixas, setTodosCaixas] = useState([]); // Para armazenar todos os caixas (abertos e fechados)
  const [selectedCaixaId, setSelectedCaixaId] = useState(null);
  const [detailedReport, setDetailedReport] = useState(null); // Para armazenar o relatório detalhado
  const [expandedId, setExpandedId] = useState(null); // Para controlar o caixa expandido
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

  // Função para carregar todos os caixas (abertos e fechados)
  const carregarTodosCaixas = async () => {
    try {
      setLoading(true);
      setError(null);
      const caixas = await getAllCashRegisters(); // Obtém todos os caixas
      setTodosCaixas(caixas);
    } catch (error) {
      console.error('Erro ao carregar todos os caixas:', error);
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

                                                          
  // Função para obter o relatório detalhado de um caixa
  const handleExpandClick = async (cashRegisterId) => {
    if (expandedId === cashRegisterId) {
      setExpandedId(null);
      setDetailedReport(null);
    } else {
      try {
        setExpandedId(cashRegisterId);
        const report = await getCashRegisterReportById(cashRegisterId);
        setDetailedReport(report);
      } catch (error) {
        setError(error.message || 'Erro ao obter relatório do caixa.');
      }
    }
  };



  // Carrega caixas ao montar o componente
  useEffect(() => {
    carregarCaixasAbertos();
    carregarTodosCaixas();
  }, []);

  return {
    caixasAbertos,
    todosCaixas,
    selectedCaixaId, // ID do caixa selecionado automaticamente
    expandedId,
    detailedReport,
    loading,  // Usa o estado loading do contexto
    error,  // Inclui o erro da operação, se houver
    handleAbrirCaixa,
    handleFecharCaixa,
    handleRegistrarOperacao,
    handleExpandClick,

  };
};
