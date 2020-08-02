import React, { useState, useCallback } from 'react';
import { Mutation } from 'react-apollo';

import CREATE_COMMUNITY_MUTATION from '../mutations/CREATE_COMMUNITY_MUTATION';

import { 
  Button, 
  ErrorField, 
  FormRow,  
  FormTitle, 
  Input, 
  Label, 
  Wrapper 
} from './styles';

const AdminFlow = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [error, setError] = useState(null);

  const handleName = useCallback((value) => {
      setName(value);
  }, []);
  const handleDescription = useCallback((value) => {
      setDescription(value);
  }, []);

  const handlePicture = useCallback((value) => {
      setPicture(value);
  }, []);

  const handleSubmit = useCallback(async (callback) => {    
    if (!name || !description|| !picture) {
        return setError({ error: 'Some of your fields are empty.' });
    }
    setError({ error: null });
    const { data } = await callback();
    if (data) {
        window.location.href = '/';
    }    
  }, [description, name, picture]);
  return (
    <Mutation mutation={CREATE_COMMUNITY_MUTATION} variables={{ name, description, picture }}>
      {(createCommunity, { loading }) => {
              return (
                <Wrapper>
                  <FormTitle>Add a new Community</FormTitle>
                  <FormRow>
                    <Label>Name</Label>
                    <Input type="text" name="name" value={name} onChange={e => handleName(e.target.value)} />
                  </FormRow>
                  <FormRow>
                    <Label>Description</Label>
                    <Input
                      type="text"
                      name="description"
                      value={description}
                      onChange={e => handleDescription(e.target.value)}
                    />
                  </FormRow>
                  <FormRow>
                    <Label>Picture</Label>
                    <Input type="text" name="picture" value={picture} onChange={e => handlePicture(e.target.value)} />
                  </FormRow>
                  {error && (
                  <FormRow>
                    <ErrorField>{error}</ErrorField>
                  </FormRow>
                  )}
                  <FormRow>
                    <Button onClick={() => handleSubmit(createCommunity)} disabled={loading}>
                      {loading ? 'Creating...' : 'Create'}
                    </Button>
                  </FormRow>
                </Wrapper>
              );
          }}
    </Mutation>
  );
};

export default AdminFlow;