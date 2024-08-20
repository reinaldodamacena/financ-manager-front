import React from 'react';
import { Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Logo, ConfigurableBox } from '../../atoms/Index';
import PropTypes from 'prop-types';
import { SideBarSection } from '../../molecules/Index';
import { useTheme } from '@mui/material/styles'; // Importa o hook useTheme

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
  const theme = useTheme(); // Usa o hook useTheme para acessar o tema

  return (
    <ConfigurableBox
    borderRadius= "0"
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
