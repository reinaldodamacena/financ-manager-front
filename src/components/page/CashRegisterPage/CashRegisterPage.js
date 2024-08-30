import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useCashRegisterContext } from '../../../context/CashRegister/CashRegisterServiceProvider';
import { CashRegisterForm } from '../../molecules/Index';
import { Layout } from 'components/organisms/Index';
import { Button } from '../../atoms/Index';
import {CashRegisterDetails} from '../../molecules/Index';
import  useCashRegisterActions from '../../../hooks/useCashRegisterActions/useCashRegisterActions'; // Importa o novo hook

const CashRegisterPage = () => {
  const { data: caixasAbertos, fetchData: fetchCaixasAbertos } = useCashRegisterContext();
  const { abrirCaixa, fecharCaixa, loading, error } = useCashRegisterActions();
  const [selectedCaixaId, setSelectedCaixaId] = useState(null);

  useEffect(() => {
    fetchCaixasAbertos();  // Chama a função de busca de caixas abertos
  }, [fetchCaixasAbertos]);

  const handleAbrirCaixa = async (data) => {
    try {
      const result = await abrirCaixa(data);
      console.log('Caixa aberto:', result);
      fetchCaixasAbertos();  // Atualiza a lista de caixas abertos
    } catch (err) {
      console.error('Erro ao abrir caixa:', err);
    }
  };

  const handleFecharCaixa = async (caixaId) => {
    try {
      const result = await fecharCaixa({ caixaId });
      console.log('Caixa fechado:', result);
      fetchCaixasAbertos();  // Atualiza a lista de caixas abertos
    } catch (err) {
      console.error('Erro ao fechar caixa:', err);
    }
  };

  const handleVerDetalhes = (id) => {
    setSelectedCaixaId(id);
  };

  if (loading) return <Typography>Carregando...</Typography>;
  if (error) return <Typography>Erro: {error.message}</Typography>;

  return (
    <Layout>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4">Gestão de Caixa</Typography>

        <Box sx={{ marginY: 4 }}>
          <CashRegisterForm onSubmit={handleAbrirCaixa} action="open" />
        </Box>

        {caixasAbertos && caixasAbertos.length > 0 && (
          <Box>
            <Typography variant="h6">Caixas Abertos</Typography>
            {caixasAbertos.map(caixa => (
              <Box key={caixa.CashRegisterId} sx={{ marginY: 2 }}>
                <Typography>ID: {caixa.CashRegisterId}</Typography>
                <Typography>Operador: {caixa.OperatorName}</Typography>
                <Typography>Status: {caixa.Status}</Typography>
                <Button label="Fechar Caixa" onClick={() => handleFecharCaixa(caixa.CashRegisterId)} />
                <Button label="Ver Detalhes" onClick={() => handleVerDetalhes(caixa.CashRegisterId)} />
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
