import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import useCalendar from '../../../hooks/useCalendar/useCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CalendarBody } from '../../atoms/Index';

const CustomCalendar = () => {
  const {
    startDate,
    endDate,
    error,
    handleDateSelect,
    isInRange,
    isStart,
    isEnd,
    formatDate,
  } = useCalendar();

  const [days, setDays] = useState([]);

  const generateDaysOfMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const daysOfMonth = generateDaysOfMonth(currentYear, currentMonth);
    setDays(daysOfMonth);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h6" align="center">
          Calendário Customizado
        </Typography>

        <CalendarBody
          days={days} // Passa os dias gerados
          startDate={startDate}
          endDate={endDate}
          onDateSelect={handleDateSelect}
          dayInfo={{}} // Supondo que você tenha `dayInfo`
          isInRange={isInRange}
          isStart={isStart}
          isEnd={isEnd}
        />

        {error && (
          <Box sx={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
            {error}
          </Box>
        )}

        <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
          {startDate && <Typography>Data de início: {formatDate(startDate)}</Typography>}
          {endDate && <Typography>Data de fim: {formatDate(endDate)}</Typography>}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default CustomCalendar;
