import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useCashRegister } from '../../../hooks/useCashRegister/useCashRegister';
import { useCashRegisterContext } from '../../../context/CashRegister/CashRegisterServiceProvider';
import { Layout, CashRegisterReportSection} from '../../organisms/Index';
import { Background } from '../../atoms/Index';
import { CashRegisterForm, CashRegisterDetails,  } from '../../molecules/Index';

const CashRegisterPage = () => {
  const {
    caixasAbertos,
    selectedCaixaId,
    loading,
    error,
    handleAbrirCaixa,
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
              </Box>
            ))
          )}
          <CashRegisterReportSection />
          {/* Exibir detalhes do caixa se houver um selecionado */}
          {selectedCaixaId && <CashRegisterDetails cashRegisterId={selectedCaixaId} />}
        </Box>
      </Layout>
    </Background>
  );
};

export default CashRegisterPage;
