import React from 'react';
import { Grid } from '@mui/material';
import { StatCard } from '../../molecules/Index';

const StatsSection = () => (
  <Grid container spacing={0.5}>
    <Grid item xs={12} sm={6} md={3}>
      <StatCard 
        icon="Category" 
        label="Cadastrados" 
        value="0000"  
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <StatCard 
        icon="Inventory" 
        label="Inventário" 
        value="0000" 
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <StatCard 
        icon="People" 
        label="Clientes" 
        value="0000" 
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <StatCard 
        icon="Store" 
        label="Fornecedores" 
        value="0000" 
      />
    </Grid>
  </Grid>
);

export default StatsSection;
