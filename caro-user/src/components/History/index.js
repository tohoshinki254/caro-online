import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';


const History = ({isX = false, name, i, j, step, setHistory}) => {
  const classes = useStyle();
  const color = isX ? '#b71c1c' : '#2f78f7';
  return (
    <Typography className={classes.container} 
      style={{backgroundColor: color}}
      onClick={() => setHistory(step)}
    >
      {`#${step} ${isX ? '[X]' : '[O]'} ${name} (${i}, ${j})`}
    </Typography>
  );
}


const useStyle = makeStyles({
  container: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: '8%',
    marginRight: '8%',
    paddingLeft: '2%',
    paddingTop: '1%',
    paddingBottom: '1%',
    borderRadius: '8px',
    marginBottom: '1.5%',
  }
});

export default History;