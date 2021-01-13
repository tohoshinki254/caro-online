import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import RoomRow from '../Profile/RoomRow';

const RightSection = ({ rooms, userId }) => {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    let history = useHistory();

    let totalPages = Math.floor(rooms.length / 4);
    rooms.length % 4 > 0 && totalPages++;
    console.log(totalPages);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const seeRoomDetails = (room) => {
        const to = '/review-room/' + room.roomId;
        history.push({
            pathname: to,
            state: { room: room }
        });
    }

    return (
        <>
            <Grid className={classes.container} container >
                {rooms.filter((room, index) => {
                    return index >= (page - 1) * 4 && index < (page - 1) * 4 + 4;
                }).map((room, index) => <RoomRow room={room} key={index} userId={userId} seeDetails={seeRoomDetails}/>)}
            </Grid>
            <Grid style={{marginTop: '2%', marginBottom: '5%'}} container justify='center'>
                <Pagination count={totalPages} page={page} color='primary' size='large' onChange={handleChangePage} />
            </Grid>
        </>
    )
}

const useStyles = makeStyles({
    container: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '2%',
    },
})

export default RightSection;