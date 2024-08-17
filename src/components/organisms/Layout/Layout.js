import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { NavBar, SideBar} from '../Index';

const GridWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto', // NavBar, conteúdo principal, Footer
  gridTemplateColumns: '20vw 1fr', // SideBar e conteúdo principal
  height: '100vh',
  gridTemplateAreas: `
    "navbar navbar"
    "sidebar content"
  `,
  overflow: 'hidden', // Evita overflow do conteúdo
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '15vw 1fr', // Reduz o SideBar em telas médias
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr', // SideBar fica abaixo do NavBar
    gridTemplateAreas: `
      "navbar"
      "content"
      "sidebar"

    `,
  },
  [theme.breakpoints.down('xs')]: {
    gridTemplateColumns: '1fr', // SideBar abaixo e conteúdo ocupa toda a largura
    gridTemplateRows: 'auto 1fr', // Garante que o conteúdo principal ocupe o máximo de espaço possível
    gridTemplateAreas: `
      "navbar"
      "sidebar"
      "content"
    `,
  },
}));

const NavBarWrapper = styled('div')({
  gridArea: 'navbar',
  width: '100%',
  zIndex: 2, // Garante que o NavBar fique sobre outros elementos
});

const SideBarWrapper = styled('div')(({ theme }) => ({
  gridArea: 'sidebar',
  zIndex: 1, // Garante que o SideBar fique sobre o conteúdo, mas abaixo do NavBar
  [theme.breakpoints.down('sm')]: {
    position: 'absolute',
    width: '100vw',
    height: 'auto',
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
  },
}));

const ContentWrapper = styled('div')(({ theme }) => ({
  gridArea: 'content',
  overflowY: 'auto',
  padding: '2vh 2vw',
  [theme.breakpoints.down('sm')]: {
    padding: '1vh 1vw',
  },
}));

const Layout = ({ children }) => (
  <GridWrapper>
    <NavBarWrapper>
      <NavBar />
    </NavBarWrapper>
    <SideBarWrapper>
      <SideBar />
    </SideBarWrapper>
    <ContentWrapper>
      {children}
    </ContentWrapper>
  </GridWrapper>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
