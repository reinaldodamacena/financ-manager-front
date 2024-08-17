import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { SideBarItem } from '../../molecules/Index';
import { Typography, Divider } from '@mui/material';

const SectionTitle = styled(Typography)(({ theme }) => ({
  margin: '2vh 0 1vh',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
}));

const SideBarSection = ({ title, items }) => (
  <div>
    <SectionTitle>{title}</SectionTitle>
    {items.map((item, index) => (
      <SideBarItem key={index} {...item} />
    ))}
    <Divider style={{ margin: '2vh 0' }} />
  </div>
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
};

export default SideBarSection;
