import React, { useCallback } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, InputLabel } from '@material-ui/core';
import { object, string } from 'yup';
import { Formik } from 'formik';
import {map} from 'lodash';
import InputField from '../../elements/form/InputField';
import SubmitButton from '../submit-button';
import { useCommunitiesContext } from '../../contexts/communities';
import { useCategoriesContext } from "../../contexts/categories";
import SelectField from "../../elements/form/SelectField";

interface Props {
  community?: Record<any, any>;
  isOpen: boolean;
  close: () => void;
  toggle: () => void;
}

const INITIAL_VALUES = {
  name: '',
  description: '',
  picture: '',
  category: '',
};

const SCHEMA = object().shape({
  name: string().required(),
  description: string().required(),
  picture: string().required(),
  category: string().required(),
});

const useInitialValues = (community?: Record<any, any>): {} => {
  if (!community) return INITIAL_VALUES;
  return {
    name: community.name,
    description: community.description,
    picture: community.picture,
    category: community.category
  };
};

const FormDialog: React.FC<Props> = ({ community, isOpen, close }: Props) => {
  const { categories } = useCategoriesContext();
  const initialValues = useInitialValues(community);
  const { createCommunity, loading, refetch, editCommunity } = useCommunitiesContext();
  const onSubmit = useCallback(
    async values => {
      if (!community) {
        await createCommunity({ variables: { ...values } });
      } else {
        await editCommunity({ variables: { ...values, id: community.id } });
      }
      close();
      refetch();
    },
    [createCommunity, editCommunity, refetch, close, community],
  );

  if (!isOpen) return null;
  return (
    <Formik validationSchema={SCHEMA} initialValues={initialValues} onSubmit={onSubmit}>
      <Dialog open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{community ? 'Edit Community' : 'Create Community'}</DialogTitle>
        <DialogContent>
          <InputField fieldPath="name" label="Name" autoFocus />
          <InputField fieldPath="description" label="Description" />
          <InputLabel>Category</InputLabel>
          <SelectField
            fieldPath="category"
            label="category"
          >
            {map(categories, (c, index) => (
              <MenuItem value={c.name} key={`${c.name}-${index}-key`}>
                {c.name}
              </MenuItem>
            ))}
          </SelectField>
          <InputField fieldPath="picture" label="Picture" />
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
