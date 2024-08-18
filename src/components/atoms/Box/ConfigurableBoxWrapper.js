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
    position
  }) => ({
    position: position || 'relative', // Valor padrão para a posição
    top: top || 'auto',
    left: left || 'auto',
    right: right || 'auto',
    bottom: bottom || 'auto',
    width: width || 'auto',
    height: height || 'auto',
    padding: padding || '2vw',
    backgroundColor: backgroundColor || theme.palette.background.paper,
    boxShadow: boxShadow || 'none',
    borderRadius: borderRadius || theme.shape.borderRadius,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: justifyContent || 'flex-start',
    alignItems: alignItems || 'stretch',
    '@media (max-width: 768px)': {
      padding: '3vw', // Reduz o padding em telas menores
      margin: '5vh auto',
    },
    '@media (max-width: 480px)': {
      padding: '4vw', // Padding reduzido para telas muito pequenas
      margin: '2vh auto',
    },
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
  position
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
