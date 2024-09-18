import React, { useState } from 'react';
import { Grid, Typography, Box, Badge, Divider, Pagination, TextField } from '@mui/material';
import { CartItem } from '../../molecules/Index';

const CartSection = ({ cart = [], onUpdateDetail, onRemove }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Número de itens por página
  const [searchTerm, setSearchTerm] = useState('');

  // Calcula o total de itens no carrinho
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filtro de busca
  const filteredCart = cart.filter(item =>
    item.productDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCart.length / itemsPerPage);
  const paginatedCart = filteredCart.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <Typography variant="h6" color="textSecondary">Carrinho vazio</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      {/* Cabeçalho da Tabela com Total de Itens e Barra de Busca */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Carrinho</Typography>
        <Badge badgeContent={totalItems} color="primary">
          <Typography variant="subtitle2">Total de Itens</Typography>
        </Badge>
      </Box>

      {/* Barra de Pesquisa */}
      <TextField
        label="Buscar por descrição"
        variant="outlined"
        fullWidth
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Divider sx={{ marginBottom: 2 }} />

      {/* Itens do Carrinho Paginados */}
      <Grid container spacing={0}>
        {paginatedCart.map((saleDetail, index) => (
          <Grid item xs={12} key={saleDetail.saleDetailId}>
            <CartItem
              saleDetail={saleDetail}
              onUpdateDetail={onUpdateDetail}
              onRemove={onRemove}
              index={index} // Aqui passamos o índice para exibir o número do item
            />
          </Grid>
        ))}
      </Grid>

      {/* Paginação */}
      <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CartSection;
