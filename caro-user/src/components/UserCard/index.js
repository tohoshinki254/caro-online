import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';


const UserCard = ({minutes, isX = false, name, mark, marginTop = '0%', isBorder = false}) => {
    const classes = useStyle();
    const color = isX ? '#b71c1c' : '#2f78f7'
    const border = isBorder ? 'solid 3px white' : '';

    return (
        <div className={classes.container} style={{borderColor: color, marginTop: marginTop}}>
            <Typography align='center' style={{fontWeight: 'bold', fontSize: '1.4rem'}}>{`${isX ? '[X]' : '[O]'} ${name}`}</Typography>
            <div className={classes.circle} style={{backgroundColor: color, border: border}}>
            <Typography className={classes.second} >{minutes}</Typography>
            </div>
            <Typography className={classes.mark} style={{color: color}}>{mark}</Typography>
        </div>
    );
}


const useStyle = makeStyles({
    container: {
        paddingTop: '2%',
        width: '100%',
        backgroundColor: '#bdbdbd',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '10px',
        paddingBottom: '2%',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
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
        marginTop: '5%'
    }
});

export default UserCard;