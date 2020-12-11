import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Room from '../../components/Room';
import { fetchWithoutAuthentication } from '../../api/fetch-data';
import { API_URL } from '../../global/constants';

const ListRoom = () => {
    const [publicRooms, setPublicRooms] = useState({ rooms: [], message: '' });

    useEffect(() => {
        if (publicRooms.rooms.length === 0) {
            fetchWithoutAuthentication(API_URL + 'room/public', 'GET')
            .then(
                (data) => {
                    setPublicRooms({ rooms: data.rooms, message: data.message });
                },
                (error) => {
                    setPublicRooms({ message: error.message });
                }
            )
        }
    }, [publicRooms, setPublicRooms]);

    return (
        <>
            {publicRooms.rooms.map((room) => (
                <Grid item xs={3}>
                    <Room room={room}/>
                </Grid>
            ))}      
        </>
    )
}


export default ListRoom;