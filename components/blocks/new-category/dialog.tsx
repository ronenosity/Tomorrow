import React, { useCallback } from 'react';
import {Button, Dialog, DialogTitle, DialogActions, DialogContent, Box, IconButton} from '@material-ui/core';
import { object, string } from 'yup';
import {Formik, useFormikContext} from 'formik';
import { MdAdd } from 'react-icons/md';
import { useCategoriesContext } from '../../contexts/categories';
import CategoriesList from './categoriesList';
import InputField from '../../elements/form/InputField';

interface Props {
  category?: Record<any, any>;
  isOpen: boolean;
  close: () => void;
  toggle: () => void;
}

const INITIAL_VALUES = {
  name: '',
};

const SCHEMA = object().shape({
  name: string().required(),
});

const useInitialValues = (category?: Record<any, any>): {} => {
  if (!category) return INITIAL_VALUES;
  return {
    name: category.name,
  };
};

const AddButton = () => {
  const { handleSubmit, setFieldValue } = useFormikContext();
  const { loading } = useCategoriesContext();

  const Submit = () => {
    handleSubmit();
    setTimeout(() => {
      setFieldValue('name', '', false);
    }, 2000);
  };
  return (
    <IconButton onClick={Submit} disabled={loading}>
      <MdAdd />
    </IconButton>
  );
};

const FormDialog: React.FC<Props> = ({ category, isOpen, close }: Props) => {
  const initialValues = useInitialValues(category);
  const { createCategory, refetch } = useCategoriesContext();

  const onSubmit = useCallback(
    async values => {
      if (!category) {
        await createCategory({ variables: { ...values } });
      }
      refetch();
    },
    [createCategory, refetch, close, category],
  );
  if (!isOpen) return null;
  return (
    <Formik validationSchema={SCHEMA} initialValues={initialValues} onSubmit={onSubmit}>
      <Dialog open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Manage Categories</DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <DialogContent>
              <InputField fieldPath="name" label="Name" autoFocus />
            </DialogContent>
          </Box>
          <Box p={2} marginTop={2}>
            <AddButton />
          </Box>
        </Box>
        <CategoriesList />
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={close} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Formik>
  );
};

export default FormDialog;
