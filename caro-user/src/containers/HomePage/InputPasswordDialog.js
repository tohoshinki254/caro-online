import { Dialog, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchWithAuthentication } from '../../api/fetch-data';
import MyButton from '../../components/MyButton';
import MyTextField from '../../components/MyTextField';
import { AppContext } from '../../contexts/AppContext';
import { API_URL, TOKEN_NAME } from '../../global/constants';

const InputPasswordDialog = ({ open, onClose, roomId, isFull }) => {
  const classes = useStyle();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let history = useHistory();
  const { setLoading } = useContext(AppContext)
  const joinRoom = () => {

    setLoading(true);
    const data = {
      roomId: roomId,
      password: password
    }

    if (isFull){

      fetchWithAuthentication(API_URL + 'room/viewer/join', 'POST', localStorage.getItem(TOKEN_NAME), data)
        .then(
          (data) => {
            setLoading(false);
            onClose();
            history.push(`/viewer/room/${roomId}`)
          }, 
          (error) => {
            setLoading(false);
            setErrorMessage(error.message);
          }
        );

      return;
    }


    fetchWithAuthentication(API_URL + 'room/join', 'POST', localStorage.getItem("caro-online-token"), data)
      .then(
        (data) => {
          setLoading(false);
          onClose();
          history.push(`/room/${roomId}`);
        },
        (error) => {
          setLoading(false);
          setErrorMessage(error.message);
        }
      )
  }
  return (
    <Dialog
      open={open}
      maxWidth='xs'
      fullWidth
      onClose={onClose}
    >
      <Grid container style={{ marginTop: '3%' }}>
        <Grid container item xs={2} />
        <Grid container item xs={8} justify='center' >
          <Typography className={classes.title}>Password Required</Typography>
        </Grid>
        <Grid container item xs={2} justify='center' alignItems='flex-start'>
          <IconButton size='small' onClick={onClose}>
            <HighlightOff />
          </IconButton>
        </Grid>
      </Grid>

      <div className={classes.container} >
        <MyTextField
          style={{ marginTop: '4%' }}
          placeholder='Enter password'
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Typography style={{ marginTop: '2%', color: 'red' }}>{errorMessage}</Typography>
        <MyButton
          style={{ marginTop: '4%' }}
          onClick={() => joinRoom()}
        >
          Join
        </MyButton>
      </div>
    </Dialog>
  )
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
})

export default InputPasswordDialog;