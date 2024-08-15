// src/components/atoms/Ellipse.js
import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const EllipseWrapper = styled('div')(({ theme, width, height, left, top, bgColor, rotate }) => ({
  position: 'absolute',
  width: width,
  height: height,
  left: left,
  top: top,
  backgroundColor: bgColor,
  transform: rotate ? `rotate(${rotate}deg)` : 'none',
  borderRadius: '50%', // Isso faz com que o div fique circular
}));

const Ellipse = ({ width, height, left, top, bgColor, rotate }) => {
  return (
    <EllipseWrapper
      width={width}
      height={height}
      left={left}
      top={top}
      bgColor={bgColor}
      rotate={rotate}
    />
  );
};

Ellipse.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  top: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  rotate: PropTypes.string,
};

export default Ellipse;
