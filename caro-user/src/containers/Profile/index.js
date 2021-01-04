import React, { useContext, useState, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { AppContext } from '../../contexts/AppContext';
import { useLocation } from 'react-router-dom';
import MyAppBar from '../../components/MyAppBar/index';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import { API_URL, TOKEN_NAME } from '../../global/constants';
import { fetchWithAuthentication } from '../../api/fetch-data';

const Profile = () => {
    const classes = useStyles();
    const { isLogined } = useContext(AppContext);
    const location = useLocation();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const data = {
            id: location.state.userId
        };
        fetchWithAuthentication(API_URL + 'room/rooms-by-user', 'POST', localStorage.getItem(TOKEN_NAME) ,data)
            .then(
                (data) => {
                    setRooms(data.rooms);
                },
                (error) => {

                }
            )
    }, [setRooms, location])

    return (
        <>
            <Grid container>
                <MyAppBar isLogined />
            </Grid>
            <Grid container>
                <Grid className={classes.leftSection} item xs={3}>
                    <LeftSection userId={location.state.userId}/>
                </Grid>
                <Grid className={classes.rightSection} item xs={8}>
                    <RightSection rooms={rooms} userId={location.state.userId}/>
                </Grid>
            </Grid>
        </>
    )
}

const useStyles = makeStyles({
    leftSection: {
        borderColor: 'darkgray',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '2%',
        margin: '2%'
    },
    rightSection: {
        marginTop: '2%'
    }
});

export default Profile;