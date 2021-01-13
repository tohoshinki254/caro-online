import React, { useEffect, useRef } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import History from '../../components/History';


const HistoryLog = ({ histoy = [], creatorName, playerName, isViewer = false }) => {
  const classes = useStyle();
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef) {
      divRef.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])
  const renderHistory = histoy.map((item, index) => {
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
    <div ref={divRef} className={classes.container} style={{height: isViewer ? '500px' : '210px'}}>
      <Typography align='center' className={classes.text}>History</Typography>
      {renderHistory}
    </div>
  );

}




const useStyle = makeStyles({
  container: {
    width: '100%',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    border: 'solid #bdbdbd 2px'
  },
  text: {
    marginTop: '2%',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginBottom: '2%',
    fontFamily: 'NerkoOne',
  }
});

export default HistoryLog;