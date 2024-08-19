import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';
import { Icon, ConfigurableBox } from '../../atoms/Index';

const StatCard = ({ icon, label, value, sx }) => (
  <ConfigurableBox
    sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 2, // Usando o sistema de espaçamento do tema
      boxShadow: 2, // Usando a sombra predefinida do tema
      borderRadius: 2, // Usando o borderRadius predefinido do tema
      backgroundColor: 'background.paper', // Usando a cor de fundo do tema
      gap: 2, // Espaçamento entre os elementos
      ...sx,
    }}
  >
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Icon name={icon} size="2rem" color="primary" />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
        <Typography variant="body2" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="h6" color="textPrimary">
          {value}
        </Typography>
      </Box>
    </Box>
  </ConfigurableBox>
);

StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

StatCard.defaultProps = {
  sx: {},
};

export default StatCard;
