import React, { useState, useCallback } from 'react';
import {
  Button, 
  Wrapper, 
  Label, 
  Input, 
  FormTitle, 
  FormSubtitle, 
  FormRow, 
  ErrorField 
} from './styles';

const ADMIN_KEY = 'protosets';

interface AdminKeyProps {
  Form: React.ComponentType;
}

const AdminKey: React.FC<AdminKeyProps> = ({ Form }) => {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState('');
  const [error, setError] = useState(null);  

  const handleKey = useCallback((value) => {
    setKey(value);
  }, []); 

  const handleOpen = () => {
    if (key === ADMIN_KEY) {
      setOpen(true);
    } else {
      setOpen(false);
      setError('Wrong key, please try again');
    }
  };
  if (open) return <Form />;

  return (
    <Wrapper>
      <FormTitle>ADMIN</FormTitle>
      <FormSubtitle>Please inform your admin key.</FormSubtitle>
      <FormRow>
        <Label>KEY</Label>
        <Input type="password" name="key" onChange={e => handleKey(e.target.value)} />
      </FormRow>
      {error && (
      <FormRow>
        <ErrorField>{error}</ErrorField>
      </FormRow>
          )}
      <FormRow>
        <Button onClick={handleOpen}>Enter</Button>
      </FormRow>
    </Wrapper>
  );
};

export default AdminKey;