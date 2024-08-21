import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  overflow: 'hidden',
  width: '100%',
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
  '&:nth-of-type(1)': {
    width: '5%',
    textAlign: 'center',
  },
  '&:nth-of-type(2)': {
    width: '10%',
    textAlign: 'center',
  },
  '&:nth-of-type(3)': {
    width: '40%',
  },
  '&:nth-of-type(4)': {
    width: '10%',
    textAlign: 'center',
  },
  '&:nth-of-type(5), &:nth-of-type(6), &:nth-of-type(7)': {
    width: '10%',
    textAlign: 'right',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.default,
  },
  '& td, & th': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover, // Mantém o hover consistente
  },
}));

const CustomTable = ({ columns, data = [] }) => {
  return (
    <StyledTableContainer component={Paper}>
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
          {data.map((row, index) => (
            <StyledTableRow key={index}>
              {columns.map((column) => (
                <TableCell key={`${index}-${column.field}`} align={column.align || 'left'}>
                  {row[column.field]}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      align: PropTypes.oneOf(['left', 'right', 'center']),
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};

CustomTable.defaultProps = {
  data: [],
};

export default CustomTable;
