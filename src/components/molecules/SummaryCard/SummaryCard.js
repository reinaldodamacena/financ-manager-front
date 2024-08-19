import React from 'react';
import { Card, Typography, Grid } from '@mui/material';
import { Button } from '../../atoms/Index';

const SummaryCard = () => (
  <Card sx={{ padding: 2, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" color="primary" align="center">
          Total R$ 634,66
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button color="primary" variant="contained" fullWidth>
          Finalizar venda
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button color="secondary" variant="outlined" fullWidth>
          Cancelar
        </Button>
      </Grid>
    </Grid>
  </Card>
);

export default SummaryCard;
