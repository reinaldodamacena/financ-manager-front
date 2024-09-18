import React from 'react';
import { IconButton } from '@mui/material';
import { Icon } from '../../atoms/Index'; // Importa o seu átomo de ícones personalizado
import { CustomTable } from '../Index'; // Importa sua tabela personalizada
import PropTypes from 'prop-types';

// Função para formatar a data no formato DD/MM/YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

const SalesList = ({ salesData, onEditSale, onDeleteSale, loading }) => {
  // Definindo as colunas da tabela
  const columns = [
    { field: 'saleId', headerName: 'ID da Venda', align: 'center' },
    { field: 'saleDate', headerName: 'Data da Venda', align: 'center', renderCell: ({ row }) => formatDate(row.saleDate) },
    { field: 'customerName', headerName: 'Cliente', align: 'left' },
    { field: 'totalAmount', headerName: 'Valor Total (R$)', align: 'right' },
    { field: 'quantity', headerName: 'Quantidade', align: 'right' },
    {
      field: 'actions',
      headerName: 'Ações',
      align: 'center',
      renderCell: ({ row }) => (
        <div>
          {/* Botão de Editar usando o átomo Icon */}
          <IconButton
            aria-label="editar"
            color="primary"
            onClick={() => onEditSale(row.saleId)}
          >
            <Icon name="Edit" size="24px" /> {/* Usando o átomo Icon aqui */}
          </IconButton>

          {/* Botão de Excluir usando o átomo Icon */}
          <IconButton
            aria-label="excluir"
            color="secondary"
            onClick={() => onDeleteSale(row.saleId)}
          >
            <Icon name="Delete" size="24px" /> {/* Usando o átomo Icon aqui */}
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      data={salesData}
      loading={loading}
      keyField="saleId" // Defina o campo chave para a identificação única da linha
    />
  );
};

SalesList.propTypes = {
  salesData: PropTypes.arrayOf(
    PropTypes.shape({
      saleId: PropTypes.number.isRequired,
      saleDate: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      totalAmount: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEditSale: PropTypes.func.isRequired, // Função chamada ao clicar no botão de editar
  onDeleteSale: PropTypes.func.isRequired, // Função chamada ao clicar no botão de excluir
  loading: PropTypes.bool, // Indica se os dados estão carregando
};

export default SalesList;
