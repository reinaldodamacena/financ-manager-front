import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { ConfigurableBox } from '../../atoms/Index';
import { SideBarSection } from '../../molecules/Index';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/Auth/AuthServiceProvider'; // Importe o contexto de autenticação

const SideBar = ({ collapsed, toggleCollapsed }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuthContext(); // Obtenha a função logout do contexto

  const sections = [
    {
      title: 'Produtos',
      items: [
        { label: 'Produtos', icon: 'Inventory', onClick: () => navigate('/produto') },
        { label: 'Cadastrar Produto', icon: 'AddBox', onClick: () => navigate('/registroproduto') },
        { label: 'Inventário', icon: 'ListAlt', onClick: () => console.log('Inventário clicked') },
      ],
    },
    {
      title: 'Vendas',
      items: [
        { label: 'Venda', icon: 'AttachMoney', onClick: () => navigate('/vendas') },
        { label: 'Histórico de Vendas', icon: 'History', onClick: () => console.log('Histórico de Vendas clicked') },
      ],
    },
    {
      title: 'Clientes',
      items: [
        { label: 'Listar Clientes', icon: 'People', onClick: () => console.log('Lista de clientes cadastrados clicked') },
        { label: 'Cadastrar Cliente', icon: 'PersonAdd', onClick: () => console.log('Cadastrar novo cliente clicked') },
      ],
    },
    {
      title: 'Fornecedores',
      items: [
        { label: 'Fornecedores cadastrados', icon: 'LocalShipping', onClick: () => console.log('Lista de fornecedores cadastrados clicked') },
        { label: 'Cadastrar fornecedor', icon: 'PersonAddAlt', onClick: () => console.log('Cadastrar novo fornecedor clicked') },
      ],
    },
    {
      title: 'Geral',
      items: [
        { label: 'Configurações', icon: 'Settings', onClick: () => console.log('Configurações clicked') },
        { label: 'Sair', icon: 'ExitToApp', onClick: logout }, // Chama a função logout aqui
      ],
    },
  ];

  return (
    <ConfigurableBox
      borderRadius="0"
      sx={{
        width: collapsed ? theme.spacing(6) : theme.spacing(30),
        transition: theme.transitions.create(['width'], {
          duration: theme.transitions.duration.standard,
        }),
        borderRadius: 0,
        overflowX: 'hidden',
      }}
    >
      <IconButton onClick={toggleCollapsed} sx={{ margin: 'auto', display: 'block' }}>
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
