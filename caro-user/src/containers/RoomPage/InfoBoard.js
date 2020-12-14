import React from 'react';
import { makeStyles } from '@material-ui/core';
import UserCard from '../../components/UserCard';
import MyButton from '../../components/MyButton';


const InfoBoard = ({creator, player}) => {
  const classes = useStyle();
  const defaultInfo = {name: 'N/A', mark: 0};
  if (creator === null) creator = defaultInfo;
  if (player === null) player = defaultInfo;
  return (
    <div className={classes.container}>
      <UserCard name={player.name} minutes='120' mark={player.mark} />
      <UserCard marginTop='10%' name={creator.name} minutes='120' mark={creator.mark} isX />
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