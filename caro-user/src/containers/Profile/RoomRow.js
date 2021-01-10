import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const RoomRow = ({ room, userId ,seeDetails }) => {
  const classes = useStyle();

  const date = new Date(room.createdTime);

  return (
    <div onClick={() => seeDetails(room)} style={{ cursor: 'pointer' }}>
      <Grid className={classes.board} container item xs={12} >
        <Grid container item xs={7} alignItems='center'>
          <Typography className={classes.name}>VS</Typography>
          <img className={classes.avatar} alt='avatar' src="https://hinhnendephd.com/wp-content/uploads/2019/10/anh-avatar-dep.jpg" />
          <Typography className={classes.name}>{room.player !== null && room.player._id !== userId ? room.player.name : (room.creator !== null && room.creator._id !== userId ? room.creator.name : "")}</Typography>
        </Grid>
        <Grid container item xs={5}>
          <div className={classes.userStat}>
            <Typography style={{ fontSize: '0.8rem', marginLeft: '10%', fontWeight: 'bold' }} >{`${room.creatorWinner + room.playerWinner + room.draws} matches`}</Typography>
            <Typography style={{ fontSize: '0.8rem', marginLeft: '10%', fontWeight: 'bold' }} >{date.toLocaleDateString() + " " + date.toLocaleTimeString()}</Typography>
          </div>
        </Grid>
      </Grid>
    </div>

  )
}

const useStyle = makeStyles({
  board: {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    borderRadius: 10,
    padding: '2% 5% 2% 2%',
    marginBottom: '1.5%',
    height: '110px'
  },
  avatar: {
    width: '8%',
    marginLeft: '3%'
  },
  name: {
    fontFamily: 'NerkoOne',
    fontSize: '1.7rem',
    marginLeft: '3%'
  },
  username: {
    fontStyle: 'italic',
    color: '#2196f3',
    marginLeft: '4%'
  },
  userStat: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  cup: {
    width: '11%',
    marginLeft: '2%'
  }
})


export default RoomRow;