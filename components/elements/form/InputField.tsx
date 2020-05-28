import React, { useCallback, ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import { getIn, useFormikContext } from 'formik';

interface Props {
  fieldPath: string;
  label?: string;
  margin?: 'none' | 'dense' | 'normal' | undefined;
  type?: 'text' | 'number' | 'password';
  multiline?: boolean;
  autoFocus?: boolean;
  InputProps?: {};
}

const InputField: React.FC<Props> = ({
  fieldPath,
  label,
  margin = 'normal',
  type = 'text',
  multiline,
  autoFocus = false,
  InputProps,
}: Props) => {
  const { values, handleSubmit, errors, touched, setFieldValue, handleBlur } = useFormikContext();
  const value = getIn(values, fieldPath, '');
  const error = getIn(errors, fieldPath, false);
  const isTouched = getIn(touched, fieldPath);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFieldValue(fieldPath, e.target.value);
    },
    [fieldPath, setFieldValue],
  );
  const onKeyDown = useCallback(
    e => {
      if (e.keyCode === 13) {
        handleSubmit();
      }
    },
    [handleSubmit],
  );
  return (
    <>
      <TextField
        onBlur={handleBlur}
        type={type}
        fullWidth
        margin={margin}
        value={value}
        onChange={onChange}
        error={error && isTouched}
        variant="outlined"
        label={label}
        helperText={error && isTouched && error}
        onKeyDown={onKeyDown}
        multiline={multiline}
        autoFocus={autoFocus}
        InputProps={InputProps}
        style={{ marginBottom: 10 }}
      />
    </>
  );
};

export default InputField;
