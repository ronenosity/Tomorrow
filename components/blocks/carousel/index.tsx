import React, { useCallback } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Container } from '@material-ui/core';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import { map, size, slice } from 'lodash';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      margin: '25px 0',
    },
    container: {
      alignSelf: 'center',
      padding: 0,
      margin: 0,
      width: 'fit-content',
    },
  }),
);

interface Props {
  data: any[];
  renderItem: (item: any) => React.ReactNode;
  maxSteps?: number;
}
const Carousel: React.FC<Props> = ({ data, renderItem, maxSteps: maxStepsProp }: Props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [maxSteps] = React.useState(maxStepsProp || 4);

  const handleNext = useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }, [setActiveStep]);

  const handleBack = useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }, [setActiveStep]);

  const cantGoBack = activeStep === 0;
  const cantGoNext = activeStep === size(data) - maxSteps;

  return (
    <Grid item xs={12}>
      <Grid container justify="center" spacing={2} className={classes.root}>
        <Container className={classes.container}>
          <IconButton onClick={handleBack} disabled={cantGoBack}>
            <MdArrowBack />
          </IconButton>
        </Container>
        {map(slice(data, activeStep, activeStep + maxSteps), renderItem)}
        <Container className={classes.container}>
          <IconButton onClick={handleNext} disabled={cantGoNext}>
            <MdArrowForward />
          </IconButton>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Carousel;
