import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Toolbar, AppBar as MdAppBar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: theme.palette.secondary.dark,
      padding: 30,
    },
  }),
);

interface Props {
  children: React.ReactNode;
}

const BaseFooter: React.FC<Props> = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MdAppBar position="static" className={classes.appBar}>
        <Toolbar>{children}</Toolbar>
      </MdAppBar>
    </div>
  );
};

export default BaseFooter;
