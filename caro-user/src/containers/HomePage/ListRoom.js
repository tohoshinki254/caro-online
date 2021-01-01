import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Room from '../../components/Room';
import { fetchWithoutAuthentication } from '../../api/fetch-data';
import { API_URL } from '../../global/constants';
import socket from '../../global/socket';

const ListRoom = () => {
    const [publicRooms, setPublicRooms] = useState({ rooms: [], message: '' });
    const [reload, setReload] = useState(Math.random());
    useEffect(() => {
        fetchWithoutAuthentication(API_URL + 'room/public', 'GET')
            .then(
                (data) => {
                    setPublicRooms({ rooms: data.rooms, message: data.message });
                },
                (error) => {
                    setPublicRooms({ rooms: [], message: error.message });
                }
            )

        socket.on('reload-list-room', () => {
            setReload(Math.random());
        })

        return () => { 
            socket.off('reload-list-room')
        }
    }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {publicRooms.rooms.map((room, index) => (
                <Grid key={index} item xs={3}>
                    <Room key={index} room={room} />
                </Grid>
            ))}
        </>
    )
}


export default ListRoom;