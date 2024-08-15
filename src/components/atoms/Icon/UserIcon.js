// src/components/atoms/UserIcon.js
import React from 'react';
import { styled } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const UserIconWrapper = styled('div')({
  position: 'absolute',
  width: '98px',
  height: '98px',
  left: '217px',
  top: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5.02564px',
  backgroundColor: '#F2F2F2', // Você pode ajustar a cor de fundo ou removê-la
});

const UserIcon = () => {
  return (
    <UserIconWrapper>
      <PersonOutlineIcon style={{ fontSize: '64px', color: '#6E7781' }} />
    </UserIconWrapper>
  );
};

export default UserIcon;
