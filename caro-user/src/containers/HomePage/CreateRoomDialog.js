import React from 'react';
import { Dialog, FormControlLabel, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import MyTextField from '../../components/MyTextField';
import MyCheckBox from '../../components/MyCheckBox';
import MyButton from '../../components/MyButton';


const CreateRoomDialog = ({ open = false, onClose }) => {
  const classes = useStyle();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
    >
      <Grid container style={{marginTop: '3%'}}>
        <Grid container item xs={2} />
        <Grid container item xs={8} justify='center' >
          <Typography className={classes.title}>Create Room</Typography>
        </Grid>
        <Grid container item xs={2} justify='center' alignItems='flex-start'>
          <IconButton onClick={onClose} size='small'>
            <HighlightOffIcon />
          </IconButton>
        </Grid>
      </Grid>

      <div className={classes.container}>
        <MyTextField
          label='Name'
        />
        <FormControlLabel
          style={{marginTop: '2.5%'}}
          control={<MyCheckBox />}
          label='Private Room'
        />
        <MyButton
          style={{marginTop: '2.5%'}}
        >
          Create
        </MyButton>
      </div>

    </Dialog>
  );
}


const useStyle = makeStyles({
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '8%',
    paddingRight: '8%',
    paddingBottom: '4%'
  }
});

export default CreateRoomDialog;