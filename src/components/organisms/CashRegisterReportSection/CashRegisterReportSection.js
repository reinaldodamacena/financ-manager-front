import React, { useState } from 'react';
import { Box, Typography, IconButton, Collapse } from '@mui/material';
import { CustomTable } from '../../molecules/Index';
import {CashRegisterDetails} from '../../molecules/Index'; 
import { useCashRegister } from '../../../hooks/useCashRegister/useCashRegister';
import { useCashRegisterContext } from '../../../context/CashRegister/CashRegisterServiceProvider';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const CashRegisterReportSection = () => {
  const {
    todosCaixas = [], // Dados de todos os caixas (abertos e fechados)
    loading,
    error,
  } = useCashRegister(useCashRegisterContext);

  const [expandedId, setExpandedId] = useState(null); 

  const handleExpandClick = (cashRegisterId) => {
    setExpandedId(expandedId === cashRegisterId ? null : cashRegisterId); 
  };

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

  const formattedCashRegisters = todosCaixas.map((register) => ({
    cashRegisterId: register.cashRegisterId,
    operatorId: register.operatorId || 'N/A',
    openingBalance: register.openingBalance?.toFixed(2) || 'N/A',
    closingBalance: register.closingBalance?.toFixed(2) || 'Aberto',
    openingDateTime: register.openingDateTime ? new Date(register.openingDateTime).toLocaleString() : 'N/A',
    closingDateTime: register.closingDateTime ? new Date(register.closingDateTime).toLocaleString() : 'Aberto',
  }));

  if (loading) {
    return <Typography>Carregando caixas...</Typography>;
  }

  if (error) {
    return <Typography>Erro ao carregar os caixas: {error.message}</Typography>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4">Relatórios de Caixa</Typography>

        {formattedCashRegisters.length > 0 ? (
          <Box>
            <CustomTable columns={columns} data={formattedCashRegisters} />

            {formattedCashRegisters.map((register) => (
              <Collapse in={expandedId === register.cashRegisterId} timeout="auto" unmountOnExit key={register.cashRegisterId}>
                <CashRegisterDetails cashRegisterId={register.cashRegisterId} />
              </Collapse>
            ))}
          </Box>
        ) : (
          <Typography>Nenhum caixa encontrado.</Typography>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default CashRegisterReportSection;
