import React from 'react';
import { IconButton } from '@mui/material';
import { Icon } from '../Index'; // Supondo que você tenha um átomo de ícone

const NavigationButton = ({ direction, onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <Icon name={direction === 'left' ? 'ArrowBack' : 'ArrowForward'} />
    </IconButton>
  );
};

export default NavigationButton;
