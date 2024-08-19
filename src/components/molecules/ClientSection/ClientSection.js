import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import { Input, Icon } from '../../atoms/Index';

const ClientSection = () => {
  return (
    <div>
      <Typography variant="h5" color="textPrimary">
        Cliente
      </Typography>
      <Divider sx={{ borderColor: 'primary.main', marginBottom: 2, width: '100%' }} />
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} sm={6} md={4}>
          <Input
            label="Busca CPF"
            mask="999.999.999-99" // Máscara para CPF
            icon={() => <Icon name="Search" size="2rem" color="primary.main" />} // Usando o átomo de Icon com cor do tema
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" color="textPrimary">
            Fulano de tal da Silva e Silva
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ClientSection;
