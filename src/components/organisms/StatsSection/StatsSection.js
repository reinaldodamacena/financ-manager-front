import React from 'react';
import { Grid } from '@mui/material';
import { StatCard } from '../../molecules/Index';

const StatsSection = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6} md={3}>
      <StatCard 
        icon="Category" 
        label="Cadastrados" 
        value="0000" 
        sx={({ theme }) => ({
          height: '10vh', 
          width: '100%',
          padding: theme.spacing(2),
          boxShadow: theme.shadows[2], // Adicionando sombra para consistência com o tema
          borderRadius: theme.shape.borderRadius, // Aplicando o borderRadius do tema
        })} 
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <StatCard 
        icon="Inventory" 
        label="Inventário" 
        value="0000" 
        sx={({ theme }) => ({
          height: '10vh', 
          width: '100%',
          padding: theme.spacing(2),
          boxShadow: theme.shadows[2], 
          borderRadius: theme.shape.borderRadius,
        })}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <StatCard 
        icon="People" 
        label="Clientes" 
        value="0000" 
        sx={({ theme }) => ({
          height: '10vh', 
          width: '100%',
          padding: theme.spacing(2),
          boxShadow: theme.shadows[2],
          borderRadius: theme.shape.borderRadius,
        })}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <StatCard 
        icon="Store" 
        label="Fornecedores" 
        value="0000" 
        sx={({ theme }) => ({
          height: '10vh', 
          width: '100%',
          padding: theme.spacing(2),
          boxShadow: theme.shadows[2],
          borderRadius: theme.shape.borderRadius,
        })}
      />
    </Grid>
  </Grid>
);

export default StatsSection;
