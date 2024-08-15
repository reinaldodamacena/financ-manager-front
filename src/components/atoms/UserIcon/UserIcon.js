import React from 'react';
import { styled } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const UserIconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '-3vw', // Ajusta o ícone para que fique parcialmente fora do topo do SmallTransparentBox
  left: '50%', // Centraliza horizontalmente
  transform: 'translateX(-50%)', // Ajuste para centralização perfeita
  height: '7vw', // Altura responsiva utilizando vw
  width: '7vw', // Largura responsiva utilizando vw
 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%', // Faz com que o ícone seja circular
  backgroundColor: theme.palette.secondary.main, // Cor de fundo baseada no tema
  boxShadow: '0px 0px 0px 4px rgba(255, 255, 255, 1)', // Adiciona um contorno branco sólido
}));

const UserIconInnerWrapper = styled('div')({
  width: '8vw',  // Largura responsiva utilizando vw
  height: '8vw', // Altura responsiva utilizando vw
  maxWidth: '82px',  // Largura máxima em px
  maxHeight: '82px', // Altura máxima em px
  borderRadius: '50%', // Faz com que o círculo seja redondo
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const UserIcon = () => {
  return (
    <UserIconWrapper>
      <UserIconInnerWrapper>
        <PersonOutlineIcon style={{ fontSize: '6vw', maxWidth: '4.5vw', color: '#FFFFFF' }} />
      </UserIconInnerWrapper>
    </UserIconWrapper>
  );
};

export default UserIcon;
