import React from 'react';
import { CustomTable } from '../../molecules/Index';

const ProductList = ({ products }) => {
  const columns = [
    { field: 'item', headerName: 'Item' },
    { field: 'code', headerName: 'Código' },
    { field: 'name', headerName: 'Produto' },
    { field: 'quantity', headerName: 'Quantidade' },
    { field: 'unitPrice', headerName: 'Valor Unitário (R$)' },
    { field: 'offerPrice', headerName: 'Valor em Oferta (R$)' },
    { field: 'totalPrice', headerName: 'Valor Total (R$)' },
  ];

  return (
    <CustomTable columns={columns} data={products} title="Itens" />
  );
};

export default ProductList;
