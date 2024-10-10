import React from 'react';
import { Box } from '@mui/material';
import NavigationButton from './NavigationButton';
import MonthTitle from './MonthTitle';

const CalendarNavigation = ({ currentMonth, onNext, onPrevious }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem' }}>
      <NavigationButton direction="left" onClick={onPrevious} />
      <MonthTitle month={currentMonth} />
      <NavigationButton direction="right" onClick={onNext} />
    </Box>
  );
};

export default CalendarNavigation;
