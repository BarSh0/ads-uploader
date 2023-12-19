import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import * as React from 'react';
import { StyledDialog } from '../AutomationComponents/styles';

type AutomationDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  unShowButtons?: boolean;
};

const Dialog = ({ open, setOpen, title, description, children, unShowButtons }: AutomationDialogProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="lg">
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {description && <DialogContentText>{description}</DialogContentText>}

        {children}
      </DialogContent>
      {!unShowButtons && (
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      )}
    </StyledDialog>
  );
};

export default Dialog;
