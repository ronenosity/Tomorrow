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
import SUBSCRIBE_COMMUNITY_MUTATION from '../../../front-end-mutations/subscribe-community';
import UNSUBSCRIBE_COMMUNITY_MUTATION from '../../../front-end-mutations/unsubscribe-community';

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
  subscribeCommunity: (params: CreateCommunityParams) => void;
  unsubscribeCommunity: (params: CreateCommunityParams) => void;
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
  subscribeCommunity: noop,
  unsubscribeCommunity: noop,
  refetch: noop,
};

interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  slug: string;
  picture: string;
  likes: string;
  threads_count: string;
  subscriptions: string[];
}

interface Communities {
  communities: Community[];
}

const CommunitiesContext = createContext(INITIAL_VALUES);

const useCommunitiesContextInitialValue = (): ContextValue => {
  const [communities, setCommunities] = useState({} as Communities);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subscribeCommunity, { loading: subscribingLoading, error: subscribingError }] = useMutation(SUBSCRIBE_COMMUNITY_MUTATION);
  const [unsubscribeCommunity, { loading: unsubscribingLoading, error: unsubscribingError }] = useMutation(UNSUBSCRIBE_COMMUNITY_MUTATION);
  const [createCommunity, { loading: creatingLoading, error: creatingError }] = useMutation(CREATE_COMMUNITY_MUTATION);
  const [editCommunity, { loading: editLoading, error: editError }] = useMutation(EDIT_COMMUNITY_MUTATION);
  const [deleteCommunity, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_COMMUNITY_MUTATION);
  const { loading: qLoading, error: qError, data, refetch } = useQuery(ALL_COMMUNITIES_QUERY);

  useEffect(() => {
    setCommunities(get(data, 'communities'));
    setLoading(qLoading || creatingLoading || editLoading || deleteLoading || subscribingLoading || unsubscribingLoading);
  }, [qLoading, data, setLoading, setCommunities, creatingLoading, editLoading, deleteLoading, subscribingLoading, unsubscribingLoading]);

  useEffect(() => {
    setError(qError || editError || creatingError || editError || deleteError || subscribingError || unsubscribingError);
  }, [subscribingError, qError, editError, creatingError, setError, deleteError, unsubscribingError]);

  return {
    communities,
    loading,
    error,
    setError,
    createCommunity,
    refetch,
    editCommunity,
    deleteCommunity,
    subscribeCommunity,
    unsubscribeCommunity,
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
