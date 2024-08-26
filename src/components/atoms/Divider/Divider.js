import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Divider as MuiDivider } from '@mui/material';

const StyledDivider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(2, 0), // Ajuste das margens
  borderBottomWidth: 2, // Espessura da linha
  borderColor: theme.palette.primary.main, // Cor da linha, utilizando a paleta do tema
  borderRadius: theme.shape.borderRadius, // Adiciona bordas arredondadas
  boxShadow: theme.shadows[2], // Adiciona uma leve sombra
  backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, // Adiciona um gradiente
}));

const Divider = (props) => {
  return <StyledDivider {...props} />;
};

Divider.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  flexItem: PropTypes.bool,
};

Divider.defaultProps = {
  orientation: 'horizontal',
  flexItem: false,
};

export default Divider;
