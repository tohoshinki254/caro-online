import React from 'react';
import { makeStyles } from '@material-ui/core';
import Chat from '../RoomDetails/Chat';
import History from '../RoomDetails/HistoryLog';

const RightSection = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <History />
            <div style={{ margin: '5%' }} /> 
            <Chat />
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        margin: '5%'
    }
});

export default RightSection;