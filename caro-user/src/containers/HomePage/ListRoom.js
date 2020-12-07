import React from 'react';
import { Grid } from '@material-ui/core';
import Room from '../../components/Room';

const ListRoom = () => {
    return (
        <>
            <Grid item xs={3}>
                <Room/>
            </Grid>
            <Grid item xs={3}>
                <Room/>
            </Grid> 
            <Grid item xs={3}>
                <Room/>
            </Grid> 
            <Grid item xs={3}>
                <Room/>
            </Grid>
            <Grid item xs={3}>
                <Room/>
            </Grid> 
            <Grid item xs={3}>
                <Room/>
            </Grid> 
            <Grid item xs={3}>
                <Room/>
            </Grid> 
            <Grid item xs={3}>
                <Room/>
            </Grid>               
        </>
    )
}


export default ListRoom;