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
      <Grid item xs={9}>
        <LineChart data={chartData} />
      </Grid>
      <Grid item xs={11} md={6}>
        <CustomTable 
          columns={salesColumns} 
          data={salesData} 
          title="Últimas vendas" 
          customWidth="auto" 
          customHeight="auto" 
        />
      </Grid>
      <Grid item xs={11} md={6}>
        <CustomTable 
          columns={topProductsColumns} 
          data={topProductsData} 
          title="Top produtos mais vendidos" 
          customWidth="auto" 
          customHeight="auto" 
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
