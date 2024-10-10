import React, { useState } from 'react';
import { Button, Icon, Input } from '../../atoms/Index';
import { Box, CircularProgress } from '@mui/material';
import { SalesList } from '../Index';  // Importa o componente SalesList
import { useSales } from '../../../hooks/useSales/useSales';  // Importar o hook
import { useSaleServiceContext } from '../../../context/Sale/SaleServiceProvider';

const SalesFilter = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleFetchSalesHistory,
    loading,
    salesHistory,  // Aqui está o histórico de vendas filtrado
    error,
  } = useSales(useSaleServiceContext);  // Usar o hook para controlar as datas e a função de filtro

  // Função para editar uma venda
  const handleEditSale = (saleId) => {
    console.log(`Editando venda com ID: ${saleId}`);
    // Lógica de edição da venda aqui
  };

  // Função para excluir uma venda
  const handleDeleteSale = (saleId) => {
    console.log(`Excluindo venda com ID: ${saleId}`);
    // Lógica de exclusão da venda aqui
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '1rem',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 2,
        '@media (max-width: 600px)': {
          padding: '0.75rem',
          gap: '1rem',
        },
      }}
    >
      {/* Inputs de Data */}
      <Input
        label="Data de Início"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}  // Atualiza o estado de data de início
        icon={() => <Icon name="Event" />}
      />
      <Input
        label="Data de Fim"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}  // Atualiza o estado de data de fim
        icon={() => <Icon name="Event" />}
      />

      {/* Exibir mensagem de erro se as datas forem inválidas */}
      {error && (
        <Box
          sx={{
            color: 'error.main',
            fontSize: '0.875rem',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          {error}
        </Box>
      )}

      {/* Botão de Filtrar com spinner */}
      <Button
        variant="primary"
        onClick={handleFetchSalesHistory}  // Chama a função de busca do histórico
        disabled={loading || !startDate || !endDate}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          fontSize: '1rem',
          '&:hover': {
            boxShadow: 3,
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: 'white' }} />
        ) : (
          <>
            <Icon name="Search" /> Filtrar
          </>
        )}
      </Button>

      {/* Exibir a tabela com os resultados filtrados */}
      <Box sx={{ marginTop: '2rem' }}>
        <SalesList
          salesData={salesHistory}  // Passa os dados filtrados de vendas
          onEditSale={handleEditSale}  // Função de edição
          onDeleteSale={handleDeleteSale}  // Função de exclusão
          loading={loading}  // Passa o estado de loading
        />
      </Box>
    </Box>
  );
};

export default SalesFilter;
