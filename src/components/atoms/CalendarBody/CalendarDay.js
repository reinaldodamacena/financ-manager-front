import React from 'react';
import { PickersDay } from '@mui/x-date-pickers';
import { styled, Box, Typography } from '@mui/material';

const StyledDay = styled(PickersDay)(({ theme, isInRange, isStart, isEnd }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  backgroundColor: isInRange ? theme.palette.primary.light : 'transparent',
  color: isInRange ? theme.palette.primary.contrastText : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    transform: 'scale(1.05)',
  },
  ...(isStart && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
  }),
  ...(isEnd && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
  }),
}));

const CalendarDay = ({ day, isStart, isEnd, isInRange, info, onDateSelect, ...props }) => {
  return (
    <Box sx={{ position: 'relative', textAlign: 'center' }}>
      <StyledDay
        {...props}
        day={day}
        isStart={isStart}
        isEnd={isEnd}
        isInRange={isInRange}
        onClick={() => onDateSelect(day)} // Use onClick diretamente
      />

      {/* Renderiza informações extras como vendas ou faturamento se estiverem presentes */}
      {info && (
        <Box sx={{ position: 'absolute', bottom: '-15px', width: '100%' }}>
          {info.sales && (
            <Typography variant="caption" color="primary">
              {info.sales} vendas
            </Typography>
          )}
          {info.revenue && (
            <Typography variant="caption" color="secondary">
              R${info.revenue.toFixed(2)}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CalendarDay;
