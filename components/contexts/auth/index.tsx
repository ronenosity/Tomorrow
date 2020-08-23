import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { get, noop } from 'lodash';
import AUTH_QUERY from '../../../front-end-queries/auth';

interface User {
  id: string;
  role: string;
  accountDisabled: boolean;
  stars: number;
  email: string;
  password: string;
  username: string;
  name: string;
  lastName: string;
  subscriptions: string[];
}

interface ContextValue {
  user: Record<any, any>;
  isAdmin: boolean;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}
const INITIAL_VALUES = {
  user: null,
  isAdmin: false,
  loading: false,
  error: null,
  refetch: noop
};

const AuthContext = createContext(INITIAL_VALUES);

const useAuthContextInitialValue = (): ContextValue => {
  const [user, setUser] = useState({} as User);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { loading: qLoading, error: qError, data, refetch  } = useQuery(AUTH_QUERY);
  const isAdmin = get(user, 'role') === 'ADMIN';
  useEffect(() => {
    setUser(get(data, 'auth'));
    setLoading(qLoading);
    setError(qError);
  }, [qLoading, qError, data, setLoading, setError, setUser]);
  return {
    refetch,
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
