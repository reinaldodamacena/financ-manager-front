import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';
import { Icon, ConfigurableBox } from '../../atoms/Index';

const StatCard = ({ icon, label, value, sx }) => (
  <ConfigurableBox 
    sx={{ 
      width: "80%", 
      height: "100%", 
      justifyContent: "center", 
      maxWidth: "none", 
      padding: 1, // Reduz o padding
      ...sx 
    }}
  >
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 1 }}>
      <Icon name={icon} size="2rem" />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1 }}>
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
