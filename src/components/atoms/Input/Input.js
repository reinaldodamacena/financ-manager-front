import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const Input = ({ label, ...props }) => {
  return (
    <TextField label={label} variant="outlined" fullWidth {...props} />
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Input;
