import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


const LeftSection = ({text, pathLink}) => {
    const classes = useStyle();
    return (
        <div className={classes.container}>
            <img className={classes.logo} src="/assets/images/logo.jpg" alt='logo'/>
            <Typography className={classes.logoTitle} >Tic Tac Toe</Typography>
            <Link style={{marginTop: '12%'}} to={pathLink}>
                <Typography className={classes.text} >{text}</Typography>
            </Link>
            
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
        textDecoration: 'underline',
        cursor: 'pointer',
    }
});

export default LeftSection;