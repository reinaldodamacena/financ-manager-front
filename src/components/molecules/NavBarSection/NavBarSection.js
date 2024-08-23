import React from 'react';
import { Box } from '@mui/system';
import {NavBarItem} from '../Index';

const NavBarSection = ({ items }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {items.map((item, index) => (
        <NavBarItem key={index} iconName={item.iconName} onClick={item.onClick} />
      ))}
    </Box>
  );
};

export default NavBarSection;
