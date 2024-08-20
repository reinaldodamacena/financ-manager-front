import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const TransparentBoxWrapper = styled('div')(
  ({
    theme,
    justifyContent,
    top,
    left,
    right,
    bottom,
    height,
    width,
    backgroundColor,
    borderRadius,
    boxShadow,
    padding,
    position,
  }) => ({
    position: position || 'absolute',
    top: top || '0',
    left: left || theme.spacing(20),
    right: right || theme.spacing(10),
    bottom: bottom || 'auto',
    width: width || '30vw',
    height: height || '100vh',
    backgroundColor: backgroundColor || 'rgba(255, 255, 255, 0.75)',
    borderRadius: borderRadius || theme.shape.borderRadius,
    boxShadow: boxShadow || theme.shadows[3],
    padding: padding || theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: justifyContent || 'flex-start',
    transition: theme.transitions.create(['padding', 'margin', 'width', 'height', 'background-color'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
  })
);

const TransparentBox = ({
  children,
  alignContent,
  top,
  left,
  right,
  bottom,
  height,
  width,
  backgroundColor,
  borderRadius,
  boxShadow,
  padding,
  position,
}) => {
  return (
    <TransparentBoxWrapper
      justifyContent={alignContent}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      height={height}
      width={width}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      padding={padding}
      position={position}
    >
      {children}
    </TransparentBoxWrapper>
  );
};

TransparentBox.propTypes = {
  children: PropTypes.node,
  alignContent: PropTypes.oneOf(['flex-start', 'flex-end']), // Controle de alinhamento
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  backgroundColor: PropTypes.string, // Cor de fundo customizável
  borderRadius: PropTypes.number, // BorderRadius customizável
  boxShadow: PropTypes.string, // Sombra customizável
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Padding customizável
  position: PropTypes.string,
};

export default TransparentBox;
