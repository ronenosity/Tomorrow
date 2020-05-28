import React from 'react';
import { Grid } from '@material-ui/core';
import BaseFooter from '../base-footer';
import Typography from '../../elements/typography';

const Footer: React.FC = () => {
  return (
    <BaseFooter>
      <Grid item xs={12}>
        <Typography>FOOTER</Typography>
      </Grid>
    </BaseFooter>
  );
};

export default Footer;
