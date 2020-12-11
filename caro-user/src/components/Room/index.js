import React, { useState } from 'react';
import {makeStyles, Typography } from '@material-ui/core';
import { fetchWithAuthentication } from '../../api/fetch-data';
import { API_URL } from '../../global/constants';
import {useHistory } from 'react-router-dom';

const Room = ({room}) => {
    const classes = useStyle();
    let history = useHistory();
    const [joinSuccessful, setJoinSuccessful] = useState({ status: false, message: '' });

    const joinRoom = (room) => {
        // Authenticated
        if (localStorage.getItem("caro-online-token") !== undefined) {
            const data = {
                roomId: room.roomId
            }
            fetchWithAuthentication(API_URL + 'room/join', 'POST', localStorage.getItem("caro-online-token"), data)
                .then(
                    (data) => {
                        setJoinSuccessful({ status: true, message: data.message });
                    },
                    (error) => {
                        setJoinSuccessful({ status: false, message: error.message });
                    }
                )
        }
    }

    if (joinSuccessful.status) {
        const to = '/room/' + room.roomId;
        history.push(to);
    }

    return (
        <div className={classes.container} onClick={() => joinRoom(room)}>
            <img className={classes.image} src="/assets/images/board-room.png" alt="room"/>
            <Typography style={{fontWeight: 'bold'}}>ID: {room.roomId}</Typography>
            <Typography >{room.name}</Typography>
        </div>
    )
}

const useStyle = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    image:{
        width: '60%',
        cursor: 'pointer'
    }
})
export default Room;