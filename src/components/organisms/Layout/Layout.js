import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { NavBar, SideBar } from '../Index';

const GridWrapper = styled('div')(({ theme, collapsed }) => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateColumns: collapsed ? `${theme.spacing(4)} 1fr` : `${theme.spacing(10)} 1fr`,
  height: '100%',
  width: '100%',
  gridTemplateAreas: `
    "navbar navbar"
    "sidebar content"
  `,
  overflowY: 'auto',
  transition: theme.transitions.create('grid-template-columns', {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: collapsed ? `${theme.spacing(6)} 1fr` : `${theme.spacing(20)} 1fr`,
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gridTemplateAreas: `
      "navbar"
      "content"
      "sidebar"
      
    `,
  },
  [theme.breakpoints.down('xs')]: {
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: `
      "navbar"
      "content"
      "sidebar"
      
    `,
  },
}));

const NavBarWrapper = styled('div')(({ theme, collapsed }) => ({
  gridArea: 'navbar',
  width: '100%',
  zIndex: theme.zIndex.appBar,
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '10%',
  },
}));

const SideBarWrapper = styled('div')(({ theme, collapsed }) => ({
  gridArea: 'sidebar',
  width: collapsed ? theme.spacing(7) : theme.spacing(13), // Substituindo 130% e 170% por valores calculado
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  [theme.breakpoints.down('sm')]: {
    width: theme.spacing(7), // Aqui equivale a 20%
    height: '90%',
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.background.paper,
  },
}));


const ContentWrapper = styled('div')(({ theme }) => ({
  gridArea: 'content',
  padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
  transition: theme.transitions.create('padding', {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
  },
}));

const Layout = ({ children }) => {
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <GridWrapper theme={theme} collapsed={collapsed}>
      <NavBarWrapper theme={theme} collapsed={collapsed}>
        <NavBar onToggleSidebar={toggleSidebar} />
      </NavBarWrapper>
      <SideBarWrapper theme={theme} collapsed={collapsed}>
        <SideBar collapsed={collapsed} toggleCollapsed={toggleSidebar} />
      </SideBarWrapper>
      <ContentWrapper theme={theme}>
        {children}
      </ContentWrapper>
    </GridWrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
