import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';


const LeftSection = ({text}) => {
    const classes = useStyle();
    return (
        <div className={classes.container}>
            <img className={classes.logo} src="/assets/images/logo.jpg" alt='logo'/>
            <Typography className={classes.logoTitle} >Tic Tac Toe</Typography>
            <Typography className={classes.text} >{text}</Typography>
        </div>
    );
}


const useStyle = makeStyles({
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: '35%'
    },
    logoTitle: {
        fontFamily: 'NerkoOne',
        fontWeight: 'bold',
        fontSize: '1.5em'
    },
    text: {
        fontWeight: 'bold',
        fontSize: '1em',
        color: 'dimgray',
        cursor: 'pointer',
        marginTop: '7%'
    }
});

export default LeftSection;