import React from 'react';
import { makeStyles } from '@material-ui/core';
import UserCard from '../../components/UserCard';
import MyButton from '../../components/MyButton';


const InfoBoard = () => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <UserCard username='Quang Thien' minutes='120' mark='1' />
      <div style={{ marginTop: '30%' }}>
        <UserCard username='Quang Thien' minutes='120' mark='1' isX />
      </div>
      <div className={classes.buttonContainer}>
        <MyButton
          style={{ width: '35%' }}
        >
          Draw
                </MyButton>
        <MyButton
          style={{ width: '35%', marginLeft: '10%' }}
        >
          Loose
                </MyButton>
      </div>
    </div>
  );
}


const useStyle = makeStyles({
  container: {
    height: '100%',
    width: '100%'
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    marginTop: '15%'
  }
});

export default InfoBoard;