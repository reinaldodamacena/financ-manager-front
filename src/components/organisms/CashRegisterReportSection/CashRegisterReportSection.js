import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { CustomTable } from '../../molecules/Index';
import { useCashRegister } from '../../../hooks/useCashRegister/useCashRegister';
import { useCashRegisterContext } from '../../../context/CashRegister/CashRegisterServiceProvider';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const CashRegisterReportSection = () => {
  const {
    caixasAbertos = [], // Garante que seja um array, mesmo que vazio
    allCashRegisters = [], // Dados de todos os caixas (abertos e fechados)
    expandedId,
    detailedReport,
    loading,
    error,
    handleExpandClick,
    carregarCaixasAbertos, // Função para carregar caixas abertos
    carregarTodosCaixas, // Função para carregar todos os caixas
  } = useCashRegister(useCashRegisterContext); // Usando o hook

  // Carregar dados dos caixas quando o componente é montado
  useEffect(() => {
    const fetchCashRegisters = async () => {
      console.log('Carregando caixas abertos...');
      //await carregarCaixasAbertos();
      console.log('Caixas abertos carregados:', caixasAbertos);

      console.log('Carregando todos os caixas (abertos e fechados)...');
     // await carregarTodosCaixas();
      console.log('Todos os caixas carregados:', allCashRegisters);
    };

    fetchCashRegisters();
  }, [caixasAbertos, allCashRegisters]); // Dependências vazias para executar apenas na montagem

  const columns = [
    { field: 'cashRegisterId', headerName: 'ID do Caixa' },
    { field: 'operatorId', headerName: 'ID do Operador' },
    { field: 'openingBalance', headerName: 'Saldo de Abertura' },
    { field: 'closingBalance', headerName: 'Saldo de Fechamento' },
    { field: 'openingDateTime', headerName: 'Abertura', type: 'date' },
    { field: 'closingDateTime', headerName: 'Fechamento', type: 'date' },
    {
      field: 'Detalhar',
      headerName: 'Detalhes',
      renderCell: (params) => (
        <IconButton onClick={() => handleExpandClick(params.row.cashRegisterId)}>
          {expandedId === params.row.cashRegisterId ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      ),
    },
  ];

  const formattedCashRegisters = allCashRegisters.map((register) => ({
    cashRegisterId: register.cashRegisterId,
    operatorId: register.operatorId || 'N/A',
    openingBalance: register.openingBalance.toFixed(2),
    closingBalance: register.closingBalance?.toFixed(2) || 'Aberto',
    openingDateTime: new Date(register.openingDateTime).toLocaleString(),
    closingDateTime: register.closingDateTime ? new Date(register.closingDateTime).toLocaleString() : 'Aberto',
  }));

  if (loading) {
    return <Typography>Carregando caixas...</Typography>;
  }

  if (error) {
    return <Typography>Erro ao carregar os caixas: {error.message}</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Relatórios de Caixa</Typography>

      {formattedCashRegisters.length > 0 ? (
        <CustomTable columns={columns} data={formattedCashRegisters} />
      ) : (
        <Typography>Nenhum caixa encontrado.</Typography>
      )}

      {expandedId && detailedReport && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Relatório Detalhado do Caixa {detailedReport.cashRegisterId}</Typography>
          <Typography>Operador: {detailedReport.operatorName || 'N/A'}</Typography>
          <Typography>Saldo de Abertura: {detailedReport.openingBalance.toFixed(2)}</Typography>
          <Typography>Saldo de Fechamento: {detailedReport.closingBalance?.toFixed(2)}</Typography>
          <Typography>Total de Vendas: {detailedReport.totalSales.toFixed(2)}</Typography>
          <Typography>Recebimentos: {detailedReport.totalReceipts.toFixed(2)}</Typography>
          <Typography>Pagamentos: {detailedReport.totalPayments.toFixed(2)}</Typography>
          <Typography>Retiradas: {detailedReport.totalWithdrawals.toFixed(2)}</Typography>
          <Typography>Abertura: {new Date(detailedReport.openingDateTime).toLocaleString()}</Typography>
          <Typography>Fechamento: {detailedReport.closingDateTime ? new Date(detailedReport.closingDateTime).toLocaleString() : 'Em aberto'}</Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>Operações no Caixa</Typography>
          {detailedReport.operations.map((operation) => (
            <Box key={operation.cashOperationId}>
              <Typography>Operação: {operation.operationType}</Typography>
              <Typography>Quantia: {operation.amount.toFixed(2)}</Typography>
              <Typography>Descrição: {operation.description}</Typography>
              <Typography>Data: {new Date(operation.dateTime).toLocaleString()}</Typography>
            </Box>
          ))}

          <Typography variant="h6" sx={{ mt: 2 }}>Vendas</Typography>
          {detailedReport.sales.map((sale) => (
            <Box key={sale.saleId}>
              <Typography>ID da Venda: {sale.saleId}</Typography>
              <Typography>Cliente: {sale.customerName}</Typography>
              <Typography>Data: {new Date(sale.saleDate).toLocaleString()}</Typography>
              <Typography>Total: {sale.totalNetAmount.toFixed(2)}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CashRegisterReportSection;
