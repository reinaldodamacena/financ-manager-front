import React from 'react';
import { Typography } from '@mui/material';
import { Logo, ConfigurableBoxWrapper } from '../../atoms/Index';
import PropTypes from 'prop-types';
import { SideBarSection } from '../../molecules/Index';

const SideBar = ({ sections }) => (
  <ConfigurableBoxWrapper position= 'fixed'top='0vh' borderRadius = '12' bottom='5vh' width="15vw" height="100vh" padding="2vh 2vw" >
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
  </ConfigurableBoxWrapper>
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
