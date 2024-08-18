import React from 'react';
import { Grid } from '@mui/material';
import { StatCard } from '../../molecules/Index';

const StatsSection = () => (
  <Grid container spacing={3}>
    <Grid item xs={2} >
      <StatCard 
        icon="Category" 
        label="Cadastrados" 
        value="0000" 
        sx={{ height: '10vh', width: '100%' }} // Controlando o tamanho da caixa diretamente no Grid
      />
    </Grid>
    <Grid item xs={2}>
      <StatCard 
        icon="Inventory" 
        label="Inventário" 
        value="0000" 
        sx={{ height: '20vh', width: '100%' }} // Controlando o tamanho da caixa diretamente no Grid
      />
    </Grid>
    <Grid item xs={2}>
      <StatCard 
        icon="People" 
        label="Clientes" 
        value="0000" 
        sx={{ height: '20vh', width: '100%' }} // Controlando o tamanho da caixa diretamente no Grid
      />
    </Grid>
    <Grid item xs={2}>
      <StatCard 
        icon="Store" 
        label="Fornecedores" 
        value="0000" 
        sx={{ height: '20vh', width: '100%' }} // Controlando o tamanho da caixa diretamente no Grid
      />
    </Grid>
  </Grid>
);

export default StatsSection;
