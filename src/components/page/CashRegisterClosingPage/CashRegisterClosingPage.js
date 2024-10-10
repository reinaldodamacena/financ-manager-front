import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useCashRegister } from '../../../hooks/useCashRegister/useCashRegister';
import { useCashRegisterContext } from '../../../context/CashRegister/CashRegisterServiceProvider';

const CashRegisterClosingPage = () => {
  const { caixasAbertos, handleFecharCaixa } = useCashRegister(useCashRegisterContext);
  const [usercash, setUsercash] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUsercash(storedUser ? storedUser : { userId: 1 });
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Fechamento de Caixa</Typography>
      {caixasAbertos.length === 0 ? (
        <Typography>Não há caixas abertos no momento.</Typography>
      ) : (
        caixasAbertos.map((caixa) => (
          <Box key={caixa.cashRegisterId}>
            <Typography>ID do Caixa: {caixa.cashRegisterId}</Typography>
            <Button
              onClick={() => handleFecharCaixa(caixa.cashRegisterId, usercash?.userId || 1)}
              variant="contained"
            >
              Fechar Caixa
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
};

export default CashRegisterClosingPage;
