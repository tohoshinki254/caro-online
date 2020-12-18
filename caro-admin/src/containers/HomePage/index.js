import React, { useState, useContext, useEffect } from 'react';
import { Grid, makeStyles, Table, TableHead, TableContainer, TableRow, Paper, TableBody } from '@material-ui/core';
import MyAppBar from '../../components/MyAppBar';
import { AppContext } from '../../contexts/AppContext';
import { Redirect } from 'react-router-dom';
import MyButton from '../../components/MyButton';
import { useHistory } from 'react-router-dom';
import { API_URL, TOKEN_NAME } from '../../global/constants';
import { fetchWithAuthentication } from '../../api/fetch-data';
import TableUsers from './TableUsers';

const HomePage = () => {
    const classes = useStyles();
    const { isLogined } = useContext(AppContext);
    const history = useHistory();

    const [displayUsers, setDisplayUsers] = useState(true);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [output, setOutput] = useState('');

    useEffect(() => {
        if (displayUsers && users.length === 0) {
            setLoading(true);
            fetchWithAuthentication(API_URL + 'admin/list-user', 'GET', localStorage.getItem(TOKEN_NAME))
                .then(
                    (data) => {
                        setLoading(false);
                        setUsers(data.users);
                    },
                    (error) => {
                        setLoading(false);
                        setOutput(error.message);
                    }
                )
        }
    }, [displayUsers, setDisplayUsers, setUsers, users]);
    
    const createAccount = () => {
        const to = '/register';
        history.push(to);
    }

    if (!isLogined){
        return <Redirect to='/login' />
    }

    return (
        <>
            <Grid container>
                <MyAppBar isLogined />    
            </Grid>
            <Grid container>
                <Grid item xs={1} />
                <Grid className={classes.mainSection} item xs={10}>
                    <Grid container>
                        <Grid container justify='center' item xs={4}>
                            <MyButton className={classes.button} variant="contained" color="primary">
                                View list of users
                            </MyButton>
                        </Grid>
                        <Grid container justify='center' item xs={4}>
                            <MyButton className={classes.button} variant="contained" color="primary">
                                View list of matches
                            </MyButton>
                        </Grid>
                        <Grid container justify='center' item xs={4}>
                            <MyButton onClick={createAccount} className={classes.button} variant="contained" color="primary">
                                Create an admin account
                            </MyButton>
                        </Grid>
                    </Grid>

                    <Grid className={classes.mainSection} container>
                        <TableUsers users={users}/>
                    </Grid>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </>
    )
}

const useStyles = makeStyles({
    mainSection: {
        marginTop: '2%'
    },
    button: {
        marginLeft: '8%',
        marginBottom: '8%',
        width: '80% '
    },
});

export default HomePage;
