import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { get, noop } from 'lodash';
import { GraphQLError } from 'graphql';
import ALL_COMMUNITIES_QUERY from '../../../front-end-queries/all-communities';
import CREATE_COMMUNITY_MUTATION from '../../../front-end-mutations/create-community';
import EDIT_COMMUNITY_MUTATION from '../../../front-end-mutations/edit-community';
import DELETE_COMMUNITY_MUTATION from '../../../front-end-mutations/delete-community';
import Snack from '../../snack';
import parseGraphQlErrors from '../../../utils/parseGraphQlErrors';

interface CreateCommunityParams {
  variables: {
    name?: string;
    description?: string;
    picture?: string;
    category?: string;
    id?: string;
  };
}

interface ContextValue {
  communities: Record<any, any>;
  loading: boolean;
  error: GraphQLError | null;
  setError: (e: GraphQLError) => void;
  createCommunity: (params: CreateCommunityParams) => void;
  editCommunity: (params: CreateCommunityParams) => void;
  deleteCommunity: (params: CreateCommunityParams) => void;
  refetch: () => void;
}
const INITIAL_VALUES = {
  communities: null,
  loading: false,
  error: null,
  setError: noop,
  createCommunity: noop,
  editCommunity: noop,
  deleteCommunity: noop,
  refetch: noop,
};

const CommunitiesContext = createContext(INITIAL_VALUES);

const useCommunitiesContextInitialValue = (): ContextValue => {
  const [communities, setCommunities] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createCommunity, { loading: creatingLoading, error: creatingError }] = useMutation(CREATE_COMMUNITY_MUTATION);
  const [editCommunity, { loading: editLoading, error: editError }] = useMutation(EDIT_COMMUNITY_MUTATION);
  const [deleteCommunity, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_COMMUNITY_MUTATION);
  const { loading: qLoading, error: qError, data, refetch } = useQuery(ALL_COMMUNITIES_QUERY);

  useEffect(() => {
    setCommunities(get(data, 'communities'));
    setLoading(qLoading || creatingLoading || editLoading || deleteLoading);
  }, [qLoading, data, setLoading, setCommunities, creatingLoading, editLoading, deleteLoading]);

  useEffect(() => {
    setError(qError || editError || creatingError || editError || deleteError);
  }, [qError, editError, creatingError, setError, deleteError]);

  return {
    communities,
    loading,
    error,
    setError,
    createCommunity,
    refetch,
    editCommunity,
    deleteCommunity,
  };
};

export const useCommunitiesContext = (): ContextValue => useContext(CommunitiesContext);

interface Props {
  children: React.ReactNode;
}
const CommunitiesProvider: React.FC<Props> = ({ children }: Props) => {
  const value = useCommunitiesContextInitialValue();
  return (
    <CommunitiesContext.Provider value={value}>
      <Snack
        severity="error"
        isOpen={!!value.error}
        messages={parseGraphQlErrors(value.error)}
        onClose={(): void => {
          value.setError(undefined);
        }}
      />
      {children}
    </CommunitiesContext.Provider>
  );
};

export default CommunitiesProvider;
