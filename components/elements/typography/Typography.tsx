import * as React from 'react';
import MuiTypography, { TypographyProps } from '@material-ui/core/Typography';

interface Props extends TypographyProps {
  children?: string | number;
  i18n?: string;
  prefix?: string;
  suffix?: string;
}

const Typography: React.FunctionComponent<Props> = ({ children, i18n, prefix, suffix, ...rest }: Props) => {
  let content;
  if (children) content = children;
  else if (i18n) {
    content = i18n;
  }
  content = `${prefix}${content}${suffix}`;
  return <MuiTypography {...rest}>{content}</MuiTypography>;
};

Typography.defaultProps = {
  prefix: '',
  suffix: '',
};

export default Typography;
