import React, { useEffect, useRef } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import History from '../../components/History';

const HistoryLog = ({ history = [], creatorName, playerName }) => {
  const classes = useStyle();

  const renderHistory = history.map((item, index) => {
    if (index !== 0)
      return (
        <History
          isX={item.isCreator}
          step={index}
          name={item.isCreator ? creatorName : playerName}
          i={item.lastMove.i}
          j={item.lastMove.j}
          key={index}
        />
      )
    else
      return <div key={index}> </div>;
  })
  return (
    <div className={classes.container}>
      <Typography align='center' className={classes.text}>History</Typography>
      {renderHistory}
    </div>
  );

}

const useStyle = makeStyles({
  container: {
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    borderColor: 'darkgray',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '5px',
  },
  text: {
    marginTop: '2%',
    fontWeight: 'bold',
    fontSize: '1.7rem',
    marginBottom: '2%',
    fontFamily: 'NerkoOne'
  }
});

export default HistoryLog;