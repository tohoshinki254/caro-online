import React, { useState } from 'react';
import { Dialog, FormControlLabel, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import MyTextField from '../../components/MyTextField';
import MyCheckBox from '../../components/MyCheckBox';
import MyButton from '../../components/MyButton';
import { fetchWithAuthentication } from '../../api/fetch-data';
import { API_URL, TOKEN_NAME } from '../../global/constants';
import { useHistory } from 'react-router-dom';

const CreateRoomDialog = ({ open = false, onClose, setLoading }) => {
  const classes = useStyle();
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState('');
  let history = useHistory();

  const handleCreateRoom = () => {
    if (name.length === 0) {
      alert('Name is empty');
      return;
    }
    setLoading(true);
    fetchWithAuthentication(API_URL + "room", 'POST', localStorage.getItem(TOKEN_NAME), { isPublic: !isPrivate, name: name })
      .then(
        (data) => {
          setLoading(false);
          const to = `/room/${data.roomId}`;
          history.push(to);
        },
        (erro) => {
          setLoading(false);
          alert(erro.message);
        }
      )
  }

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
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <FormControlLabel
          style={{ marginTop: '2.5%' }}
          control={<MyCheckBox checked={isPrivate} onChange={(event) => setIsPrivate(event.target.checked)} />}
          label='Private Room'
        />
        {
          isPrivate
          &&
          <MyTextField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder='Password'
            type='password'
          />
        }

        <MyButton
          style={{ marginTop: '5%' }}
          onClick={handleCreateRoom}
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