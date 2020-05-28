import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  messages: string[];
  severity: 'success' | 'error';
}

const Snack: React.FC<Props> = ({ isOpen, onClose, messages, severity }: Props) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert onClose={onClose} severity={severity}>
        {messages}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
