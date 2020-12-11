import React from 'react';
import { makeStyles } from '@material-ui/core';
import UserCard from '../../components/UserCard';
import MyButton from '../../components/MyButton';


const InfoBoard = () => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <UserCard username='Quang Thien' minutes='120' mark='1' />
      <UserCard marginTop='10%' username='Quang Thien' minutes='120' mark='1' isX />
      <div className={classes.buttonContainer}>
        <MyButton
          style={{ width: '45%' }}
        >
          Draw
        </MyButton>
        <MyButton
          style={{ width: '45%', marginLeft: '10%' }}
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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    marginTop: '15%',
    justifyContent: 'flex-end'
  }
});

export default InfoBoard;