import React from 'react';
import { Card, Typography } from '@mui/material';
import { Button } from '../../atoms/Index';

const SummaryCard = () => (
  <Card sx={{ padding: '1rem', backgroundColor: '#FFF5F5', borderRadius: '8px' }}>
    <Typography variant="h4" color="primary" align="center">Total R$ 634,66</Typography>
    <Button  color="primary" variant="contained">Finalizar venda</Button>
    <Button  color="secondary" variant="outlined">Cancelar</Button>
  </Card>
);

export default SummaryCard;
