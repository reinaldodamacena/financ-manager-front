import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Icon } from '../../atoms/Index';

const SideBarItemWrapper = styled('div')(({ theme, collapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  color: theme.palette.text.primary,
  cursor: 'pointer',
  transition: theme.transitions.create(['background-color', 'justify-content'], {
    duration: theme.transitions.duration.shortest,
  }),
  justifyContent: collapsed ? 'center' : 'flex-start',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SideBarText = styled(Typography)(({ theme, collapsed }) => ({
  marginLeft: theme.spacing(2),
  fontSize: theme.typography.pxToRem(14),
  display: collapsed ? 'none' : 'block',
}));

const SideBarItem = ({ label, icon, color, onClick, collapsed }) => (
  <SideBarItemWrapper onClick={onClick} collapsed={collapsed} aria-label={label}>
    <Icon name={icon} size="24px" color={color || 'inherit'} />
    <SideBarText collapsed={collapsed}>{label}</SideBarText>
  </SideBarItemWrapper>
);

SideBarItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  collapsed: PropTypes.bool,
};

SideBarItem.defaultProps = {
  collapsed: false,
};

export default SideBarItem;
