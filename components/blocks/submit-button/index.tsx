import React from 'react';
import { useFormikContext } from 'formik';
import { Button, CircularProgress } from '@material-ui/core';

interface Props {
  text: string;
  loading: boolean;
}
const SubmitButton: React.FC<Props> = ({ text, loading }: Props) => {
  const { handleSubmit } = useFormikContext();
  return (
    <Button onClick={(): void => handleSubmit()} disabled={loading}>
      {loading ? <CircularProgress /> : text}
    </Button>
  );
};

export default SubmitButton;
