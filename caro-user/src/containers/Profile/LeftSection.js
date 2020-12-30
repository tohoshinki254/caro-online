import React, { useEffect, useState } from 'react';
import { makeStyles, Typography, Avatar, List, ListItem, ListItemText } from '@material-ui/core';
import { fetchWithAuthentication } from '../../api/fetch-data';
import { API_URL, TOKEN_NAME } from '../../global/constants';

const LeftSection = () => {
    const classes = useStyles();
    const userId = "5fcda7e6977eac0b00da4c68";
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        fetchWithAuthentication(API_URL + 'user?userId=' + userId, 'GET', localStorage.getItem(TOKEN_NAME))
            .then(
                (data) => {
                    console.log(data);
                },
                (error) => {
                    alert('Error');
                }
            )
    }, []);


    return (
        <div>
            <div className={classes.divAvatar}>
                <Avatar className={classes.avatar} src="https://hinhnendephd.com/wp-content/uploads/2019/10/anh-avatar-dep.jpg"/>
                <Typography className={classes.name}>Nguyễn Thanh Tiến</Typography>
            </div>
            <div>
                <List>
                    <ListItem>
                        <ListItemText primary="Join Date: " className={classes.listItem}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Matches: " className={classes.listItem}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Win Rate: " className={classes.listItem}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Rank: " className={classes.listItem}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Cups: " className={classes.listItem}/>
                    </ListItem>
                </List>
            </div>
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
        fontFamily: 'monospace'
    }
}));

export default LeftSection;
