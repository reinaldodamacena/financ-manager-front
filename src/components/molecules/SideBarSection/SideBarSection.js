import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Typography, Divider } from '@mui/material';
import { SideBarItem } from '../../molecules/Index';

const SectionTitle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'collapsed' })(
  ({ theme, collapsed }) => ({
    margin: theme.spacing(collapsed ? 1 : 2, 0, 1),
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    display: collapsed ? 'none' : 'block',
    transition: theme.transitions.create(['margin', 'display'], {
      duration: theme.transitions.duration.shortest,
    }),
  })
);

const SideBarSectionWrapper = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SideBarSection = ({ title, items, collapsed }) => (
  <SideBarSectionWrapper>
    <SectionTitle collapsed={collapsed}>{title}</SectionTitle>
    {items.map((item, index) => (
      <SideBarItem key={index} {...item} collapsed={collapsed} />
    ))}
    <Divider sx={{ margin: (theme) => theme.spacing(2, 0) }} />
  </SideBarSectionWrapper>
);

SideBarSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      color: PropTypes.string,
    })
  ).isRequired,
  collapsed: PropTypes.bool,
};

SideBarSection.defaultProps = {
  collapsed: false,
};

export default SideBarSection;
