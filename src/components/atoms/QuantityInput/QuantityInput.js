import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const QuantityInput = ({ value, onChange }) => {
  // Garantir que o valor do input seja tratado como número
  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    // Passa o novo valor para a função de alteração, garantindo que seja um número válido
    if (newValue >= 1) {
      onChange(newValue);
    }
  };

  return (
    <TextField
      type="number"
      value={value}
      onChange={handleChange} // Usa a função handleChange para processar o valor
      label="Quantidade"
      variant="outlined"
      sx={{ width: 80 }}
      InputProps={{
        inputProps: { min: 1 }, // Garante que o valor mínimo seja 1
      }}
    />
  );
};

QuantityInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuantityInput;
  