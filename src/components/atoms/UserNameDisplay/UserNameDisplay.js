import React from 'react';
import { Box, Typography } from '@mui/material';
import { Icon } from '../../atoms/Index';

const UserNameDisplay = ({ userName, iconName }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 2 }}>
      <Icon name={iconName} sx={{ marginRight: 1 }} />
      <Typography variant="body1" color="textPrimary">
        {userName}
      </Typography>
    </Box>
  );
};

export default UserNameDisplay;
