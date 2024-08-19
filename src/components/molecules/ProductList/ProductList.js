import React from 'react';
import PropTypes from 'prop-types';
import { CustomTable } from '../../molecules/Index';

const ProductList = ({ products = [] }) => { // Define um valor padrão para products
  const columns = [
    { field: 'item', headerName: 'Item' },
    { field: 'code', headerName: 'Código' },
    { field: 'name', headerName: 'Produto' },
    { field: 'quantity', headerName: 'Quantidade' },
    { 
      field: 'unitPrice', 
      headerName: 'Valor Unitário (R$)', 
      align: 'right',
      format: (value) => value.toFixed(2), // Formata o valor com 2 casas decimais
    },
    { 
      field: 'offerPrice', 
      headerName: 'Valor em Oferta (R$)', 
      align: 'right',
      format: (value) => value.toFixed(2), // Formata o valor com 2 casas decimais
    },
    { 
      field: 'totalPrice', 
      headerName: 'Valor Total (R$)', 
      align: 'right',
      format: (value) => value.toFixed(2), // Formata o valor com 2 casas decimais
    },
  ];

  const formattedData = products.map((product) => ({
    ...product,
    unitPrice: columns.find(col => col.field === 'unitPrice').format(product.unitPrice),
    offerPrice: columns.find(col => col.field === 'offerPrice').format(product.offerPrice),
    totalPrice: columns.find(col => col.field === 'totalPrice').format(product.totalPrice),
  }));

  return (
    <CustomTable columns={columns} data={formattedData} title="Itens" />
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
};

export default ProductList;
