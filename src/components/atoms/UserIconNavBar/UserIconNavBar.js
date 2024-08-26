import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

// Este componente é baseado no UserIcon original, mas ajustado para uso específico no NavBar
const UserIconNavBarWrapper = styled('div')(({ theme, width, height, backgroundColor }) => ({
  height: height || theme.spacing(5), // Altura ajustável via props
  width: width || theme.spacing(5), // Largura ajustável via props
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%', // Faz com que o ícone seja circular
  backgroundColor: backgroundColor || theme.palette.secondary.main, // Cor de fundo ajustável
  boxShadow: `0px 0px 0px ${theme.spacing(0.5)} rgba(255, 255, 255, 1)`, // Adiciona um contorno branco sólido
}));

const UserIconNavBarInnerWrapper = styled('div')(({ theme }) => ({
  width: '100%',  // Largura ajustável via props
  height: '100%', // Altura ajustável via props
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const UserIconNavBar = ({ 
  width, height, backgroundColor, iconColor, iconSize 
}) => {
  return (
    <UserIconNavBarWrapper
      width={width}
      height={height}
      backgroundColor={backgroundColor}
    >
      <UserIconNavBarInnerWrapper>
        <PersonOutlineIcon 
          style={{ fontSize: iconSize || '70%', color: iconColor || '#FFFFFF' }} 
        />
      </UserIconNavBarInnerWrapper>
    </UserIconNavBarWrapper>
  );
};

UserIconNavBar.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  backgroundColor: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UserIconNavBar.defaultProps = {
  width: null,
  height: null,
  backgroundColor: null,
  iconColor: null,
  iconSize: null,
};

export default UserIconNavBar;
