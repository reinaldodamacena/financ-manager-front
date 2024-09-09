import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useCashRegister } from '../../../hooks/useCashRegister/useCashRegister';
import { useCashRegisterContext } from '../../../context/CashRegister/CashRegisterServiceProvider';
import { Layout } from '../../organisms/Index';
import { Background } from '../../atoms/Index';
import { CashRegisterForm, CashRegisterDetails, CashRegisterOperationForm } from '../../molecules/Index';

const CashRegisterPage = () => {
  const {
    caixasAbertos,
    selectedCaixaId,
    loading,
    error,
    handleAbrirCaixa,
    handleFecharCaixa,
    handleRegistrarOperacao,
  } = useCashRegister(useCashRegisterContext);

  const [usercash, setUsercash] = useState(null);
  const [cashRegisterVigente, setCashRegisterVigente] = useState(null);

  useEffect(() => {
    // Carrega o usuário autenticado uma vez ao montar o componente
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUsercash(storedUser ? storedUser : { userId: 1 }); // Fallback para o operador 1
  }, []);

  useEffect(() => {
    if (caixasAbertos.length > 0) {
      // Se houver caixas abertos, pegue o primeiro caixa como o vigente
      setCashRegisterVigente(caixasAbertos[0].cashRegisterId);
    }
  }, [caixasAbertos]);

  const handleFormSubmit = (data) => {
    handleAbrirCaixa(data.openingBalance, data.operatorId);
  };

  const handleOperationSubmit = (operationData) => {
    // Use o `cashRegisterVigente` como o caixa para registrar a operação
    handleRegistrarOperacao(
      cashRegisterVigente, // Pega o ID do caixa vigente
      operationData.amount,
      operationData.description,
      operationData.operationType,
      usercash?.userId || 1
    );
  };

  return (
    <Background>
      <Layout>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4">Gestão de Caixa</Typography>
          {loading ? (
            <Typography>Carregando...</Typography>
          ) : error ? (
            <Typography>Erro: {error.message}</Typography>
          ) : caixasAbertos.length === 0 ? (
            <CashRegisterForm onSubmit={handleFormSubmit} action="open" />
          ) : (
            caixasAbertos.map((caixa) => (
              <Box key={caixa.cashRegisterId}>
                <Typography>ID do Caixa: {caixa.cashRegisterId}</Typography>
                <Typography>Operador: {caixa.operatorId}</Typography>
                <Button
                  onClick={() => handleFecharCaixa(caixa.cashRegisterId, usercash?.userId || 1)}
                  sx={{ marginRight: 2 }}
                >
                  Fechar Caixa
                </Button>

                {/* Formulário para registrar operação */}
                <CashRegisterOperationForm
                  cashRegisterId={caixa.cashRegisterId} // Passa o ID do caixa selecionado
                  onSubmit={handleOperationSubmit} // Função para registrar a operação
                />
              </Box>
            ))
          )}

          {/* Exibir detalhes do caixa se houver um selecionado */}
          {selectedCaixaId && <CashRegisterDetails cashRegisterId={selectedCaixaId} />}
        </Box>
      </Layout>
    </Background>
  );
};

export default CashRegisterPage;
