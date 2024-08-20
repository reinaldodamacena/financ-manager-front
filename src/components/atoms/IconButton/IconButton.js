import React from 'react';
import PropTypes from 'prop-types';
import { IconButton as MuiIconButton } from '@mui/material';
import {Icon} from '../Index';

const IconButton = ({ name, size, color, onClick, ...props }) => (
  <MuiIconButton onClick={onClick} {...props}>
    <Icon name={name} size={size} color={color} />
  </MuiIconButton>
);

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

IconButton.defaultProps = {
  size: '24px',
  color: 'inherit',
};

export default IconButton;
