import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { get, noop } from 'lodash';
import { GraphQLError } from 'graphql';
import ALL_CATEGORIES_MUTATION from '../../../front-end-queries/all-categories';
import CREATE_CATEGORY_MUTATION from '../../../front-end-mutations/create-category';
import Snack from '../../snack';
import parseGraphQlErrors from '../../../utils/parseGraphQlErrors';
import DELETE_CATEGORY_MUTATION from "../../../front-end-mutations/delete-category";
import UPDATE_CATEGORY_MUTATION from "../../../front-end-mutations/edit-category";

interface CreateCategoryParams {
    variables: {
        name?: string;
        id?: string;
    };
}

interface ContextValue {
    categories: Record<any, any>;
    loading: boolean;
    error: GraphQLError | null;
    setError: (e: GraphQLError) => void;
    createCategory: (params: CreateCategoryParams) => void;
    deleteCategory: (params: CreateCategoryParams) => void;
    updateCategory: (params: CreateCategoryParams) => void;
    refetch: () => void;
}

const INITIAL_VALUES = {
    categories: null,
    loading: false,
    error: null,
    setError: noop,
    refetch: noop,
    createCategory: noop,
    deleteCategory: noop,
    updateCategory: noop,
};

const CategoriesContext = createContext(INITIAL_VALUES);

const useCategoriesContextInitialValue = (): ContextValue => {
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [createCategory, { loading: creatingLoading, error: creatingError }] = useMutation(CREATE_CATEGORY_MUTATION);
    const [deleteCategory, { loading: deletingLoading, error: deletingError }] = useMutation(DELETE_CATEGORY_MUTATION);
    const [updateCategory, { loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_CATEGORY_MUTATION);
    const { loading: qLoading, error: qError, data, refetch } = useQuery(ALL_CATEGORIES_MUTATION);

    useEffect(() => {
        setCategories(get(data, 'categories'));
        setLoading(qLoading || creatingLoading || deletingLoading || updatingLoading);
    }, [qLoading, data, setLoading, setCategories, creatingLoading, deletingLoading, updatingLoading]);

    useEffect(() => {
        setError(qError || creatingError || deletingError || updatingError);
    }, [qError, creatingError, setError, deletingError, updatingError]);

    return {
        categories,
        loading,
        error,
        setError,
        createCategory,
        deleteCategory,
        updateCategory,
        refetch,
    };
};

export const useCategoriesContext = (): ContextValue => useContext(CategoriesContext);

interface Props {
    children: React.ReactNode;
}
const CategoriesProvider: React.FC<Props> = ({ children }: Props) => {
    const value = useCategoriesContextInitialValue();
    return (
      <CategoriesContext.Provider value={value}>
        <Snack
          severity="error"
          isOpen={!!value.error}
          messages={parseGraphQlErrors(value.error)}
          onClose={(): void => {
          value.setError(undefined);
          }}
        />
        {children}
      </CategoriesContext.Provider>
    );
};

export default CategoriesProvider;
