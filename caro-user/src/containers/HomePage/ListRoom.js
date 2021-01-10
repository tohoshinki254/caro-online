import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Room from '../../components/Room';
import { fetchWithoutAuthentication } from '../../api/fetch-data';
import { API_URL } from '../../global/constants';
import socket from '../../global/socket';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const ListRoom = ({ setInputPasswordDialog, handleCloseInputPassword }) => {
  const [publicRooms, setPublicRooms] = useState({ rooms: [], message: '' });
  const [reload, setReload] = useState(Math.random());
  const { setLoading } = useContext(AppContext);
  let history = useHistory();

  useEffect(() => {
    history.listen((newLocation, action) => {
      if (action === 'POP' && newLocation.pathname.includes('/room')) {
        const location = {
          pathname: '/home'
        }

        history.replace(location);
      }

    });
    fetchWithoutAuthentication(API_URL + 'room/public', 'GET')
      .then(
        (data) => {
          setLoading(false);
          setPublicRooms({ rooms: data.rooms, message: data.message });
        },
        (error) => {
          setLoading(false);
          setPublicRooms({ rooms: [], message: error.message });
        }
      )

    socket.on('reload-list-room', () => {
      setReload(Math.random());
    })
    return () => {
      socket.off('reload-list-room')
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchWithoutAuthentication(API_URL + 'room/public', 'GET')
      .then(
        (data) => {
          setPublicRooms({ rooms: data.rooms, message: data.message });
        },
        (error) => {
          setPublicRooms({ rooms: [], message: error.message });
        }
      )
  }, [reload])
  return (
    <>
      {publicRooms.rooms.map((room, index) => (
        <Grid key={index} item xs={3}>
          <Room
            handleCloseInputPassword={handleCloseInputPassword}
            setInputPasswordDialog={setInputPasswordDialog}
            key={index}
            room={room}
          />
        </Grid>
      ))}
    </>
  )
}


export default ListRoom;