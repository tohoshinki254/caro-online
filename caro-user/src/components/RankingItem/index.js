import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';


const RankingItem = ({ no, name, username, cups, wins, draws, loses }) => {
  const classes = useStyle();
  return (
    <>
      <Grid container item xs={2} />
      <Grid className={classes.board} container item xs={8} >
        <Grid container item xs={7} alignItems='center'>
          <Typography className={classes.no}>{no}</Typography>
          <img className={classes.avatar} alt='avatar' src="https://hinhnendephd.com/wp-content/uploads/2019/10/anh-avatar-dep.jpg" />
          <Typography className={classes.name}>{name}</Typography>
          <Typography className={classes.username}>{username}</Typography>
        </Grid>
        <Grid container item xs={5}>
          <div className={classes.userStat}>
            <Typography style={{ fontSize: '1.5rem', fontWeight: 'bold' }} >{cups}</Typography>
            <img className={classes.cup} alt='cup' src="/assets/icons/cup.png" />
            <Typography style={{ fontSize: '0.8rem', marginLeft: '4%' }} >{wins}</Typography>
            <Typography style={{ color: 'green', fontSize: '0.8rem', marginLeft: '1%', fontWeight: 'bold' }} >W</Typography>
            <Typography style={{ fontSize: '0.8rem', marginLeft: '2%' }} >{loses}</Typography>
            <Typography style={{ color: 'red', fontSize: '0.8rem', marginLeft: '1%', fontWeight: 'bold' }} >L</Typography>
            <Typography style={{ fontSize: '0.8rem', marginLeft: '2%' }} >{draws}</Typography>
            <Typography style={{ color: 'blue', fontSize: '0.8rem', marginLeft: '1%', fontWeight: 'bold' }} >D</Typography>
          </div>
        </Grid>

      </Grid>
      <Grid container item xs={2} />
    </>

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
  no: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: '1.5rem'
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


export default RankingItem;