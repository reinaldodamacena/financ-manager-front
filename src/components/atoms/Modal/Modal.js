import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogActions } from '@mui/material';

const Modal = ({ open, onClose, children, actions }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogContent>
      {children}
    </DialogContent>
    {actions && <DialogActions>{actions}</DialogActions>}
  </Dialog>
);

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
};

Modal.defaultProps = {
  actions: null,
};

export default Modal;
