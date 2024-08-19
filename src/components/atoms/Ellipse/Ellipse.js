import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const EllipseWrapper = styled('div')(({ theme, width, height, left, top, bgColor, rotate }) => ({
  position: 'absolute',
  width: width,
  height: height,
  left: left,
  top: top,
  backgroundColor: bgColor || theme.palette.primary.main,
  transform: rotate ? `rotate(${rotate}deg)` : 'none',
  borderRadius: '50%', // Isso faz com que o div fique circular
  transition: theme.transitions.create(['width', 'height', 'left', 'top'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  [theme.breakpoints.down('md')]: {
    width: `calc(${width} * 0.75)`, // Reduz o tamanho em telas menores
    height: `calc(${height} * 0.75)`,
    left: `calc(${left} * 0.75)`,
    top: `calc(${top} * 0.75)`,
  },
  [theme.breakpoints.down('sm')]: {
    width: `calc(${width} * 0.5)`, // Reduz ainda mais o tamanho em telas muito pequenas
    height: `calc(${height} * 0.5)`,
    left: `calc(${left} * 0.5)`,
    top: `calc(${top} * 0.5)`,
  },
}));

const Ellipse = ({ width, height, left, top, bgColor, rotate, style }) => {
  return (
    <EllipseWrapper
      width={width}
      height={height}
      left={left}
      top={top}
      bgColor={bgColor}
      rotate={rotate}
      style={style}
    />
  );
};

Ellipse.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  top: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  rotate: PropTypes.string,
  style: PropTypes.object,
};

Ellipse.defaultProps = {
  bgColor: '', // Permite que o tema defina a cor de fundo se não for especificado
};

export default Ellipse;
