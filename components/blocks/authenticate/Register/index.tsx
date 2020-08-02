import React, { useState, useCallback } from 'react';
import { Mutation } from 'react-apollo';

import {
  Button,
  ErrorField,
  FormRow,
  FormTitle,
  Input,
  Label,
  Wrapper,
  FormSubtitle
} from './styles';

import { graphQLErrorHandler } from '../../../../lib/graphql.utils';
import SIGNUP_MUTATION from '../mutations/SIGNUP_MUTATION';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastname] = useState('');
  const [error, setError] = useState(null);   

  const handleEmail = useCallback((value) => {
    setEmail(value);
  }, []);

  const handleUsername = useCallback((value) => {
    setUsername(value);
  }, []);

  const handlePassword = useCallback((value) => {
    setPassword(value);
  }, []);

  const handleName = useCallback((value) => {
    setName(value);
  }, []);

  const handleLastName = useCallback((value) => {
    setLastname(value);
  }, []);

  const handleSignup = useCallback(async signup => {
    if (!email || !username || !password || !name || !lastName) {
      return setError('Fields must not be empty');
    }
    setError(null);
    let mutationResult;
    try {
      mutationResult = await signup();
    } catch (mutationError) {
      const graphQLError = graphQLErrorHandler(mutationError);
      console.warn({ error });
      return setError(graphQLError.message);
    }      
    const { data: { createUser: user } } = mutationResult;
    if (user.id) {
      window.location.href = '/';
    }
    }, [email, error, lastName, name, password, username]);
        return (
          <Mutation mutation={SIGNUP_MUTATION} variables={{ email, username, password, name, lastName }}>
            {(signup) => {
              return (
                <Wrapper>
                  <FormTitle>Register</FormTitle>
                  <FormSubtitle>Create a new account into the platform.</FormSubtitle>
                  <FormRow>
                    <Label>Email</Label>
                    <Input
                      type="text"
                      name="register-email"
                      value={email}
                      onChange={e => handleEmail(e.target.value)}
                    />
                  </FormRow>
                  <FormRow>
                    <Label>Username</Label>
                    <Input
                      type="text"
                      name="register-username"
                      value={username}
                      onChange={e => handleUsername(e.target.value)}
                    />
                  </FormRow>
                  <FormRow>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      name="register-password"
                      value={password}
                      onChange={e => handlePassword(e.target.value)}
                    />
                  </FormRow>
                  <FormRow>
                    <Label>Name</Label>
                    <Input type="text" name="register-name" value={name} onChange={e => handleName(e.target.value)} />
                  </FormRow>
                  <FormRow>
                    <Label>Last name</Label>
                    <Input
                      type="text"
                      name="register-last-name"
                      value={lastName}
                      onChange={e => handleLastName(e.target.value)}
                    />
                  </FormRow>
                  {error && (
                  <FormRow>
                    <ErrorField>{error}</ErrorField>
                  </FormRow>
                      )}
                  <FormRow>
                    <Button onClick={() => handleSignup(signup)}>Create Account</Button>
                  </FormRow>
                </Wrapper>
              );
          }}
          </Mutation>
  );
};

export default Register;