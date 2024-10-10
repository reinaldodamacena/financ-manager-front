import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const ConfigurableBoxWrapper = styled('div')(
  ({
    theme,
    justifyContent,
    alignItems,
    top,
    left,
    right,
    bottom,
    height,
    width,
    backgroundColor,
    boxShadow,
    borderRadius,
    padding,
    position,
  }) => ({
    position: position || 'relative', 
    top: top || 'auto',
    left: left || theme.spacing(0),
    right: right || theme.spacing(0),
    bottom: bottom || 'auto',
    width: width || '100%',  // Garantir que a largura seja 100% do container pai
    height: height || 'auto',
    padding: padding || theme.spacing(2),  // Definir padding padrão mais espaçoso
    backgroundColor: backgroundColor || theme.palette.background.paper,
    boxShadow: boxShadow || 'none',
    borderRadius: borderRadius || theme.shape.borderRadius,
    boxSizing: 'border-box', // Garante que padding e borders estão dentro da largura/altura
    display: 'flex',
    flexDirection: 'column',
    justifyContent: justifyContent || 'flex-start',
    alignItems: alignItems || 'stretch',
    transition: theme.transitions.create(['width', 'height', 'padding'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
  })
);


const ConfigurableBox = ({
  children,
  justifyContent,
  alignItems,
  top,
  left,
  right,
  bottom,
  height,
  width,
  backgroundColor,
  boxShadow,
  borderRadius,
  padding,
  position,
}) => {
  return (
    <ConfigurableBoxWrapper
      justifyContent={justifyContent}
      alignItems={alignItems}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      height={height}
      width={width}
      backgroundColor={backgroundColor}
      boxShadow={boxShadow}
      borderRadius={borderRadius}
      padding={padding}
      position={position}
    >
      {children}
    </ConfigurableBoxWrapper>
  );
};

ConfigurableBox.propTypes = {
  children: PropTypes.node.isRequired,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  backgroundColor: PropTypes.string,
  boxShadow: PropTypes.string,
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  position: PropTypes.string,
};

export default ConfigurableBox;
