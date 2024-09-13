import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, CircularProgress, Grid, Card, CardContent, Divider, List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails, Badge, Tooltip as MuiTooltip
} from '@mui/material'; // Renomeando o Tooltip do MUI para MuiTooltip
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip, // Renomeando o Tooltip do Chart.js para ChartTooltip
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useCashRegisterContext } from '../../../context/CashRegister/CashRegisterServiceProvider';

// Registrar os elementos do gráfico
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip, // Usando o Tooltip renomeado
  Legend
);

const CashRegisterDetails = ({ cashRegisterId }) => {
  const [report, setReport] = useState(null);
  const { getCashRegisterReportById, loading, error } = useCashRegisterContext();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getCashRegisterReportById(cashRegisterId);
        setReport(data);
      } catch (err) {
        console.error('Erro ao obter o detalhamento do caixa:', err);
      }
    };

    fetchReport();
  }, [cashRegisterId, getCashRegisterReportById]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography>Erro ao carregar dados do caixa: {error.message}</Typography>;
  }

  if (!report) {
    return null;
  }

  // Função para formatar valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL', // ou a moeda que você preferir
    }).format(value);
  };

  // Dados do gráfico de barras para comparar os totais
  const barChartData = {
    labels: ['Vendas', 'Recebimentos', 'Pagamentos', 'Retiradas'],
    datasets: [
      {
        label: 'Totais (em BRL)',
        data: [
          report.totalSales,
          report.totalReceipts,
          report.totalPayments,
          report.totalWithdrawals
        ],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336'],
        borderColor: '#ffffff',
        borderWidth: 1,
      }
    ]
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        {/* Informações principais do Caixa */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Detalhes do Caixa
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">ID do Caixa: <strong>{report.cashRegisterId}</strong></Typography>
              <Typography variant="body1">Operador: <strong>{report.operatorName || 'N/A'}</strong></Typography>
              <Typography variant="body1">Saldo de Abertura: <strong>{formatCurrency(report.openingBalance)}</strong></Typography>
              <Typography variant="body1">Saldo de Fechamento: <strong>{formatCurrency(report.closingBalance)}</strong></Typography>
              <Typography variant="body1">Abertura: {new Date(report.openingDateTime).toLocaleString()}</Typography>
              <Typography variant="body1">Fechamento: {report.closingDateTime ? new Date(report.closingDateTime).toLocaleString() : 'Aberto'}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de Barras Comparativo */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Comparativo de Totais
            </Typography>
            <Bar data={barChartData} />
          </Card>
        </Grid>

        {/* Operações (Accordion) */}
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" gutterBottom>
                Operações
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {report.operations && report.operations.length > 0 ? (
                <List>
                  {report.operations.map((operation) => (
                    <ListItem key={operation.cashOperationId}>
                      <MonetizationOnIcon sx={{ mr: 1 }} />
                      <MuiTooltip title={`Operador: ${operation.operatorName}`} arrow>
                        <ListItemText
                          primary={`Operação: ${operation.operationType}`}
                          secondary={
                            <>
                              Quantia: <Badge badgeContent={formatCurrency(operation.amount)} color={operation.amount > 0 ? 'success' : 'error'} /> <br />
                              Data: {new Date(operation.dateTime).toLocaleString()}<br />
                              Descrição: {operation.description || 'Sem descrição'}
                            </>
                          }
                        />
                      </MuiTooltip>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>Nenhuma operação registrada para este caixa.</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Vendas (Accordion) */}
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" gutterBottom>
                Vendas
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {report.sales && report.sales.length > 0 ? (
                <List>
                  {report.sales.map((sale) => (
                    <ListItem key={sale.saleId}>
                      <ReceiptIcon sx={{ mr: 1 }} />
                      <MuiTooltip title={`ID do Cliente: ${sale.customerId}`} arrow>
                        <ListItemText
                          primary={`ID da Venda: ${sale.saleId}`}
                          secondary={
                            <>
                              Cliente: {sale.customerName || 'N/A'} | Data: {new Date(sale.saleDate).toLocaleString()}<br />
                              Total: <Badge badgeContent={formatCurrency(sale.totalNetAmount)} color="primary" />
                            </>
                          }
                        />
                      </MuiTooltip>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>Nenhuma venda registrada para este caixa.</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CashRegisterDetails;
