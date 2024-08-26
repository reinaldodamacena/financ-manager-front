import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const UserIconWrapper = styled('div')(({ theme, top, left, right, bottom, width, height, backgroundColor }) => ({
  position: 'absolute',
  top: top || theme.spacing(-6), // Valor padrão, pode ser sobrescrito via props
  left: left || '50%', // Centraliza horizontalmente por padrão
  right: right || 'auto', // Permite ajuste da direita
  bottom: bottom || 'auto', // Permite ajuste do fundo
  transform: left ? 'none' : 'translateX(-50%)', // Centraliza somente se `left` não for especificado
  height: height || '7vw', // Altura ajustável via props
  width: width || '7vw', // Largura ajustável via props
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%', // Faz com que o ícone seja circular
  backgroundColor: backgroundColor || theme.palette.secondary.main, // Cor de fundo ajustável
  boxShadow: `0px 0px 0px ${theme.spacing(0.5)} rgba(255, 255, 255, 1)`, // Adiciona um contorno branco sólido
}));

const UserIconInnerWrapper = styled('div')(({ theme, width, height }) => ({
  position: 'absolute',
  width: width || '8vw',  // Largura ajustável via props
  height: height || '8vw', // Altura ajustável via props
  maxWidth: theme.spacing(10.25),  // Largura máxima em px
  maxHeight: theme.spacing(10.25), // Altura máxima em px
  borderRadius: '50%', // Faz com que o círculo seja redondo
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const UserIcon = ({ 
  top, left, right, bottom, width, height, backgroundColor, iconColor, iconSize 
}) => {
  return (
    <UserIconWrapper
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
    >
      <UserIconInnerWrapper width={width} height={height}>
        <PersonOutlineIcon 
          style={{ fontSize: iconSize || '6vw', color: iconColor || '#FFFFFF' }} 
        />
      </UserIconInnerWrapper>
    </UserIconWrapper>
  );
};

UserIcon.propTypes = {
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  backgroundColor: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UserIcon.defaultProps = {
  top: null,
  left: null,
  right: null,
  bottom: null,
  width: null,
  height: null,
  backgroundColor: null,
  iconColor: null,
  iconSize: null,
};

export default UserIcon;
