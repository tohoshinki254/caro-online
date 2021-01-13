import React, { useState, useContext, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import MyAppBar from '../../components/MyAppBar';
import MyButton from '../../components/MyButton';
import MyTextField from '../../components/MyTextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { AppContext } from '../../contexts/AppContext';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { API_URL, TOKEN_NAME } from '../../global/constants';
import { fetchWithAuthentication } from '../../api/fetch-data';
import TableUsers from './TableUsers';
import TableRooms from './TableRooms';

const HomePage = () => {
    const classes = useStyles();
    const { isLogined } = useContext(AppContext);
    const history = useHistory();
    
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState('');
    const [searchText, setSearchText] = useState('');

    const [displayUsers, setDisplayUsers] = useState(true);
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
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

        setLoading(true);
        fetchWithAuthentication(API_URL + 'room/rooms-ended', 'GET', localStorage.getItem(TOKEN_NAME))
            .then(
                (data) => {
                    setLoading(false);
                    setRooms(data.rooms);
                },
                (error) => {
                    setLoading(false);
                    setOutput(error.message);
                }
            )
    }, [setUsers, setRooms]);
    
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
                        <Grid item xs={3}>
                            <MyTextField
                                className={classes.searchBar} 
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <SearchIcon style={{fontSize: '1.3rem'}} />
                                      </InputAdornment>
                                    ),
                                }}
                                placeholder={'Search user by name/email'}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </Grid>
                        <Grid container justify='center' item xs={3}>
                            <MyButton className={classes.button} 
                                variant="contained" 
                                color="primary"
                                onClick={() => setDisplayUsers(true)}
                            >
                                View list of users
                            </MyButton>
                        </Grid>
                        <Grid container justify='center' item xs={3}>
                            <MyButton className={classes.button} 
                                variant="contained" 
                                color="primary"
                                onClick={() => setDisplayUsers(false)}
                            >
                                View list of matches
                            </MyButton>
                        </Grid>
                        <Grid container justify='center' item xs={3}>
                            <MyButton onClick={createAccount} className={classes.button} variant="contained" color="primary">
                                Add new admin
                            </MyButton>
                        </Grid>
                    </Grid>

                    <Grid className={classes.mainSection} container>
                        {displayUsers ? 
                            <TableUsers users={users.filter(item => item.name.toLowerCase().includes(searchText) || (item.email !== null && item.email.toLowerCase().includes(searchText)))}/>
                        : <TableRooms rooms={rooms} />}
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
