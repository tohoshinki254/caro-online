import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import MyAppBar from '../../components/MyAppBar';
import Room from '../../components/Room';

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
            <Grid className={classes.mainSection} container>
                <Grid className={classes.leftSection} item xs={8}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Room />
                        </Grid>
                        <Grid item xs={3}>
                            <Room />
                        </Grid>
                        <Grid item xs={3}>
                            <Room />
                        </Grid>
                        <Grid item xs={3}>
                            <Room />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>

                </Grid>
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
    },
    mainSection: {
        marginLeft: '2%',
        marginTop: '1%'
    },
    leftSection: {
        borderColor: 'darkgray',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '5px'
    }
});
export default HomePage;