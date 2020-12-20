import React, { useContext, useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import MyAppBar from '../../components/MyAppBar';
import ListRoom from './ListRoom';
import InputAdornment from '@material-ui/core/InputAdornment';
import MyTextField from '../../components/MyTextField';
import MyButton from '../../components/MyButton';
import SearchIcon from '@material-ui/icons/Search';
import OnlineUsers from './OnlineUsers';
import { AppContext } from '../../contexts/AppContext';
import { Redirect } from 'react-router-dom';
import CreateRoomDialog from './CreateRoomDialog';
import JoinRoomDialog from './JoinRoomDialog';
import Loading from '../../components/Loading';

const HomePage = () => {
    const classes = useStyle();
    const {isLogined} = useContext(AppContext);
    const [openCreate, setOpenCreate] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleCloseCreate = () => setOpenCreate(false);
    const handleCloseJoin = () => setOpenJoin(false);
    if (!isLogined){
        return <Redirect to='/login' />
    }

    return (
        <>
            <Grid container>
                <MyAppBar isLogined />
            </Grid>
            <Grid container>
                <Grid item xs={8}>
                    <Typography className={classes.room}>All Room</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography className={classes.user}>User</Typography>
                </Grid>
            </Grid>
            <Grid className={classes.mainSection} container>
                <Grid className={classes.leftSection} item xs={8}>
                    <Grid style={{marginTop: '1%'}} container >
                        <Grid container justify='center' item xs={4} >
                            <MyButton className={classes.button} onClick={() => setOpenJoin(true)} >
                                Join Room
                            </MyButton>
                        </Grid>
                        <Grid  container justify='center' item xs={4} >
                            <MyButton className={classes.button} onClick={() => setOpenCreate(true)} >
                                Create Room
                            </MyButton>
                        </Grid>
                        <Grid container justify='center' item xs={4}>
                            <MyButton className={classes.button}>
                                Play now
                            </MyButton>
                        </Grid>
                    </Grid>
                    <Grid container style={{height: '450px', overflowX: 'hidden'}}>
                        <ListRoom />
                    </Grid>
                </Grid>
                <Grid className={classes.rightSection} item xs={4}>
                    <div className={classes.userContainer}>
                        <MyTextField
                            className={classes.searchUser} 
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon style={{fontSize: '1.3rem'}} />
                                </InputAdornment>
                                ),
                            }}
                            placeholder={'Search User...'}
                        />
                        <OnlineUsers />                        
                    </div>
                </Grid>
            </Grid>
            <CreateRoomDialog setLoading={setLoading} open={openCreate} onClose={handleCloseCreate} />
            <JoinRoomDialog setLoading={setLoading} open={openJoin} onClose={handleCloseJoin}/>
            {loading && <Loading />}
        </>
    );
};


const useStyle = makeStyles({
    room: {
        fontFamily: 'NerkoOne',
        fontSize: '2rem',
        marginLeft: '3.5%',
        marginTop: '2%'
    },
    mainSection: {
        marginLeft: '2%',
        marginTop: '0.5%'
    },
    leftSection: {
        borderColor: 'darkgray',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '5px',
        paddingBottom: '2%',
    },
    searchBar: {
        width: '60%',
        marginTop: '2%',
        marginLeft: '8%',
        marginBottom: '4%'
    },
    button: {
        marginTop: '4%',
        marginLeft: '8%',
        marginBottom: '8%',
        width: '60% '
    },
    user:{
        fontFamily: 'NerkoOne',
        fontSize: '2rem',
        marginLeft: '9%',
        marginTop: '4%'
    },
    rightSection: {
        paddingLeft: '1%',
        paddingRight: '6%'
    },
    userContainer: {
        backgroundColor: 'ghostwhite',
        height: '100%',
        width: '100%',
        borderRadius: '10px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '12%'
    },
    searchUser: {
        width: '88%',
        marginTop: '4%',
        marginBottom: '2%'
    }
});
export default HomePage;