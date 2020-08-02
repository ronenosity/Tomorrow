import React, { useState, useEffect, useCallback } from 'react';
import { Mutation } from 'react-apollo';
import { withCookies } from 'react-cookie';

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

import SIGNIN_MUTATION from '../mutations/SIGNIN_MUTATION';

const Login: React.FC = ({ cookies }) => {
  console.log('cookies', cookies);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState(''); 
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setToken(cookies.get('token') || null);
  }, [cookies]);

  const handleEmail = useCallback((value) => {
    setEmail(value);
  }, []);

  const handlePassword = useCallback((value) => {
    setPassword(value);
  }, []);

  const handleSignIn = useCallback(async signin => {
    if (!email || !password) {
      return setError({ error: 'Authentication fields must not be empty.' });
    }
    setError(null);
    const { data: { authenticate } } = await signin();
    if (authenticate.id) {
      cookies.remove('token', { path: '/' });
      cookies.set('token', authenticate.token, { path: '/' });
      setToken(authenticate.token);
      window.location.href = '/';
    }
  }, [cookies, email, password]);

    return (
      <Mutation mutation={SIGNIN_MUTATION} variables={{ email, password }}>
        {(signin, { loading }) => {
        return (
          <Wrapper>
            <FormTitle>Login</FormTitle>
            <FormSubtitle>Access to the platform with your data.</FormSubtitle>
            <FormRow>
              <Label>Email</Label>
              <Input type="email" name="login-email" value={email} onChange={e => handleEmail(e.target.value)} />
            </FormRow>
            <FormRow>
              <Label>Password</Label>
              <Input
                type="password"
                name="login-password"
                value={password}
                onChange={e => handlePassword(e.target.value)}
              />
            </FormRow>
            {error && (
            <FormRow>
              <ErrorField>{error}</ErrorField>
            </FormRow>
            )}
            <FormRow>
              <Button onClick={() => handleSignIn(signin)} disabled={loading}>
                {loading ? 'Authenticating...' : 'Log In'}
              </Button>
            </FormRow>
          </Wrapper>
        );
        }}
      </Mutation>
    );
};

export default withCookies(Login);
