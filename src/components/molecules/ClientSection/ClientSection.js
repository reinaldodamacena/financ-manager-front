import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import { Input, Icon } from '../../atoms/Index';

const ClientSection = () => {
  return (
    <div>
      <Typography variant="h5">
        Cliente
      </Typography>
      <Divider sx={{ borderColor: 'primary.main', marginBottom: '1rem', width:'80vw'}} />
      <Grid container spacing={5} alignItems="Flex">
        <Grid item xs={12} sm={6} md={4}>
          <Input
            label="Busca CPF"
            mask="999.999.999-99" // Máscara para CPF
            icon={() => <Icon name="Search" size="2rem" color="#BF4011" />} // Usando o átomo de Icon
            focusBorderColor="#BF4011"
            hoverBorderColor="#BF4011"
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
