import React from 'react';
import { Dialog, Grid, makeStyles, Typography } from '@material-ui/core';
import MyButton from '../../components/MyButton';


const ResultDialog = ({open = false, onClose, image, content, buttonText, textSize = '3rem'}) => {
    const classes = useStyle();
    return (
      <Dialog
        open={open}      
        maxWidth='xs'
        fullWidth
        onClose={onClose}
      >
        <Grid container>
          <Grid container item xs={5} justify='center'> 
            <img className={classes.image} src={image} alt="result"/>
          </Grid>
          <Grid container item xs={7} justify='center' alignContent='center'> 
            <Typography className={classes.text} style={{fontSize: textSize}}>{`${content}`}</Typography>
          </Grid>
        </Grid>
        <Grid container style={{padding: '0% 5% 3% 5%'}}>
          <MyButton
            fullWidth
            onClick={onClose}
          >
            {buttonText}
          </MyButton>
        </Grid>

      </Dialog>
    );
}


const useStyle = makeStyles({
  image: {
    width: '100%'
  },
  text: {
    fontFamily: 'NerkoOne',
  }
});

export default ResultDialog;