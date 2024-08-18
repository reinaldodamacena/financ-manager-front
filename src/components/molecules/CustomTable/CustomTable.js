import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)(({ theme, customWidth, customHeight }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  overflow: 'hidden',
  width: customWidth || '100%',  // Permite ajuste de largura
  height: customHeight || 'auto', // Permite ajuste de altura
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderBottom: `0vh solid ${theme.palette.divider}`,
  padding: '1rem',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.default,
  },
}));

const TableWrapper = styled('div')(({ theme, customWidth, customHeight }) => ({
  padding: '2rem',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  overflow: 'hidden',
  width: customWidth || '100%',  // Permite ajuste de largura
  height: customHeight || 'auto', // Permite ajuste de altura
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: '1rem',
  textAlign: 'center',
  color: theme.palette.primary.main,
}));

const CustomTable = ({ columns, data = [], title, rowsPerPageOptions, defaultRowsPerPage, customWidth, customHeight }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage || 5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <TableWrapper customWidth={customWidth} customHeight={customHeight}>
      {title && (
        <Title variant="h5">{title}</Title>
      )}
      <StyledTableContainer component={Paper} customWidth={customWidth} customHeight={customHeight}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.field} align={column.align || 'left'}>
                  {column.headerName}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <StyledTableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={`${index}-${column.field}`} align={column.align || 'left'}>
                      {row[column.field]}
                    </TableCell>
                  ))}
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Nenhum dado disponível
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={columns.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions || [5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableWrapper>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired, // Chave do campo nos dados
      headerName: PropTypes.string.isRequired, // Nome exibido na cabeça da tabela
      align: PropTypes.oneOf(['left', 'right', 'center']), // Alinhamento opcional das células
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object), // Array de objetos contendo os dados
  title: PropTypes.string, // Título da tabela
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number), // Opções para o número de linhas por página
  defaultRowsPerPage: PropTypes.number, // Número padrão de linhas por página
  customWidth: PropTypes.string, // Permite ajuste de largura do componente
  customHeight: PropTypes.string, // Permite ajuste de altura do componente
};

CustomTable.defaultProps = {
  data: [],
};

export default CustomTable;
4