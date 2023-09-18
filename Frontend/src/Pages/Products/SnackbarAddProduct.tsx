import React, { useState } from 'react';
import { Snackbar } from '@mui/material';

export default function SnackbarAddProduct ({ open, onClose }) {
  
  return (
    <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={onClose}
        message={"Produkten har lagts i kundvagnen"}
    />
  );
}
