import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { Icon, ConfigurableBoxWrapper } from '../../atoms/Index';

const StatCard = ({ icon, label, value, sx }) => (
  <ConfigurableBoxWrapper
    sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      boxShadow: 2,
      borderRadius: 2,
      backgroundColor: 'white',
      gap: '1rem',
      ...sx,
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Icon name={icon} size="2rem" color="primary"  />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="caption" color="primary">
          {value}
        </Typography>
      </div>
    </div>
  </ConfigurableBoxWrapper>
);

StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default StatCard;
