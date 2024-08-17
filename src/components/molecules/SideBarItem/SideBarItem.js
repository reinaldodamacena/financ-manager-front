import React from 'react';
import { styled } from '@mui/material/styles';
import { Icon } from '../../atoms/Index';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const SideBarItemWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '1vh 0',
  color: theme.palette.text.primary,
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SideBarText = styled(Typography)(({ theme }) => ({
  marginLeft: '1vw',
  fontSize: '1rem',
  color: theme.palette.text.primary,
}));

const SideBarItem = ({ label, icon, color, onClick }) => (
  <SideBarItemWrapper onClick={onClick}>
    <Icon name={icon} size="24px" color={color || 'inherit'} />
    <SideBarText>{label}</SideBarText>
  </SideBarItemWrapper>
);

SideBarItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default SideBarItem;
