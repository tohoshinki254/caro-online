import React, { useEffect, useState } from 'react';
import { Dialog, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import MyTextField from '../../components/MyTextField';
import MyButton from '../../components/MyButton';
import { useHistory } from 'react-router-dom';
import { fetchWithAuthentication } from '../../api/fetch-data';
import { API_URL } from '../../global/constants';

const JoinRoomDialog = ({ open = false, onClose, setLoading }) => {
  const classes = useStyle();
  let history = useHistory();
  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');
  const [joinSuccessful, setJoinSuccessful] = useState({ status: false, message: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const joinRoom = () => {
    if (roomId.length === 0) {
      alert('Room Id is empty.');
      return;
    }

    if (localStorage.getItem("caro-online-token") !== undefined) {
      setLoading(true);
      const data = {
        roomId: roomId,
        password: password
      }
      fetchWithAuthentication(API_URL + 'room/join', 'POST', localStorage.getItem("caro-online-token"), data)
        .then(
          (data) => {
            setLoading(false);
            setJoinSuccessful({ status: true, message: data.message });
          },
          (error) => {
            setLoading(false);
            setJoinSuccessful({ status: false, message: error.message });
            setErrorMessage(error.message);
          }
        )
    }
  }

  useEffect(() => {
    if (joinSuccessful.status) {
      const to = '/room/' + roomId;
      history.push(to);
    }
  }, [joinSuccessful, history, roomId])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
    >
      <Grid container style={{ marginTop: '3%' }}>
        <Grid container item xs={2} />
        <Grid container item xs={8} justify='center' >
          <Typography className={classes.title}>Join Room</Typography>
        </Grid>
        <Grid container item xs={2} justify='center' alignItems='flex-start'>
          <IconButton onClick={onClose} size='small'>
            <HighlightOffIcon />
          </IconButton>
        </Grid>
      </Grid>

      <div className={classes.container}>
        <MyTextField
          label='Room ID'
          onChange={(event) => setRoomId(event.target.value)}
          value={roomId}
          type='number'
        />

        <MyTextField
          style={{ marginTop: '4%' }}
          placeholder='Password (set empty if join public room)'
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type='password'
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

export default JoinRoomDialog;