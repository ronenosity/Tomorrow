import * as React from 'react';
import { createStyles, Grid, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  children: React.ReactNode;
}
interface StaticProps {
  Header: React.FC<Props>;
  Content: React.FC<Props>;
  Footer: React.FC<Props>;
}
type Component = React.FC<Props> & StaticProps;

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'grid',
      minHeight: '100vh',
      gridTemplateRows: '60px auto 100px',
    },
    content: {
      padding: '15px 80px',
      alignContent: 'flex-start',
    },
  }),
);

const Page: Component = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <CssBaseline />
      {children}
    </Grid>
  );
};

const Header: React.FC<Props> = ({ children }: Props) => <Grid container>{children}</Grid>;
const Content: React.FC<Props> = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.content}>
      {children}
    </Grid>
  );
};
const Footer: React.FC<Props> = ({ children }: Props) => <Grid container>{children}</Grid>;

Page.Header = Header;
Page.Content = Content;
Page.Footer = Footer;

export default Page;
