import React from 'react';
import { Dialog, Grid, makeStyles, Typography } from '@material-ui/core';
import MyButton from '../../components/MyButton';


const ConfirmDialog = ({open = false, image, content, handleYes, handleNo}) => {
    const classes = useStyle();
    return (
      <Dialog
        open={open}
        fullWidth
        maxWidth='xs'
      >
        <Grid container>
          <Grid container justify='center' item xs={5} >
            <img className={classes.image} src={image}  alt="confirm"/>
          </Grid>
          <Grid container justify='center' item xs={7} alignContent='center'>
            <Typography className={classes.text}>{content}</Typography>
          </Grid>
        </Grid>
        <Grid container > 
          <Grid style={{padding: '0% 3% 3% 3%'}} container item xs={6} >
            <MyButton
              fullWidth
              onClick={handleYes}
            >
              Yes
            </MyButton>
          </Grid>

          <Grid style={{padding: '0% 3% 3% 3%'}} container item xs={6} >
            <MyButton
              fullWidth
              onClick={handleNo}
            >
              NO
            </MyButton>
          </Grid>
        </Grid>
      </Dialog>
    );
}


const useStyle = makeStyles({
  image: {
    width: '100%',
  },

});

export default ConfirmDialog;