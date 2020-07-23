import React, { useCallback } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { object, string } from 'yup';
import { Formik } from 'formik';
import InputField from '../../elements/form/InputField';
import SubmitButton from '../submit-button';
import { useCommunitiesContext } from '../../contexts/communities';
import { useCategoriesContext } from '../../contexts/categories';

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

const FormDialog: React.FC<Props> = ({ category, isOpen, close }: Props) => {
  const initialValues = useInitialValues(category);
  const { createCategory, loading, refetch, } = useCategoriesContext();
  const onSubmit = useCallback(
    async values => {
      if (!category) {
        await createCategory({ variables: { ...values } });
      }
      close();
      refetch();
    },
    [createCategory, refetch, close, category],
  );
  if (!isOpen) return null;
  return (
    <Formik validationSchema={SCHEMA} initialValues={initialValues} onSubmit={onSubmit}>
      <Dialog open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{category ? 'Edit Category' : 'Create Category'}</DialogTitle>
        <DialogContent>
          <InputField fieldPath="name" label="Name" autoFocus />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <SubmitButton text="Save" loading={loading} />
        </DialogActions>
      </Dialog>
    </Formik>
  );
};

export default FormDialog;
