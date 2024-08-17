import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material'; // Importando Typography
import { Logo, TransparentBoxWrapper } from '../../atoms/Index';
import PropTypes from 'prop-types';
import { SideBarSection } from '../../molecules/Index';

const SideBarWrapper = styled(TransparentBoxWrapper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: '2vh 2vw',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  height: '100vh',
}));

const SideBar = ({ sections }) => (
  <SideBarWrapper>
    <Logo top="2vh" left="2vw" width="100px" height="100px" />
    {sections && sections.length > 0 ? (
      sections.map((section, index) => (
        <SideBarSection key={index} {...section} />
      ))
    ) : (
      <Typography variant="body1" color="textSecondary">
        Nenhuma seção disponível.
      </Typography>
    )}
  </SideBarWrapper>
);

SideBar.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          icon: PropTypes.string.isRequired,
          onClick: PropTypes.func,
          color: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
};

SideBar.defaultProps = {
  sections: [],
};

export default SideBar;
