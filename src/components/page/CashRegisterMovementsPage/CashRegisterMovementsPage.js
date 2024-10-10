import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { CashRegisterOperationForm } from '../../molecules/Index'; // Seu formulário de operação
import { useCashRegister } from '../../../hooks/useCashRegister/useCashRegister';
import { useCashRegisterContext } from '../../../context/CashRegister/CashRegisterServiceProvider';
import { Layout} from '../../organisms/Index';
import { Background } from '../../atoms/Index';

const CashRegisterMovementsPage = () => {
  const {
    caixasAbertos,
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
            <Typography variant="h4">Registro de Movimentações</Typography>
            <CashRegisterOperationForm onSubmit={handleOperationSubmit} />
          </Box>
      </Layout>
    </Background>

  );
};

export default CashRegisterMovementsPage;
