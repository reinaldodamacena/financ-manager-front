import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { NavBar, SideBar } from '../Index';

const GridWrapper = styled('div')(({ theme, collapsed }) => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gridTemplateColumns: collapsed ? `${theme.spacing(6)} 1fr` : `${theme.spacing(20)} 1fr`,
  height: '100vh', // Mantém a altura total da janela
  width: '100%',
  gridTemplateAreas: `
    "navbar navbar"
    "sidebar content"
  `,
  overflow: 'hidden', // Remove overflow do grid
  transition: theme.transitions.create('grid-template-columns', {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gridTemplateAreas: `
      "navbar"
      "sidebar"
      "content"
    `,
  },
}));

const NavBarWrapper = styled('div')(({ theme }) => ({
  gridArea: 'navbar',
  width: '100%',
  zIndex: theme.zIndex.appBar,
  position: 'sticky', // Fixa o NavBar no topo
  top: 0,
  backgroundColor: theme.palette.background.paper,
 
}));

const SideBarWrapper = styled('div')(({ theme, collapsed }) => ({
  gridArea: 'sidebar',
  width: collapsed ? theme.spacing(7) : theme.spacing(25),
  height: '100%', // Mantém a altura do Sidebar
  position: 'sticky', // Fixa o SideBar na lateral
  top: 0,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1], // Adiciona uma sombra ao SideBar
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  overflowX: 'hidden',
}));

const ContentWrapper = styled('div')(({ theme }) => ({
  gridArea: 'content',
  overflowY: 'auto', // Permite overflow somente no conteúdo
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
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
      <NavBarWrapper theme={theme}>
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
