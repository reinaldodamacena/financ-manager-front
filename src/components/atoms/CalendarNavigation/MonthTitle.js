import React from 'react';
import { Typography } from '@mui/material';

const MonthTitle = ({ month }) => {
  return (
    <Typography variant="h6" align="center">
      {month}
    </Typography>
  );
};

export default MonthTitle;
