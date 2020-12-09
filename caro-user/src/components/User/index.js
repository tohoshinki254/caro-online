import React from 'react';
import {makeStyles, Typography, Grid } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const User = ({user}) => {
    const classes = useStyle();

    return (
        <div className={classes.container}>
            <Grid container>
                <Grid item xs={10}>
                <Typography style={{fontWeight: 'bold'}}> {user.name} </Typography>
                </Grid>
                <Grid item xs={2}>
                    <FiberManualRecordIcon className={classes.dotIcon} />
                </Grid>
            </Grid>
        </div>
    )
}

const useStyle = makeStyles({
    container: {
        width: '88%',
        borderBottomStyle: 'solid',
        borderBottomColor: 'lightgray',
        borderBottomWidth: '2px',
        paddingBottom: '2%',
        marginTop: '4%'
    },
    dotIcon: {
        fontSize: '0.8rem',
        color: 'green',
        textAlign: 'center'
    }
})

export default User;