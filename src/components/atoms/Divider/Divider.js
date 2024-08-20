import React from 'react';
import { Divider as MuiDivider } from '@mui/material';
import PropTypes from 'prop-types';

const Divider = ({ color, thickness, ...props }) => (
  <MuiDivider 
    sx={{ borderColor: color, borderWidth: thickness }}
    {...props}
  />
);

Divider.propTypes = {
  color: PropTypes.string,
  thickness: PropTypes.string,
};

Divider.defaultProps = {
  color: 'grey.300',
  thickness: '1px',
};

export default Divider;
