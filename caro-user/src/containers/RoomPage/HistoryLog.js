import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import History from '../../components/History';


const HistoryLog = () => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <Typography align='center' className={classes.text}>History</Typography>
      <History />
      <History isX />
      <History />
      <History isX />
      <History />
      <History />
      <History isX />
      <History />
      <History isX />
      <History />
    </div>
  );
}


const useStyle = makeStyles({
  container: {
    width: '100%',
    height: '200px',
    backgroundColor: '#bdbdbd',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  text: {
    marginTop: '2%',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginBottom: '2%',
  }
});

export default HistoryLog;