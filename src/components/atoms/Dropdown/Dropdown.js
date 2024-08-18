import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)(({ theme, borderRadius, borderWidth, borderColor, focusBorderColor, hoverBorderColor }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: borderRadius || theme.shape.borderRadius,
    borderWidth: borderWidth || '1px',
    borderColor: borderColor || theme.palette.divider,
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: hoverBorderColor || theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: focusBorderColor || theme.palette.primary.dark,
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.6vh',
    },
    '&.Mui-focused': {
      color: focusBorderColor || theme.palette.primary.main,
    },
  },
}));

const Dropdown = ({ label, options, value, onChange, borderRadius, borderWidth, borderColor, focusBorderColor, hoverBorderColor, ...props }) => {
  return (
    <StyledFormControl
      variant="outlined"
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      borderColor={borderColor}
      focusBorderColor={focusBorderColor}
      hoverBorderColor={hoverBorderColor}
      {...props}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  borderRadius: PropTypes.string,
  borderWidth: PropTypes.string,
  borderColor: PropTypes.string,
  focusBorderColor: PropTypes.string,
  hoverBorderColor: PropTypes.string,
};

export default Dropdown;
