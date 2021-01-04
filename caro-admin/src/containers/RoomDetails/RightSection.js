import React from 'react';
import { makeStyles } from '@material-ui/core';
import Chat from '../RoomDetails/Chat';
import HistoryLog from '../RoomDetails/HistoryLog';

const RightSection = ({ room, match, setHistory, creator, player }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <HistoryLog history={match !== undefined ? match.history : []}
                creatorName={creator !== undefined ? creator.name : null}
                playerName={player !== undefined ? player.name : null}
                setHistory={setHistory}
            />
            <div style={{ margin: '5%' }} /> 
            <Chat chat={room.chat}
                creatorName={creator !== undefined ? creator.name : null}
                playerName={player !== undefined ? player.name : null}
            />
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        margin: '5%'
    }
});

export default RightSection;