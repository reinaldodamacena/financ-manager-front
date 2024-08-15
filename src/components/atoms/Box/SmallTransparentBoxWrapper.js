// src/components/atoms/SmallTransparentBox.js
import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const SmallTransparentBoxWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: '8.27%',
  right: '8.46%',
  top: '30.62%',
  bottom: '14.11%',
  background: 'rgba(242, 198, 182, 0.33)', // Transparência com cor
  borderRadius: '25px',
}));

const SmallTransparentBox = ({ children }) => {
  return <SmallTransparentBoxWrapper>{children}</SmallTransparentBoxWrapper>;
};

SmallTransparentBox.propTypes = {
  children: PropTypes.node, // Permite que a SmallTransparentBox contenha outros elementos
};

export default SmallTransparentBox;
