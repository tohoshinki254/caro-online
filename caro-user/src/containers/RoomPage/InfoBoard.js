import React from 'react';
import { makeStyles } from '@material-ui/core';
import UserCard from '../../components/UserCard';
import MyButton from '../../components/MyButton';


const InfoBoard = ({ creator, player, startStatus = 'Start', handleStart }) => {
  const classes = useStyle();
  const defaultInfo = { name: 'N/A', mark: 0 };
  if (creator === null) creator = defaultInfo;
  if (player === null) player = defaultInfo;
  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <MyButton
          style={{ width: '100%' }}
          onClick={handleStart}
        >
          {startStatus}
        </MyButton>
        <MyButton
          style={{ width: '45%', marginTop: '3%' }}
        >
          Resign
        </MyButton>
        <MyButton
          style={{ width: '45%', marginLeft: '10%', marginTop: '3%' }}
        >
          Loose
        </MyButton>
      </div>
      <UserCard isBorder marginTop='10%' name={player.name} minutes='120' mark={player.mark} />
      <UserCard isBorder marginTop='10%' name={creator.name} minutes='120' mark={creator.mark} isX />

    </div>
  );
}


const useStyle = makeStyles({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',

  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginTop: '0%'
  }
});

export default InfoBoard;