import React from 'react';
import { CircularProgress, Dialog, Grid, makeStyles, Typography } from '@material-ui/core';


const WaitingDialog = ({open}) => {
    const classes = useStyle();
    return (
      <Dialog
        open={open}
        fullWidth
        maxWidth='xs'
      >
        <Grid container style={{paddingTop: '5%'}}>
          <Grid justify='center' container item xs={12}>
            <CircularProgress size={60}  />
          </Grid>
          <Grid justify='center' container item xs={12}>    
            <Typography className={classes.text} >Waiting for player reply</Typography>
          </Grid>
        </Grid>
      </Dialog>
    );
}


const useStyle = makeStyles({
  text: {
    marginTop: '5%',
    marginBottom: '2%',
    fontFamily: 'NerkoOne',
    fontSize: '2rem',
  }
});

export default WaitingDialog;