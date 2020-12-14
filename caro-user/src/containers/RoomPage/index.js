import React, { useContext, useEffect, useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import MyAppBar from '../../components/MyAppBar';
import { AppContext } from '../../contexts/AppContext';
import { Redirect } from 'react-router-dom';
import Board from './Board';
import InfoBoard from './InfoBoard';
import HistoryLog from './HistoryLog';
import Chat from './Chat';
import decode from 'jwt-decode';
import { API_URL, TOKEN_NAME } from '../../global/constants';
import socketIOClient from "socket.io-client";
import { fetchWithAuthentication } from '../../api/fetch-data';


const RoomPage = ({ match }) => {
  const classes = useStyle();
  const { isLogined } = useContext(AppContext);
  const [infoBoard, setInfoBoard] = useState({ creator: null, player: null });

  useEffect(() => {
    const socket = socketIOClient(API_URL, { transports: ['websocket'] });
    if (localStorage.getItem(TOKEN_NAME) !== null) {
      const userInfo = decode(localStorage.getItem(TOKEN_NAME));
      fetchWithAuthentication(API_URL + 'room/detail', 'POST', localStorage.getItem(TOKEN_NAME), { userId: userInfo._id, roomId: match.params.roomId })
        .then(
          (data) => {
            let {player, creator, isCreator} = data;

            socket.emit('join-room', { name: userInfo.name, roomId: match.params.roomId, isCreator: isCreator });
            if (isCreator) {
              socket.on('player-joined', (name) => {
                player = { name: name, mark: 0 }
                setInfoBoard({ creator: creator, player: player });
              })
            } else {
              
            }

            setInfoBoard({ creator: creator, player: player });
          },
          (error) => {
            alert(error.message);
          }
        )
    }
  }, [match.params.roomId]);

  if (!isLogined) {
    return <Redirect to='/login' />
  }


  return (
    <>
      <Grid container>
        <MyAppBar isLogined />
      </Grid>
      <Grid container item xs={12}>
        <Typography align='center' className={classes.idText}>{`ID: ${match.params.roomId}`}</Typography>
      </Grid>
      <Grid className={classes.container} container alignItems='flex-start' justify='center'>
        <Grid container item xs={3} direction='column' justify='flex-end' alignItems='flex-end'>
          <InfoBoard creator={infoBoard.creator} player={infoBoard.player} />
        </Grid>
        <Grid container item xs={6} direction='row'>
          <Grid container style={{ paddingLeft: '3%', paddingRight: '3%' }}>
            <Board />
          </Grid>
        </Grid>
        <Grid style={{ paddingLeft: '1%' }} item xs={3}>
          <HistoryLog />
          <Chat roomId={match.params.roomId}/>
        </Grid>
      </Grid>
    </>
  );
}


const useStyle = makeStyles({
  container: {
    paddingLeft: '4%',
    paddingTop: '0.5%',
    paddingRight: '4%'
  },
  idText: {
    fontWeight: 'bold',
    paddingLeft: '4%',
    fontSize: '1.6rem',
    marginTop: '0.5%',
    width: '100%'
  }
});

export default RoomPage;