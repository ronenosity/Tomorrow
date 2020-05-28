import React from 'react';
import { Grid, Container } from '@material-ui/core';
import Link from 'next/link';
import AppBar from '../app-bar';
import Typography from '../../elements/typography';
import Button from '../button';

const NavBar: React.FC = () => {
  return (
    <AppBar>
      <Grid xs={3} item>
        <Link href="/">
          <Button onClick={null}>
            <Typography variant="body2" color="secondary">
              Back to DashBoard
            </Typography>
          </Button>
        </Link>
      </Grid>
      <Grid item xs={9}>
        <Container>
          <Typography>TOMORROW - ADMIN PAGE</Typography>
        </Container>
      </Grid>
    </AppBar>
  );
};

export default NavBar;
