import React, { useContext } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import MyAppBar from '../../components/MyAppBar';
import { AppContext } from '../../contexts/AppContext';
import { Redirect } from 'react-router-dom';
import Board from './Board';
import InfoBoard from './InfoBoard';
import HistoryLog from './HistoryLog';
import Chat from './Chat';


const RoomContainer = () => {
  const classes = useStyle();
  const { isLogined } = useContext(AppContext);

  if (!isLogined) {
    return <Redirect to='/login' />
  }
  return (
    <>
      <Grid container>
        <MyAppBar isLogined />
      </Grid>
      <Grid container>
        <Typography className={classes.idText}>ID: 123</Typography>
      </Grid>
      <Grid className={classes.container} container alignItems='flex-start' justify='center'>
        <Grid container item xs={3} direction='column' justify='space-between' alignItems='center'>
          <InfoBoard />
        </Grid>
        <Grid container item xs={6} direction='row'>
          <Board />
        </Grid>
        <Grid style={{ paddingLeft: '4%' }} item xs={3}>
          <HistoryLog />
          <Chat />
        </Grid>
      </Grid>
    </>
  );
}


const useStyle = makeStyles({
  container: {
    paddingLeft: '4%',
    paddingTop: '2%',
    paddingRight: '4%'
  },
  idText: {
    fontWeight: 'bold',
    paddingLeft: '4%',
    fontSize: '1.6rem',
    marginTop: '2%'
  }
});

export default RoomContainer;