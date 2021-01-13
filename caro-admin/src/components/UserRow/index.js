import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';


const UserRow = ({ user, seeDetails }) => {
  const classes = useStyle();
  return (
    <div onClick={() => seeDetails(user)} style={{ cursor: 'pointer' }} >
      <Grid className={classes.board} container item xs={12} >
        <Grid container item xs={7} alignItems='center'>
          <img className={classes.avatar} alt='avatar' src="https://hinhnendephd.com/wp-content/uploads/2019/10/anh-avatar-dep.jpg" />
          <Typography className={classes.name}>{user.name}</Typography>
          <Typography className={classes.username}>{user.username}</Typography>
        </Grid>
        <Grid container item xs={5}>
          <div className={classes.userStat}>
            <Typography style={{ fontSize: '1.5rem', fontWeight: 'bold' }} >{user.cups}</Typography>
            <img className={classes.cup} alt='cup' src="/assets/icons/cup.png" />
            <Typography style={{ fontSize: '0.8rem', marginLeft: '10%' }} >{user.wins}</Typography>
            <Typography style={{ color: 'green', fontSize: '0.8rem', marginLeft: '1%', fontWeight: 'bold' }} >W</Typography>
            <Typography style={{ fontSize: '0.8rem', marginLeft: '10%' }} >{user.loses}</Typography>
            <Typography style={{ color: 'red', fontSize: '0.8rem', marginLeft: '1%', fontWeight: 'bold' }} >L</Typography>
            <Typography style={{ fontSize: '0.8rem', marginLeft: '10%' }} >{user.draws}</Typography>
            <Typography style={{ color: 'blue', fontSize: '0.8rem', marginLeft: '1%', fontWeight: 'bold' }} >D</Typography>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cup: {
    width: '11%',
    marginLeft: '2%'
  }
})


export default UserRow;