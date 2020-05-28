import React, { useCallback } from 'react';
import { Link as MuiLink, LinkProps, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '../typography';

interface Props {
  i18n?: string;
  i18nCaption?: string;
  route: string;
  contrast?: boolean;
  children?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: '0 5px',
    },
    text: {
      color: theme.palette.grey.A200,
    },
  }),
);

const Link: React.FC<Props & LinkProps> = ({
  i18n,
  route,
  i18nCaption,
  contrast,
  children,
  ...rest
}: Props & LinkProps) => {
  const classes = useStyles();
  const navigateTo = (): void => null;
  const onClick = useCallback(() => {
    navigateTo();
  }, [navigateTo]);

  return (
    <MuiLink onClick={onClick} className={classes.container} {...rest}>
      {!children ? (
        <Typography i18n={i18n} variant="h6" className={contrast ? classes.text : ''} />
      ) : (
        <Typography variant="h6" className={contrast ? classes.text : ''}>
          {children}
        </Typography>
      )}
      {i18nCaption && <Typography i18n={i18nCaption} variant="caption" className={contrast ? classes.text : ''} />}
    </MuiLink>
  );
};

export default Link;
