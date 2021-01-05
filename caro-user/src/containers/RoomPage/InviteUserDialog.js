import { Dialog, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import MyTextField from '../../components/MyTextField';
import MyButton from '../../components/MyButton';
import { RoomContext } from './context';
import { addInvitePlayerDialog } from './actions';
import socket from '../../global/socket';
import decode from 'jwt-decode';
import { TOKEN_NAME } from '../../global/constants';

const InviteUserDialog = ({ open, roomId }) => {
  const classes = useStyle();
  const [username, setUsername] = useState('');
  const [output, setOutput] = useState({
    result: false,
    message: ''
  });

  const { dispatch } = useContext(RoomContext);

  const closeDialog = () => {
    dispatch(addInvitePlayerDialog({
      open: false
    }));
    setUsername('');
    setOutput({
      ...output,
      message: ''
    })
  }

  const invitePlayer = () => {
    if (username === '') {
      setOutput({
        result: false,
        message: 'username is empty.'
      });
      return;
    }

    const userInfo = decode(localStorage.getItem(TOKEN_NAME));
    socket.emit('invite-player', {username, inviterName: userInfo.username, roomId: roomId });
    socket.on('result-invite-player', ({result, message}) => {
      setOutput({result, message});
      socket.off('result-invite-player');
    })
    setUsername('');
  }

  return (
    <Dialog
      open={open}
      maxWidth='xs'
      fullWidth
    >
      <Grid container style={{ marginTop: '3%' }}>
        <Grid container item xs={2} />
        <Grid container item xs={8} justify='center' >
          <Typography
            className={classes.title}
          >
            Invite Player
          </Typography>
        </Grid>
        <Grid container item xs={2} justify='center' alignItems='flex-start'>
          <IconButton onClick={closeDialog} size='small'>
            <HighlightOffIcon />
          </IconButton>
        </Grid>
      </Grid>

      <div className={classes.container}>
        <MyTextField
          placeholder="Enter username to invite"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Typography
          className={classes.output}
          style={{ color: output.result ? 'green' : 'red' }}
        >
          {output.message}
        </Typography>
        <MyButton
          style={{ marginTop: '2.5%' }}
          onClick={invitePlayer}
        >
          Invite
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
    paddingTop: '3%',
    paddingLeft: '8%',
    paddingRight: '8%',
    paddingBottom: '4%'
  },
  output: {
    fontSize: '1rem',
    fontStyle: 'italic',
    color: 'red',
    marginTop: '2%'
  }
});

export default InviteUserDialog;