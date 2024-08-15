import React from 'react';
import * as Icons from '@mui/icons-material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

// Wrapper styled component for additional styling if needed
const IconWrapper = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 'inherit', // inherit font size from parent
  color: 'inherit', // inherit color from parent
}));

const Icon = ({ name, size, color, ...props }) => {
  // Retrieve the appropriate icon from MUI icons
  const IconComponent = Icons[name];

  // If the icon does not exist, return null
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in @mui/icons-material`);
    return null;
  }

  return (
    <IconWrapper {...props}>
      <IconComponent style={{ fontSize: size, color: color }} />
    </IconWrapper>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired, // Name of the icon, e.g., 'Home', 'Search'
  size: PropTypes.string, // Size of the icon, e.g., '24px', '2em'
  color: PropTypes.string, // Color of the icon
};

Icon.defaultProps = {
  size: '24px',
  color: 'inherit', // Default to inheriting color from parent
};

export default Icon;
