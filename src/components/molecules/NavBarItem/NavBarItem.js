import React from 'react';
import { IconButton } from '@mui/material';
import { Icon } from '../../atoms/Index';

const NavBarItem = ({ iconName, onClick }) => {
  return (
    <IconButton onClick={onClick} sx={{ padding: 1 }}>
      <Icon name={iconName} />
    </IconButton>
  );
};

export default NavBarItem;
