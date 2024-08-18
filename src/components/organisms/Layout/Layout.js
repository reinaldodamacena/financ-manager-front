import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { NavBar, SideBar } from '../Index';

const GridWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  height: '100vh',
  overflow: 'hidden', // Evita overflow do conteúdo
  gridTemplateRows: 'auto 1fr', // NavBar (se exibido) e conteúdo principal
  gridTemplateColumns: '1fr', // Apenas uma coluna por padrão
  gridTemplateAreas: `
    "content"
  `,
  ...(theme.breakpoints.down('md') && {
    gridTemplateColumns: '1fr', // Ajuste para telas médias e pequenas
  }),
}));

const NavBarWrapper = styled('div')(({ theme }) => ({
  gridArea: 'navbar',
  width: '100%',
  zIndex: 2, // Garante que o NavBar fique sobre outros elementos
  ...(theme.breakpoints.down('md') && {
    padding: '0 1vw',
  }),
}));

const SideBarWrapper = styled('div')(({ theme }) => ({
  gridArea: 'sidebar',
  zIndex: 1, // Garante que o SideBar fique sobre o conteúdo, mas abaixo do NavBar
  ...(theme.breakpoints.down('sm') && {
    position: 'fixed',
    width: '70vw',
    height: '100vh',
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 3,
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
  }),
}));

const ContentWrapper = styled('div')(({ theme }) => ({
  gridArea: 'content',
  overflowY: 'auto',
  padding: '2vh 2vw',
  ...(theme.breakpoints.down('sm') && {
    padding: '1vh 1vw',
  }),
}));

const Layout = ({ children, showNavBar = true, showSideBar = true }) => {
  const gridTemplateColumns = showSideBar ? (showNavBar ? '20vw 1fr' : '15vw 1fr') : '1fr';
  
  return (
    <GridWrapper
      sx={{
        gridTemplateRows: showNavBar ? 'auto 1fr' : '1fr',
        gridTemplateColumns: gridTemplateColumns,
        gridTemplateAreas: `
          ${showNavBar ? '"navbar navbar"' : ''}
          ${showSideBar ? '"sidebar content"' : '"content content"'}
        `,
      }}
    >
      {showNavBar && (
        <NavBarWrapper>
          <NavBar />
        </NavBarWrapper>
      )}
      {showSideBar && (
        <SideBarWrapper>
          <SideBar />
        </SideBarWrapper>
      )}
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </GridWrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showNavBar: PropTypes.bool,
  showSideBar: PropTypes.bool,
};

Layout.defaultProps = {
  showNavBar: true,
  showSideBar: true,
};

export default Layout;
