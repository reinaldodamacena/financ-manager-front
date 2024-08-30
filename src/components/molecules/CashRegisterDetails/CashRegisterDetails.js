import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useCashRegisterContext } from '../../../context/CashRegister/CashRegisterServiceProvider';
import { CustomTable } from '../../molecules/Index';

const CashRegisterDetails = ({ cashRegisterId }) => {
  const [detalhes, setDetalhes] = useState([]);
  const { obterDetalhamentoCaixa } = useCashRegisterContext();

  useEffect(() => {
    const fetchDetalhes = async () => {
      try {
        const data = await obterDetalhamentoCaixa(cashRegisterId);
        setDetalhes(data);
      } catch (err) {
        console.error('Erro ao obter o detalhamento do caixa:', err);
      }
    };

    fetchDetalhes();
  }, [cashRegisterId, obterDetalhamentoCaixa]);

  const columns = [
    { field: 'Operation', headerName: 'Operação', align: 'center' },
    { field: 'DateTime', headerName: 'Data e Hora', align: 'center' },
    { field: 'Amount', headerName: 'Quantia', align: 'right' },
    { field: 'OperatorName', headerName: 'Operador', align: 'center' },
    { field: 'AuditId', headerName: 'ID da Auditoria', align: 'center' },
  ];

  const formattedData = detalhes.map((detalhe) => ({
    Operation: detalhe.Operation,
    DateTime: new Date(detalhe.DateTime).toLocaleString(),
    Amount: detalhe.Amount.toFixed(2),
    OperatorName: detalhe.OperatorName,
    AuditId: detalhe.AuditId,
  }));

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5">Detalhamento do Caixa ID: {cashRegisterId}</Typography>
      {formattedData.length === 0 ? (
        <Typography>Nenhuma operação registrada para este caixa.</Typography>
      ) : (
        <CustomTable columns={columns} data={formattedData} />
      )}
    </Box>
  );
};

export default CashRegisterDetails;
