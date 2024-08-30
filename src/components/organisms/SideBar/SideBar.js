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
      title: 'Vendas',
      items: [
        { label: 'Realizar Venda', icon: 'AttachMoney', onClick: () => navigate('/vendas') },
        { label: 'Histórico de Vendas', icon: 'History', onClick: () => navigate('/vendas/historico') },
        { label: 'Auditoria de Vendas', icon: 'FactCheck', onClick: () => navigate('/vendas/auditoria') },
      ],
    },
    {
      title: 'Caixa',
      items: [
        { label: 'Abertura de Caixa', icon: 'OpenInNew', onClick: () => navigate('/caixa') },
        { label: 'Registro de Movimentações', icon: 'Receipt', onClick: () => navigate('/caixa/movimentacoes') },
        { label: 'Fechamento de Caixa', icon: 'Close', onClick: () => navigate('/caixa/fechamento') },
        { label: 'Relatório de Caixa', icon: 'Assessment', onClick: () => navigate('/caixa/relatorio') },
      ],
    },
    {
      title: 'Produtos',
      items: [
        { label: 'Listar Produtos', icon: 'Inventory', onClick: () => navigate('/produtos') },
        { label: 'Cadastrar Produto', icon: 'AddBox', onClick: () => navigate('/produtos/cadastrar') },
        { label: 'Inventário', icon: 'ListAlt', onClick: () => navigate('/inventario') },
      ],
    },
    {
      title: 'Clientes',
      items: [
        { label: 'Listar Clientes', icon: 'People', onClick: () => navigate('/clientes') },
        { label: 'Cadastrar Cliente', icon: 'PersonAdd', onClick: () => navigate('/clientes/cadastrar') },
      ],
    },
    {
      title: 'Fornecedores',
      items: [
        { label: 'Listar Fornecedores', icon: 'LocalShipping', onClick: () => navigate('/fornecedores') },
        { label: 'Cadastrar Fornecedor', icon: 'PersonAddAlt', onClick: () => navigate('/fornecedores/cadastrar') },
      ],
    },
    {
      title: 'Promoções',
      items: [
        { label: 'Listar Promoções', icon: 'LocalOffer', onClick: () => navigate('/promocoes') },
        { label: 'Cadastrar Promoção', icon: 'AddAlert', onClick: () => navigate('/promocoes/cadastrar') },
      ],
    },
    {
      title: 'Configurações',
      items: [
        { label: 'Gerenciar Usuários', icon: 'AdminPanelSettings', onClick: () => navigate('/usuarios') },
        { label: 'Gerenciar Roles', icon: 'Security', onClick: () => navigate('/roles') },
        { label: 'Configurações Gerais', icon: 'Settings', onClick: () => navigate('/configuracoes') },
        { label: 'Sair', icon: 'ExitToApp', onClick: logout },
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
