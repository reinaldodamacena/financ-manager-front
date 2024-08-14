import React from 'react';
import PropTypes from 'prop-types';
import StyledButton  from './Button.styles';

const Button = ({ variant, children, ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  variant: 'primary',
};

export default Button;
