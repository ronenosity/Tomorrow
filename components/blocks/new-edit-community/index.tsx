import React from 'react';
import { Button } from '@material-ui/core';
import useIsOpen from '../../../hooks/useIsOpen';
import FormDialog from './dialog';

const NewEditCommunity: React.FC = () => {
  const { isOpen, close, toggle } = useIsOpen();
  return (
    <div style={{ margin: '10px 0' }}>
      <Button variant="contained" color="secondary" onClick={toggle}>
        Create new community
      </Button>
      <FormDialog isOpen={isOpen} close={close} toggle={toggle} />
    </div>
  );
};

export default NewEditCommunity;
