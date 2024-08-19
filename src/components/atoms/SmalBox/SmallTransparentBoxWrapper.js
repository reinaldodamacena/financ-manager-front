import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const SmallTransparentBoxWrapper = styled('div')(
  ({
    theme,
    top,
    left,
    right,
    bottom,
    width,
    height,
    backgroundColor,
    borderRadius,
    boxShadow,
    padding,
    justifyContent,
  }) => ({
    position: 'absolute', // Permite posicionar o box na tela
    top: top || 'auto', // Posição superior padrão
    left: left || theme.spacing(20),
    right: right || theme.spacing(10),
    bottom: bottom || 'auto', // Posição inferior padrão
    width: width || '30vw', // Largura padrão
    height: height || '50vh', // Altura padrão
    backgroundColor: backgroundColor || 'rgba(242, 198, 182, 0.33)', // Transparência com cor padrão
    borderRadius: borderRadius || theme.shape.borderRadius * 2, // Usa o valor de borderRadius do tema multiplicado por 2 por padrão
    boxShadow: boxShadow || theme.shadows[2], // Sombra leve padrão
    padding: padding || theme.spacing(2), // Padding padrão
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: justifyContent || 'center', // Centraliza os filhos verticalmente por padrão
    boxSizing: 'border-box',
    transition: theme.transitions.create(['padding', 'margin', 'width', 'height', 'background-color'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
    '@media (max-width: 768px)': {
      padding: theme.spacing(2),
      margin: theme.spacing(1, 'auto'),
      width: '90%',
      height: 'auto',
    },
    '@media (max-width: 480px)': {
      padding: theme.spacing(2),
      margin: theme.spacing(1, 'auto'),
      width: '90%',
      height: 'auto',
    },
  })
);

const SmallTransparentBox = ({
  children,
  top,
  left,
  right,
  bottom,
  width,
  height,
  backgroundColor,
  borderRadius,
  boxShadow,
  padding,
  justifyContent,
}) => {
  return (
    <SmallTransparentBoxWrapper
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      padding={padding}
      justifyContent={justifyContent}
    >
      {children}
    </SmallTransparentBoxWrapper>
  );
};

SmallTransparentBox.propTypes = {
  children: PropTypes.node.isRequired, // Define que 'children' é obrigatório
  alignContent: PropTypes.oneOf(['flex-start', 'flex-end']), // Controle de alinhamento
  left: PropTypes.string, // Posição à esquerda customizável
  right: PropTypes.string, // Posição à direita customizável
  bottom: PropTypes.string, // Posição inferior customizável
  width: PropTypes.string, // Largura customizável
  height: PropTypes.string, // Altura customizável
  backgroundColor: PropTypes.string, // Cor de fundo customizável
  borderRadius: PropTypes.number, // BorderRadius customizável
  boxShadow: PropTypes.string, // Sombra customizável
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Padding customizável
  justifyContent: PropTypes.oneOf(['flex-start', 'center', 'flex-end']), // Controle de alinhamento vertical
};

export default SmallTransparentBox;
