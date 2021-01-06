import React, { useEffect, useState } from 'react';
import { makeStyles, Typography, Avatar, List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { fetchWithAuthentication } from '../../api/fetch-data';
import { API_URL, TOKEN_NAME } from '../../global/constants';

const LeftSection = ({ userId }) => {
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        fetchWithAuthentication(API_URL + 'user?userId=' + userId, 'GET', localStorage.getItem(TOKEN_NAME))
            .then(
                (data) => {
                    setUserInfo(data.user);
                },
                (error) => {
                    alert('Error');
                }
            )
    }, [setUserInfo]);


    return (
        <div>
            {userInfo !== null && userInfo !== undefined ? 
            <div>
                <div className={classes.divAvatar}>
                    <Avatar className={classes.avatar} src="https://hinhnendephd.com/wp-content/uploads/2019/10/anh-avatar-dep.jpg"/>
                    <Typography className={classes.name}>{userInfo.name}</Typography>
                </div>
                <div style={{ marginLeft: '10%' }}>
                    <List>
                        <ListItem>
                            <ListItemText primary={`Username: ${userInfo.username}`} className={classes.listItem}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Matches: ${userInfo.wins + userInfo.loses + userInfo.draws}`} className={classes.listItem}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Win Rate: ${((userInfo.wins / (userInfo.wins + userInfo.loses + userInfo.draws)) * 100).toString().slice(0, 5)}%`} className={classes.listItem}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Rank: " className={classes.listItem}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Cups: ${userInfo.cups}`} className={classes.listItem}/>
                        </ListItem>
                    </List>
                </div>
            </div>
            : <CircularProgress /> }
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    divAvatar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: '30%',
        height: '30%'
    },
    name: {
        fontFamily: 'NerkoOne',
        fontSize: '2rem',
        marginTop: '1%'
    },
    listItem: {
        fontFamily: 'monospace',
        color: 'gray'
    }
}));

export default LeftSection;
