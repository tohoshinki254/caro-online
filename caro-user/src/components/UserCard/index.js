import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';


const UserCard = ({ minutes, isX = false, marginTop = '0%', userStat }) => {
    const classes = useStyle();
    const color = isX ? '#b71c1c' : '#2f78f7'

    return (
        <div className={classes.container} style={{ borderColor: color, marginTop: marginTop }}>
            <Typography
                align='center'
                style={{ fontWeight: 'bold', fontSize: '1.5rem', color: color, fontFamily: 'NerkoOne', }}
            >
                {`${isX ? '[ X ]' : '[ O ]'} ${userStat.name}`}
            </Typography>
            <div className={classes.circle} style={{ backgroundColor: color }}>
                <Typography className={classes.second} >{minutes}</Typography>
            </div>
            <div className={classes.userStat}>
                <Typography style={{fontSize: '0.8rem'}} >{`${userStat.cups}`}</Typography>
                <img className={classes.cup} alt='cup' src="/assets/icons/cup.png" />
                <Typography style={{fontSize: '0.8rem', marginLeft: '2%'}} >{`${userStat.wins}`}</Typography>
                <Typography style={{color: 'green', fontSize: '0.8rem', marginLeft: '1%', fontWeight: 'bold'}} >W</Typography>
                <Typography style={{fontSize: '0.8rem', marginLeft: '2%'}} >{`${userStat.loses}`}</Typography>
                <Typography style={{color: 'red', fontSize: '0.8rem', marginLeft: '1%', fontWeight: 'bold'}} >L</Typography>
                <Typography style={{fontSize: '0.8rem', marginLeft: '2%'}} >{`${userStat.draws}`}</Typography>
                <Typography style={{color: 'blue', fontSize: '0.8rem', marginLeft: '1%', fontWeight: 'bold'}} >D</Typography>
            </div>
            <Typography className={classes.mark} style={{ color: color }}>{`${userStat.mark}`}</Typography>
        </div>
    );
}


const useStyle = makeStyles({
    container: {
        paddingTop: '2%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '6px',
        paddingBottom: '2%',
        borderWidth: '2px',
        borderStyle: 'solid'
    },
    circle: {
        marginTop: '3%',
        width: '80px',
        height: '80px',
        borderRadius: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    second: {
        fontSize: '1.8rem',
        color: 'white',
        fontWeight: 'bold'
    },
    mark: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginTop: '0%'
    },
    userStat: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '3%',
        alignItems: 'center'
    },
    cup: {
        width: '5%',
        marginLeft: '2%'
    }
});

export default UserCard;