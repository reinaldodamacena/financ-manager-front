import React from 'react';
import * as Icons from '@mui/icons-material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 'inherit',
  color: 'inherit',
}));

const BarcodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24px"
    height="24px"
  >
    <rect x="3" y="4" width="2" height="16" />
    <rect x="6" y="4" width="1" height="16" />
    <rect x="8" y="4" width="2" height="16" />
    <rect x="11" y="4" width="1" height="16" />
    <rect x="13" y="4" width="1" height="16" />
    <rect x="15" y="4" width="2" height="16" />
    <rect x="18" y="4" width="1" height="16" />
  </svg>
);

const Icon = ({ name, size, color, ...props }) => {
  const icons = {
    ...Icons,
    Barcode: BarcodeIcon, // Adicionando o ícone de código de barras personalizado
  };

  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in @mui/icons-material. Please check the icon name.`);
    return null;
  }

  return (
    <IconWrapper {...props}>
      <IconComponent style={{ fontSize: size || '24px', color: color || 'inherit' }} />
    </IconWrapper>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
};

Icon.defaultProps = {
  size: '24px',
  color: 'inherit',
};

export default Icon;
