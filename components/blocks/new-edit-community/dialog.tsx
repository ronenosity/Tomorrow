import React, { useCallback } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { object, string } from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import InputField from '../../elements/form/InputField';
import SubmitButton from '../submit-button';
import CREATE_COMMUNITY_MUTATION from '../../../front-end-mutations/create-community';
import { useCommunitiesContext } from '../../contexts/communities';

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
};

const SCHEMA = object().shape({
  name: string().required(),
  description: string().required(),
  picture: string().required(),
});

const useInitialValues = (community?: Record<any, any>): {} => {
  if (!community) return INITIAL_VALUES;
  return {
    name: community.name,
    description: community.description,
    picture: community.picture,
  };
};

const FormDialog: React.FC<Props> = ({ community, isOpen, close }: Props) => {
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
