import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { CustomTable, LineChart } from '../../molecules/Index';

const SalesSection = ({ salesData, topProductsData, chartData }) => {
  const salesColumns = [
    { field: 'date', headerName: 'Data' },
    { field: 'product', headerName: 'Produto' },
    { field: 'quantity', headerName: 'Quantidade' },
    { field: 'total', headerName: 'Total vendido (R$)' },
    { field: 'client', headerName: 'Cliente' },
  ];

  const topProductsColumns = [
    { field: 'name', headerName: 'Nome' },
    { field: 'price', headerName: 'Preço (R$)' },
    { field: 'quantity', headerName: 'Quantidade' },
    { field: 'total', headerName: 'Total vendido (R$)' },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <LineChart data={chartData} height="40vh" />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTable 
          columns={salesColumns} 
          data={salesData} 
          title="Últimas vendas" 
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTable 
          columns={topProductsColumns} 
          data={topProductsData} 
          title="Top produtos mais vendidos" 
        />
      </Grid>
    </Grid>
  );
};

SalesSection.propTypes = {
  salesData: PropTypes.array.isRequired,
  topProductsData: PropTypes.array.isRequired,
  chartData: PropTypes.object.isRequired,
};

export default SalesSection;
