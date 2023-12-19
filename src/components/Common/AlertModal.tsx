import { Alert, AlertTitle } from '@mui/material';
import React from 'react';

interface AlertModalProps {
  type: string;
  message: string;
}

const AlertModal = ({ type, message }: AlertModalProps) => {
  if (type === 'error')
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message} — <strong>check it out!</strong>
      </Alert>
    );
  if (type === 'warning')
    return (
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        {message} — <strong>check it out!</strong>
      </Alert>
    );
  if (type === 'info')
    return (
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        {message} — <strong>check it out!</strong>
      </Alert>
    );
  return (
    <Alert severity="success">
      <AlertTitle>Success</AlertTitle>
      {message} — <strong>check it out!</strong>
    </Alert>
  );
};

export default AlertModal;
