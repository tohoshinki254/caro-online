import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import MyAppBar from '../../components/MyAppBar';

const HomePage = () => {
    const classes = useStyle();
    return (
        <>
            <Grid container>
                <MyAppBar />
            </Grid>
            <Grid container>
                <Typography className={classes.room}>All Room</Typography>
            </Grid>
        </>
    );
};


const useStyle = makeStyles({
    room: {
        fontFamily: 'NerkoOne',
        fontSize: '2rem',
        marginLeft: '2%',
        marginTop: '2%'
    }
});
export default HomePage;