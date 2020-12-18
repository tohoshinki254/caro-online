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
            />
            <MyTextField className={classes.textField}
                label='Username'
            />
            <MyTextField className={classes.textField}
                label='Name'
            />
            <MyTextField className={classes.textField}
                label='Email'
            />
            <Grid style={{ marginTop: '5%'}} container>
                <Grid item xs={3}>
                    <MyTextField className={classes.textField}
                        label='Wins'
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={3}>
                    <MyTextField className={classes.textField}
                        label='Loses'
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={3}>
                    <MyTextField className={classes.textField}
                        label='Draws'
                    />
                </Grid>
                <Grid item xs={1} />
            </Grid>
            <MyButton className={classes.button} variant="contained" color="primary">
                Back to home page
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
        marginTop: '5%'
    },
    button: {
        marginTop: '10%'
    },
});

export default LeftSection;
