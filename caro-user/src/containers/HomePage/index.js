import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import MyAppBar from '../../components/MyAppBar';
import ListRoom from './ListRoom';
import InputAdornment from '@material-ui/core/InputAdornment';
import MyTextField from '../../components/MyTextField';
import MyButton from '../../components/MyButton';
import SearchIcon from '@material-ui/icons/Search';

const HomePage = () => {
    const classes = useStyle();
    return (
        <>
            <Grid container>
                <MyAppBar />
            </Grid>
            <Grid container>
                <Typography className={classes.room}>All Room</Typography>
            </Grid>
            <Grid className={classes.mainSection} container>
                <Grid className={classes.leftSection} item xs={8}>
                    <Grid style={{marginTop: '1%'}} container>
                        <Grid item xs={6}>
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
                                placeholder={'Search room by ID'}
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <MyButton className={classes.button}>
                                Create Room
                            </MyButton>
                        </Grid>
                        <Grid item xs={3}>
                            <MyButton className={classes.button}>
                                Play now
                            </MyButton>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <ListRoom />
                    </Grid>
                </Grid>
                <Grid item xs={4}>

                </Grid>
            </Grid>
        </>
    );
};


const useStyle = makeStyles({
    room: {
        fontFamily: 'NerkoOne',
        fontSize: '2rem',
        marginLeft: '2%',
        marginTop: '2%'
    },
    mainSection: {
        marginLeft: '2%',
        marginTop: '1%'
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
        marginBottom: '8%'
    },
    button: {
        marginTop: '4%',
        marginLeft: '8%',
        marginBottom: '8%',
        width: '60% '
    }
});
export default HomePage;