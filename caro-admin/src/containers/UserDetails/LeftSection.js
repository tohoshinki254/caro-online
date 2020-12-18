import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import MyTextField from '../../components/MyTextField';
import MyButton from '../../components/MyButton';

const LeftSection = ({ user }) => {
    const classes = useStyles();

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
                <Grid item xs={3}>
                    <MyTextField className={classes.textField}
                        label='Wins'
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={3}>
                    <MyTextField className={classes.textField}
                        label='Loses'
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={3}>
                    <MyTextField className={classes.textField}
                        label='Draws'
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={1} />
            </Grid>
            <MyButton className={classes.button} variant="contained" color="primary">
                Lock
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
