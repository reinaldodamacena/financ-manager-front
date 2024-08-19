import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { NavBar, SideBar } from '../Index';

const GridWrapper = styled('div')(({ theme, collapsed }) => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateColumns: collapsed ? `${theme.spacing(4)} 1fr` : `${theme.spacing(10)} 1fr`,
  height: '100vh',
  gridTemplateAreas: `
    "navbar navbar"
    "sidebar content"
  `,
  overflow: 'auto',
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
  width: collapsed ? `calc(100% - ${theme.spacing(4)})` : `calc(100% - ${theme.spacing(0)})`,
  zIndex: theme.zIndex.appBar,
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const SideBarWrapper = styled('div')(({ theme, collapsed }) => ({
  gridArea: 'sidebar',
  zIndex: theme.zIndex.drawer,
  width: collapsed ? theme.spacing(5) : theme.spacing(16),
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  [theme.breakpoints.down('sm')]: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ContentWrapper = styled('div')(({ theme }) => ({
  gridArea: 'content',
  overflowY: 'auto',
  padding: `${theme.spacing(1)} ${theme.spacing(8)}`,
  transition: theme.transitions.create('padding', {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  },
}));

const Layout = ({ children }) => {
  const theme = useTheme(); // Obtém o tema atual
  const [collapsed, setCollapsed] = useState(false); // Estado único para controlar o colapso da sidebar

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <GridWrapper theme={theme} collapsed={collapsed}>
      <NavBarWrapper theme={theme} collapsed={collapsed}>
        <NavBar onToggleSidebar={toggleSidebar} />
      </NavBarWrapper>
      <SideBarWrapper theme={theme} collapsed={collapsed}>
        <SideBar collapsed={collapsed} />
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