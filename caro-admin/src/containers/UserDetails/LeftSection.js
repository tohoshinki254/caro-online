import React, { useState } from 'react';
import { makeStyles, Typography, Avatar, List, ListItem, ListItemText } from '@material-ui/core';
import { fetchWithAuthentication } from '../../api/fetch-data';
import { API_URL, TOKEN_NAME } from '../../global/constants';
import MyButton from '../../components/MyButton/index';

const LeftSection = ({ user }) => {
    const classes = useStyles();
    
    const [isLocked, setIsLocked] = useState(user.isLocked);

    const changeLockUser = (userId) => {
        const data = {
            userId: userId
        }
        fetchWithAuthentication(API_URL + 'admin/lock-user', 'PUT', localStorage.getItem(TOKEN_NAME), data)
            .then(
                (data) => {
                    setIsLocked(!isLocked);
                },
                (error) => {
                    alert('Error');
                }
            )
    }

    return (
        <div>
            <div className={classes.divAvatar}>
                <Avatar className={classes.avatar} src="https://hinhnendephd.com/wp-content/uploads/2019/10/anh-avatar-dep.jpg"/>
                <Typography className={classes.name}>{user.name}</Typography>
            </div>
            <div>
                <List>
                    <ListItem>
                        <ListItemText primary={`Matches: ${user.wins + user.loses + user.draws}`} className={classes.listItem}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Win Rate: " className={classes.listItem}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Rank: " className={classes.listItem}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Cups: ${user.cups}`} className={classes.listItem}/>
                    </ListItem>
                </List>
                <MyButton onClick={() => changeLockUser(user._id)} className={classes.button} variant="contained" color="primary">
                    {isLocked ? "Unlock" : "Lock"}
                </MyButton>
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
        fontFamily: 'monospace',
        color: 'gray'
    },
    button: {
        width: '100%'
    },
}));

export default LeftSection;
