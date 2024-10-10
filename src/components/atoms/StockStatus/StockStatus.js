import React from 'react';
import { Chip } from '@mui/material';
import PropTypes from 'prop-types';

const StockStatus = ({ status, label }) => {
  return <Chip label={label} color={status} size="small" />;
};

StockStatus.propTypes = {
  status: PropTypes.string.isRequired, // success, warning, error
  label: PropTypes.string.isRequired,
};

export default StockStatus;
