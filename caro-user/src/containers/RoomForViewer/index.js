import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useReducer, useState } from 'react';
import { Redirect } from 'react-router-dom';
import MyAppBar from '../../components/MyAppBar';
import UserCard from '../../components/UserCard';
import { AppContext } from '../../contexts/AppContext';
import Board from '../RoomPage/Board';
import HistoryLog from '../RoomPage/HistoryLog';
import { initBoard } from '../RoomPage/Services';
import RoomForViewerReducer from './constants';
import { RoomForViewerContext } from './context';


const initialState = {
  history: {
    board: initBoard(),
    lastMove: null,
    isCreator: null,
  },
  stepNumber: 0,
  start: false, 
}

const RoomForViewer = ({ match }) => {
  const classes = useStyle();
  const [state, dispatch] = useReducer(RoomForViewerReducer, initialState);

  const { isLogined } = useContext(AppContext);

  if (!isLogined) {
    return <Redirect to="/login" />
  }

  return (
    <RoomForViewerContext.Provider value={{dispatch, state}}>
      <Grid container>
        <MyAppBar isLogined />
      </Grid>
      <Grid container>
        <Grid item container xs={3}>
          <Typography align='center' className={classes.idText}>{`ID: ${match.params.roomId}`}</Typography>
        </Grid>
        <Grid item container xs={6}>
          <Typography align='center' className={classes.turn} > xxxx </Typography>
        </Grid>
      </Grid>
      <Grid className={classes.container} container alignItems='flex-start' justify='center'>
        <Grid container item xs={3} direction='column' justify='flex-end' alignItems='flex-end'>
          <UserCard isBorder userStat={{
            name: 'N/A',
            mark: 0,
            cups: 0,
            wins: 0,
            draws: 0,
            loses: 0
          }} marginTop='1%' minutes={0} />
          <UserCard isBorder userStat={{
            name: 'N/A',
            mark: 0,
            cups: 0,
            wins: 0,
            draws: 0,
            loses: 0
          }} marginTop='15%' minutes={0} isX />
        </Grid>
        <Grid container item xs={6} direction='row'>
          <Grid container style={{ paddingLeft: '3%', paddingRight: '3%' }}>
            <Board board={initBoard()} />
          </Grid>
        </Grid>
        <Grid style={{ paddingLeft: '1%' }} item xs={3}>
          <HistoryLog 
            histoy={[]}
            creatorName={'aaaa'}
            playerName={'aaaaabaasdasd'}
            isViewer
          />
        </Grid>
      </Grid>
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