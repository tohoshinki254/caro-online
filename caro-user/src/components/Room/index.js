import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { fetchWithAuthentication } from '../../api/fetch-data';
import { API_URL, TOKEN_NAME } from '../../global/constants';
import { useHistory } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import { AppContext } from '../../contexts/AppContext';

const Room = ({ room, setInputPasswordDialog, handleCloseInputPassword }) => {
  const classes = useStyle();
  let history = useHistory();
  const [joinSuccessful, setJoinSuccessful] = useState({ status: false, message: '' });
  const {setLoading} = useContext(AppContext);

  const joinRoom = (room) => {
    // Authenticated
    if (localStorage.getItem("caro-online-token") !== undefined) {
      setLoading(true);
      const data = {
        roomId: room.roomId
      }
      if (room.isPublic) {
        if (room.player === null) {
          fetchWithAuthentication(API_URL + 'room/join', 'POST', localStorage.getItem("caro-online-token"), data)
            .then(
              (data) => {
                setLoading(false);
                setJoinSuccessful({ status: true, message: data.message });
              },
              (error) => {
                setLoading(false);
                setJoinSuccessful({ status: false, message: error.message });
              }
            )
        } else {
          fetchWithAuthentication(API_URL + 'room/viewer/join', 'POST', localStorage.getItem(TOKEN_NAME), {roomId: room.roomId, password: ''})
            .then(
              (data) => {
                setLoading(false);
                history.push(`/viewer/room/${room.roomId}`);
              },
              (error) => {
                setLoading(false);
                console.log(error.message);
              }
            )


        }

      } else {
        setLoading(false);
        setInputPasswordDialog({
          open: true,
          roomId: room.roomId,
          onClose: handleCloseInputPassword,
          isFull: room.player !== null
        })
      }

    }
  }

  useEffect(() => {
    if (joinSuccessful.status) {
      const to = '/room/' + room.roomId;
      history.push(to);
    }
  }, [joinSuccessful, history, room]);
  return (
    <div className={classes.container} onClick={() => joinRoom(room)}>
      <img className={classes.image} src="/assets/images/board-room.png" alt="room" />
      <div className={classes.id}>
        <Typography style={{ fontWeight: 'bold' }}>ID: {room.roomId}</Typography>
        {!room.isPublic && <LockIcon className={classes.lock} />}
      </div>
      <div className={classes.iconContainer}>
        <PersonIcon className={classes.person} />
        {room.player && <PersonIcon className={classes.person} />}
      </div>
      <Typography >{room.name}</Typography>
    </div>
  )
}

const useStyle = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  id: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'no-wrap',
    alignItems: 'center'
  },
  lock: {
    marginLeft: '8px',
    fontSize: '1.2rem',
    color: 'dodgerblue'
  },
  image: {
    width: '60%',
    cursor: 'pointer'
  },
  quantity: {
    fontSize: '0.8rem',
    fontStyle: 'italic',
    color: 'gray'
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'no-wrap',
    alignItems: 'center'
  },
  person: {
    fontSize: '1.2rem',
    marginRight: '2%',
    color: 'dodgerblue'
  }
})
export default Room;