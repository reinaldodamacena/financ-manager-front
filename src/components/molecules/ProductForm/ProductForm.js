import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Input, Button, Modal, Icon } from '../../atoms/Index'; // Adicione o Icon aqui

const ProductForm = ({ product, onSave, onCancel, open }) => (
  <Modal
    open={open}
    onClose={onCancel}
    actions={
      <>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          endIcon={<Icon name="CheckCircle" />} // Icone de salvar
          onClick={onSave}
          sx={{ marginBottom: 2 }}
        >
          Salvar
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          endIcon={<Icon name="Cancel" />} // Icone de cancelar
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </>
    }
  >
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Input
          label="Nome do Produto"
          value={product.name}
          onChange={(e) => product.setName(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          label="Código do Produto"
          value={product.code}
          onChange={(e) => product.setCode(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          label="Preço"
          type="number"
          value={product.price}
          onChange={(e) => product.setPrice(e.target.value)}
          fullWidth
        />
      </Grid>
    </Grid>
  </Modal>
);

ProductForm.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    setName: PropTypes.func.isRequired,
    setCode: PropTypes.func.isRequired,
    setPrice: PropTypes.func.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ProductForm;
