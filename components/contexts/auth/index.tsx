import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { get } from 'lodash';
import AUTH_QUERY from '../../../front-end-queries/auth';

interface ContextValue {
  user: Record<any, any>;
  isAdmin: boolean;
  loading: boolean;
  error: Error | null;
}
const INITIAL_VALUES = {
  user: null,
  isAdmin: false,
  loading: false,
  error: null,
};

const AuthContext = createContext(INITIAL_VALUES);

const useAuthContextInitialValue = (): ContextValue => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { loading: qLoading, error: qError, data } = useQuery(AUTH_QUERY);
  const isAdmin = get(user, 'role') === 'ADMIN';
  useEffect(() => {
    setUser(get(data, 'auth'));
    setLoading(qLoading);
    setError(qError);
  }, [qLoading, qError, data, setLoading, setError, setUser]);
  return {
    user,
    isAdmin,
    loading,
    error,
  };
};

export const useAuthContext = (): ContextValue => useContext(AuthContext);

interface Props {
  children: React.ReactNode;
}
const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const value = useAuthContextInitialValue();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
