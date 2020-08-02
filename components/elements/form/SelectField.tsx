import React, { useCallback, ChangeEvent, ReactNode } from 'react';
import { getIn, useFormikContext } from 'formik';
import Select from '@material-ui/core/Select';

interface Props {
    fieldPath: string;
    label?: string;
    children?: ReactNode;
}

const SelectField: React.FC<Props> = ({ fieldPath, label, children}: Props) => {
    const { values, errors, touched, setFieldValue, handleBlur } = useFormikContext();
    const value = getIn(values, fieldPath, '');
    const error = getIn(errors, fieldPath, false);
    const isTouched = getIn(touched, fieldPath);
    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setFieldValue(fieldPath, e.target.value);
        },
        [fieldPath, setFieldValue],
    );
    return (
      <>
        <Select
          onBlur={handleBlur}
          value={value}
          onChange={onChange}
          error={error && isTouched}
          variant="outlined"
          label={label}
          style={{ width: '100%' }}
        >
          {children}
        </Select>
      </>
    );
};

export default SelectField;
