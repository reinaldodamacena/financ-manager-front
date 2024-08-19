import React from 'react';
import { Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Logo, ConfigurableBox } from '../../atoms/Index';
import PropTypes from 'prop-types';
import { SideBarSection } from '../../molecules/Index';

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
  return (
    <ConfigurableBox
      sx={({ theme }) => ({
        width: collapsed ? '5%' : '20%',
        height: '100%',
        padding: collapsed ? theme.spacing(0, 1) : theme.spacing(1),
        borderRadius: 0,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        transition: theme.transitions.create(['width', 'padding'], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeInOut,
        }),
      })}
    >
      <Logo
        top={({ theme }) => theme.spacing(2)}
        left={({ theme }) => theme.spacing(2)}
        width={collapsed ? '10%' : '20%'}
        height={collapsed ? '10%' : '20%'}
      />
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
  toggleCollapsed: PropTypes.func.isRequired, // Nova prop para alternar o estado
};

export default SideBar;
