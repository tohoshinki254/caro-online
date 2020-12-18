import React, { useState, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import LeftSection from './LeftSection';
import { AppContext } from '../../contexts/AppContext';
import MyAppBar from '../../components/MyAppBar';

const UserDetails = () => {
    const classes = useStyles();
    const {isLogined} = useContext(AppContext);
    const location = useLocation();

    return (
        <>
            <Grid container>
                <MyAppBar isLogined />
            </Grid>
            <Grid container>
                <Grid className={classes.leftSection} item xs={3}>
                    <LeftSection user={location.state.user}/>
                </Grid>
                <Grid className={classes.rightSection} item xs={9}>
                    
                </Grid>
            </Grid>
        </>
    )
}

const useStyles = makeStyles({
    leftSection: {
        borderColor: 'darkgray',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '2%',
        margin: '2%'
    }
});

export default UserDetails;