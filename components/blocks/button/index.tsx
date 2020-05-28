import React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import Typography from '../../elements/typography';

interface Props {
  onClick: () => void;
  i18n?: string;
  children?: React.ReactNode;
}
const Button: React.FC<Props> = ({ onClick, i18n, children }: Props) => {
  return (
    <MuiButton size="small" fullWidth variant="contained" color="primary" onClick={onClick}>
      {children}
      {i18n && <Typography i18n={i18n} />}
    </MuiButton>
  );
};
export default Button;
