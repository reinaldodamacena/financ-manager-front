import React from 'react';
import PropTypes from 'prop-types';
import {  IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import {  ConfigurableBox } from '../../atoms/Index';
import { SideBarSection } from '../../molecules/Index';
import { useTheme } from '@mui/material/styles'; 

const sections = [
  {
    title: 'Produtos',
    items: [
      { label: 'Produtos', icon: 'Inventory', onClick: () => {} },
      { label: 'Cadastrar Produto', icon: 'AddBox', onClick: () => {} },
      { label: 'Inventário', icon: 'ListAlt', onClick: () => {} },
    ],
  },
  {
    title: 'Vendas',
    items: [
      { label: 'Venda', icon: 'AttachMoney', onClick: () => {} },
      { label: 'Histórico de Vendas', icon: 'History', onClick: () => {} },
    ],
  },
  {
    title: 'Clientes',
    items: [
      { label: 'Lista de clientes cadastrados', icon: 'People', onClick: () => {} },
      { label: 'Cadastrar novo cliente', icon: 'PersonAdd', onClick: () => {} },
    ],
  },
  {
    title: 'Fornecedores',
    items: [
      { label: 'Lista de fornecedores cadastrados', icon: 'LocalShipping', onClick: () => {} },
      { label: 'Cadastrar novo fornecedor', icon: 'PersonAddAlt', onClick: () => {} },
    ],
  },
  {
    title: 'Geral',
    items: [
      { label: 'Configurações', icon: 'Settings', onClick: () => {} },
      { label: 'Sair', icon: 'ExitToApp', onClick: () => {} },
    ],
  },
];

const SideBar = ({ collapsed, toggleCollapsed }) => {
  const theme = useTheme();

  return (
    <ConfigurableBox
      sx={{
        width: collapsed ? theme.spacing(7) : theme.spacing(28),
        transition: theme.transitions.create(['width'], {
          duration: theme.transitions.duration.standard,
        }),
        borderRadius: 0,
        overflowX: 'hidden',
      }}
    >
      <IconButton onClick={toggleCollapsed} sx={{ margin: 'auto', display: 'block' }}>
        <MenuIcon />
      </IconButton>
      {sections.map((section, index) => (
        <SideBarSection key={index} {...section} collapsed={collapsed} />
      ))}
    </ConfigurableBox>
  );
};

SideBar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggleCollapsed: PropTypes.func.isRequired,
};

export default SideBar;
