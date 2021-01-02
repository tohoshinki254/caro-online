import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import LeftSection from './LeftSection';
import CenterSection from './CenterSection';
import RightSection from './RightSection';

const RoomDetails = () => {
    const classes = useStyles();

    return (
        <>
            <Grid container>
                <Grid item xs={3}>
                    <LeftSection />
                </Grid>
                <Grid item xs={6}>
                    <CenterSection />
                </Grid>
                <Grid item xs={3}>
                    <RightSection />
                </Grid>
            </Grid>
        </>
    )
}

const useStyles = makeStyles({

});

export default RoomDetails;