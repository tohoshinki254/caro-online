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
      <Grid container item xs={12}>
        <Typography align='center' className={classes.idText}>ID: 123</Typography>
      </Grid>
      <Grid className={classes.container} container alignItems='flex-start' justify='center'>
        <Grid container item xs={3} direction='column' justify='flex-end' alignItems='flex-end'>
          <InfoBoard />
        </Grid>
        <Grid container item xs={6} direction='row'>
          <Grid container style={{paddingLeft: '3%', paddingRight: '3%'}}>
            <Board />
          </Grid>
        </Grid>
        <Grid style={{ paddingLeft: '1%' }} item xs={3}>
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

export default RoomContainer;