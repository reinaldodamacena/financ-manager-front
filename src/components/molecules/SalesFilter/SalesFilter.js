import React, { useState } from 'react';
import { Button, Icon, Input } from '../../atoms/Index';
import { Box, CircularProgress } from '@mui/material';

const SalesFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);  // Estado para controlar o spinner de carregamento
  const [error, setError] = useState(null);  // Estado para armazenar erros de validação de data

  // Validação para garantir que a data de início não seja maior que a de fim
  const isValidDateRange = startDate && endDate && new Date(startDate) <= new Date(endDate);

  const handleFilter = async () => {
    if (!isValidDateRange) {
      setError('A data de início não pode ser maior que a data de fim.');
      return;
    }

    setLoading(true);  // Exibe o spinner durante o carregamento
    setError(null);
    try {
      await onFilter(startDate, endDate);
    } catch (err) {
      console.error('Erro ao filtrar:', err);
      setError('Ocorreu um erro ao filtrar as vendas.');
    } finally {
      setLoading(false);  // Oculta o spinner após o término do filtro
    }
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
        onChange={(e) => setStartDate(e.target.value)}
        icon={() => <Icon name="Event" />}  // Ícone de calendário ao lado do input
      />
      <Input
        label="Data de Fim"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        icon={() => <Icon name="Event" />}  // Ícone de calendário ao lado do input
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
        onClick={handleFilter}
        disabled={loading || !isValidDateRange}
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
    </Box>
  );
};

export default SalesFilter;
