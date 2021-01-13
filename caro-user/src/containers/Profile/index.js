import React, { useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { AppContext } from '../../contexts/AppContext';
import { useLocation } from 'react-router-dom';
import MyAppBar from '../../components/MyAppBar/index';
import LeftSection from './LeftSection';

const Profile = () => {
    const classes = useStyles();
    const { isLogined } = useContext(AppContext);
    const location = useLocation();

    return (
        <>
            <Grid container>
                <MyAppBar isLogined />
            </Grid>
            <Grid container>
                <Grid className={classes.leftSection} item xs={3}>
                    <LeftSection userId={location.state.userId}/>
                </Grid>
                <Grid item xs={3}>

                </Grid>
            </Grid>
        </>
    )
}

const useStyles = makeStyles({
    leftSection: {
        margin: '2%'
    }
});

export default Profile;