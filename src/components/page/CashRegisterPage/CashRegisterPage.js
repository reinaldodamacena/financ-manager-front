import React, { useCallback, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { CashRegisterForm, CashRegisterDetails } from '../../molecules/Index';
import { Layout } from 'components/organisms/Index';
import { Button } from '../../atoms/Index';
import useCashRegisterActions from '../../../hooks/useCashRegisterActions/useCashRegisterActions';

const CashRegisterPage = () => {
  const {
    data: caixasAbertos,
    loading,
    error,
    abrirCaixa,
    fecharCaixa,
    obterCaixasAbertos
  } = useCashRegisterActions();

  const [selectedCaixaId, setSelectedCaixaId] = useState(null);

  // Fetch open cash registers on component mount
  useEffect(() => {
    console.log('Fetching open cash registers...');
    obterCaixasAbertos();  // Busca a lista de caixas abertos ao carregar a página
  }, [obterCaixasAbertos]);

  // Log loaded open cash registers
  useEffect(() => {
    if (caixasAbertos && caixasAbertos.length > 0) {
      console.log('Caixas abertos carregados:', caixasAbertos);
    }
  }, [caixasAbertos]);

  const handleAbrirCaixa = useCallback(async (data) => {
    try {
      const result = await abrirCaixa(data);
      console.log('Caixa aberto:', result);
      await obterCaixasAbertos(); // Atualiza a lista de caixas abertos
      setSelectedCaixaId(result.cashRegisterId); // Exibe os detalhes do caixa recém-aberto
    } catch (err) {
      console.error('Erro ao abrir caixa:', err);
    }
  }, [abrirCaixa, obterCaixasAbertos]);

  const handleFecharCaixa = useCallback(async (cashRegisterId) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const operatorId = storedUser ? storedUser.userId : null;

      if (!operatorId) {
        throw new Error("Erro: Usuário não autenticado. Por favor, faça login novamente.");
      }

      const result = await fecharCaixa({ cashRegisterId, operatorId }); // Não precisa mais passar closingBalance
      console.log('Caixa fechado:', result);
      await obterCaixasAbertos();
      if (selectedCaixaId === cashRegisterId) setSelectedCaixaId(null);
    } catch (err) {
      console.error('Erro ao fechar caixa:', err);
    }
  }, [fecharCaixa, selectedCaixaId, obterCaixasAbertos]);


  const handleVerDetalhes = (id) => {
    setSelectedCaixaId(id);
  };

  if (loading) return <Typography>Carregando...</Typography>;
  if (error) return <Typography>Erro: {error.message}</Typography>;

  return (
    <Layout>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4">Gestão de Caixa</Typography>

        {!caixasAbertos || caixasAbertos.length === 0 ? (
          <Box sx={{ marginY: 4 }}>
            <CashRegisterForm onSubmit={handleAbrirCaixa} action="open" />
          </Box>
        ) : (
          <Box>
            <Typography variant="h6">Caixas Abertos</Typography>
            {caixasAbertos.map(caixa => (
              <Box key={caixa.cashRegisterId} sx={{ marginY: 2 }}>
                <Typography>ID: {caixa.cashRegisterId}</Typography>
                <Typography>Operador: {caixa.operatorName}</Typography>
                <Typography>Status: {caixa.status}</Typography>
                <Button
                  variant="primary"
                  onClick={() => handleFecharCaixa(caixa.cashRegisterId)}
                  disabled={loading}
                >
                  Fechar Caixa
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleVerDetalhes(caixa.cashRegisterId)}
                  disabled={loading}
                >
                  Ver Detalhes
                </Button>
              </Box>
            ))}
          </Box>
        )}

        {selectedCaixaId && <CashRegisterDetails cashRegisterId={selectedCaixaId} />}
      </Box>
    </Layout>
  );
};

export default CashRegisterPage;
