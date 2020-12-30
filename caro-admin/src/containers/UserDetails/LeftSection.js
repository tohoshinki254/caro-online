import React, { useState } from 'react';
import { FormControlLabel, Grid, makeStyles } from '@material-ui/core';
import MyTextField from '../../components/MyTextField';
import MyButton from '../../components/MyButton';
import { fetchWithAuthentication } from '../../api/fetch-data';
import { API_URL, TOKEN_NAME } from '../../global/constants';

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
        <div className={classes.container}>
            <MyTextField className={classes.textField}
                label='User ID'
                defaultValue={user._id}
                disabled={true}
            />
            <MyTextField className={classes.textField}
                label='Username'
                defaultValue={user.username}
                disabled={true}
            />
            <MyTextField className={classes.textField}
                label='Name'
                defaultValue={user.name}
                disabled={true}
            />
            <MyTextField className={classes.textField}
                label='Email'
                defaultValue={user.email}
                disabled={true}
            />
            <Grid style={{ marginTop: '5%'}} container>
                <Grid item xs={2}>
                    <MyTextField className={classes.textField}
                        label='Cups'
                        disabled={true}
                        defaultValue={user.cups}
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={2}>
                    <MyTextField className={classes.textField}
                        label='Wins'
                        disabled={true}
                        defaultValue={user.wins}
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={2}>
                    <MyTextField className={classes.textField}
                        label='Loses'
                        disabled={true}
                        defaultValue={user.loses}
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={2}>
                    <MyTextField className={classes.textField}
                        label='Draws'
                        disabled={true}
                        defaultValue={user.draws}
                    />
                </Grid>
                <Grid item xs={1} />
            </Grid>
            <MyButton onClick={() => changeLockUser(user._id)} className={classes.button} variant="contained" color="primary">
                {isLocked ? "Unlock" : "Lock"}
            </MyButton>
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        marginTop: '5%',
        color: 'black'
    },
    button: {
        marginTop: '10%'
    },
});

export default LeftSection;
