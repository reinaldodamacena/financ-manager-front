import React from 'react';
import { Box } from '@mui/material';
import CalendarDay from './CalendarDay';

const CalendarBody = ({ days = [], startDate, endDate, onDateSelect, dayInfo }) => {
  // Verificação se o array de days está definido e não vazio
  if (!days || days.length === 0) {
    return <Box>Sem dias disponíveis para exibir.</Box>;
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
      {days.map((day) => {
        const isStart = startDate && new Date(startDate).toDateString() === day.toDateString();
        const isEnd = endDate && new Date(endDate).toDateString() === day.toDateString();
        const isInRange = startDate && endDate && day >= new Date(startDate) && day <= new Date(endDate);

        // Pega as informações do dia específico de dayInfo
        const formattedDate = day.toISOString().split('T')[0]; // Formata a data como 'YYYY-MM-DD'
        const info = dayInfo[formattedDate] || {}; // Busca as informações de vendas ou faturamento para o dia

        return (
          <CalendarDay
            key={day.toDateString()}
            day={day}
            isStart={isStart}
            isEnd={isEnd}
            isInRange={isInRange}
            info={info} // Passa info com dados específicos do dia
            onDateSelect={onDateSelect}
          />
        );
      })}
    </Box>
  );
};

export default CalendarBody;
