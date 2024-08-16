import React from 'react';
import { styled } from '@mui/material/styles';
import Icon from './Icon';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const SidebarItemWrapper = styled('div')(({ theme }) => ({
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

const SidebarText = styled(Typography)(({ theme }) => ({
  marginLeft: '1vw',
  fontSize: '1rem',
  color: theme.palette.text.primary,
}));

const SidebarItem = ({ label, icon, color, onClick }) => (
  <SidebarItemWrapper onClick={onClick}>
    <Icon name={icon} size="24px" color={color || 'inherit'} />
    <SidebarText>{label}</SidebarText>
  </SidebarItemWrapper>
);

SidebarItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default SidebarItem;
