import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';


const History = ({isX = false}) => {
  const classes = useStyle();
  const color = isX ? '#b71c1c' : '#2f78f7';
  return (
    <Typography className={classes.container} style={{backgroundColor: color}}>{`#1 ${isX ? '[X]' : '[O]'} quangthien (1,2)`}</Typography>
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