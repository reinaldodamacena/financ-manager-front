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

  // Função para buscar o relatório detalhado de um caixa específico
  const handleExpandClick = async (cashRegisterId) => {
    if (expandedId === cashRegisterId) {
      // Se o mesmo caixa for clicado novamente, fechar a section
      setExpandedId(null);
      setDetailedReport(null);
    } else {
      try {
        setLoading(true);
        setError(null);
        setExpandedId(cashRegisterId);
        const report = await getCashRegisterReportById(cashRegisterId); // Carregar o relatório
        setDetailedReport(report);
      } catch (error) {
        console.error('Erro ao obter o relatório do caixa:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Carregar caixas abertos e todos os caixas ao montar o componente
  useEffect(() => {
    carregarCaixasAbertos();
    carregarTodosCaixas(); // Carrega todos os caixas (abertos e fechados)
  }, []);

  return {
    caixasAbertos,
    todosCaixas, // Retorna todos os caixas
    selectedCaixaId,
    expandedId,
    detailedReport,
    loading,
    error,
    handleAbrirCaixa,
    handleFecharCaixa,
    handleRegistrarOperacao,
    handleExpandClick, // Adiciona o manipulador de clique para expandir/fechar o relatório
  };
};
