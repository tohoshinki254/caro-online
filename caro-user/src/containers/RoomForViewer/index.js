import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import MyAppBar from '../../components/MyAppBar';
import UserCard from '../../components/UserCard';
import { AppContext } from '../../contexts/AppContext';
import Board from '../RoomPage/Board';
import HistoryLog from '../RoomPage/HistoryLog';
import { initBoard } from '../RoomPage/Services';
import { RoomForViewerContext } from './context';
import decode from 'jwt-decode';
import { fetchWithAuthentication } from '../../api/fetch-data';
import { API_URL, DRAW_IMAGE, ERRO_IMAGE, TOKEN_NAME, WIN_IMAGE } from '../../global/constants';
import RoomForViewerReducer from './reducer';
import { addHistory, addUserInfo, updateHistory } from './actions';
import socket from '../../global/socket';
import ResultDialog from '../RoomPage/ResultDialog';
import { updateResult } from '../RoomPage/actions';

const initialState = {
  history: [{
    board: initBoard(),
    lastMove: null,
    isCreator: null,
  }],
  stepNumber: 0,
  start: false,
  info: {
    player: {
      name: 'N/A',
      mark: 0,
      cups: 0,
      wins: 0,
      draws: 0,
      loses: 0
    },
    creator: {
      name: 'N/A',
      mark: 0,
      cups: 0,
      wins: 0,
      draws: 0,
      loses: 0
    }
  },
  resultDialog: {
    open: false,
    image: null,
    content: null,
    onClose: () => { },
    buttonText: null,
    textSize: '3rem'
  }
}

const RoomForViewer = ({ match }) => {
  const classes = useStyle();
  const [state, dispatch] = useReducer(RoomForViewerReducer, initialState);
  const { isLogined, setLoading } = useContext(AppContext);
  let history = useHistory();

  const handleCloseResultDialog = () => {
    dispatch(updateResult({
      open: false,
      image: null,
      content: null
    }))
  }

  const configSocket = (playerName, creatorName) => {
    socket.emit('viewer-join-room', { roomId: match.params.roomId });
    socket.on('current-history', (curHistory) => {
      dispatch(updateHistory(curHistory));
    })
    socket.on('creator-done', (historyItem) => {
      dispatch(addHistory(historyItem));
    })
    socket.on('player-done', (historyItem) => {
      dispatch(addHistory(historyItem));
    })

    socket.on('viewer-result', (result) => {
      dispatch(updateHistory([]));

      const userInfo = decode(localStorage.getItem(TOKEN_NAME));
      fetchWithAuthentication(API_URL + 'room/detail', 'POST', localStorage.getItem(TOKEN_NAME), { roomId: match.params.roomId, userId: userInfo._id })
        .then(
          (data) => {
            dispatch(addUserInfo({ player: data.player, creator: data.creator }));
          },
          (error) => {
            alert(error.message);
            history.replace('/home');
          }
        )

      switch (result) {
        case 0:
          dispatch(updateResult({
            open: true,
            image: DRAW_IMAGE,
            content: 'Draw Game',
            buttonText: 'OK',
            onClose: handleCloseResultDialog
          }))
          break;
        case -1:
          dispatch(updateResult({
            open: true,
            image: WIN_IMAGE,
            content: `${playerName} win`,
            buttonText: 'OK',
            onClose: handleCloseResultDialog
          }))
          break;
        case 1:
          dispatch(updateResult({
            open: true,
            image: WIN_IMAGE,
            content: `${creatorName} win`,
            buttonText: 'OK',
            onClose: handleCloseResultDialog
          }))
          break;
        default:
          break;
      }
    })

    socket.on('player-exited', () => {
      dispatch(updateResult({
        open: true,
        image: ERRO_IMAGE,
        content: `Player exited.\nYou will redirect to home.`,
        buttonText: 'OK',
        textSize: '1.5rem',
        onClose: () => {
          history.replace('/home');
        }
      }))
    })
  }

  useEffect(() => {
    if (isLogined) {
      setLoading(true);
      const userInfo = decode(localStorage.getItem(TOKEN_NAME));
      fetchWithAuthentication(API_URL + 'room/detail', 'POST', localStorage.getItem(TOKEN_NAME), { roomId: match.params.roomId, userId: userInfo._id })
        .then(
          (data) => {
            setLoading(false);
            dispatch(addUserInfo({ player: data.player, creator: data.creator }));
            configSocket(data.player.name, data.creator.name);
          },
          (error) => {
            setLoading(false);
            alert(error.message);
            history.replace('/home');
          }
        )
    }
    return () => {
      socket.off('current-history');
      socket.off('creator-done');
      socket.off('player-done');
      socket.off('viewer-result');
      socket.off('player-exited');
    }
  }, [])

  if (!isLogined) {
    return <Redirect to="/login" />
  }

  return (
    <RoomForViewerContext.Provider value={{ dispatch, state }}>
      <Grid container>
        <MyAppBar isLogined />
      </Grid>
      <Grid container>
        <Grid item container xs={3}>
          <Typography align='center' className={classes.idText}>{`ID: ${match.params.roomId}`}</Typography>
        </Grid>
      </Grid>
      <Grid className={classes.container} container alignItems='flex-start' justify='center'>
        <Grid container item xs={3} direction='column' justify='flex-end' alignItems='flex-end'>
          <UserCard isBorder userStat={state.info.player} marginTop='1%' minutes={0} />
          <UserCard isBorder userStat={state.info.creator} marginTop='15%' minutes={0} isX />
        </Grid>
        <Grid container item xs={6} direction='row'>
          <Grid container style={{ paddingLeft: '3%', paddingRight: '3%' }}>
            <Board
              board={state.history[state.stepNumber].board.slice()}
              lastMove={state.history[state.stepNumber].lastMove}
            />
          </Grid>
        </Grid>
        <Grid style={{ paddingLeft: '1%' }} item xs={3}>
          <HistoryLog
            histoy={state.history}
            creatorName={state.info.creator.name}
            playerName={state.info.player.name}
            isViewer
          />
        </Grid>
      </Grid>
      <ResultDialog
        open={state.resultDialog.open}
        content={state.resultDialog.content}
        image={state.resultDialog.image}
        onClose={state.resultDialog.onClose}
        buttonText={state.resultDialog.buttonText}
        textSize={state.resultDialog.textSize}
      />
    </RoomForViewerContext.Provider>
  )
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
    marginTop: '2%',
    width: '100%',
    marginLeft: '20%',
    fontFamily: 'NerkoOne',
  },
  turn: {
    fontWeight: 'bold',
    fontSize: '1.6rem',
    marginTop: '1%',
    width: '100%',
    marginLeft: '4%',
    fontFamily: 'NerkoOne',
  }
})

export default RoomForViewer;