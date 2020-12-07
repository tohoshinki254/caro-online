import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const LeftSection = () => {
    const classes = useStyle();
    return (
        <div className={classes.container}>
            <img className={classes.logo} src="/assets/images/logo.jpg" alt='logo'/>
            <Typography className={classes.logoTitle} >Tic Tac Toe</Typography>
            <Typography className={classes.text} >Create an account</Typography>
        </div>
    );
}


const useStyle = makeStyles({
    container: {
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
        marginTop: '7%',
        color: 'dimgray',
        textDecoration: 'underline',
        cursor: 'pointer'
    }
});

export default LeftSection;