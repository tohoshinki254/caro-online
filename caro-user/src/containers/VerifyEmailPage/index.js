import React, { useState, useEffect } from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import MyButton from '../../components/MyButton';
import Loading from '../../components/Loading';
import { useHistory } from 'react-router-dom';
import { fetchWithoutAuthentication } from '../../api/fetch-data';
import { API_URL } from '../../global/constants';

const VerifyEmailPage = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchWithoutAuthentication(API_URL + 'user/mail-verification?id=' + props.match.params.id, 'GET')
            .then(
                (data) => {
                    setLoading(false);
                }, 
                (error) => {
                    alert('Error');
                }
            )
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={classes.container}>
            <div className={classes.mark} />
            <Grid container>
                <Grid item xs={3} />
                <Grid className={classes.formSection} item xs={6}> 
                    <Grid container style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Typography className={classes.title} >Verify Account Successfully</Typography>
                        <MyButton onClick={() => history.push('/login')} className={classes.signUpButton} variant="contained" color="primary">
                            Go To Login Page
                        </MyButton>  
                    </Grid>
                </Grid>
                <Grid item xs={3} />
            </Grid>
            {loading && <Loading />}
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        height: '100%',
        backgroundImage: "url('/assets/images/background.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center'
    },
    formSection: {
        backgroundColor: 'white',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        borderRadius: '5px',
        zIndex: 3001,
        paddingBottom: '1%',
        paddingTop: '1%'
    },
    mark: {
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        position: 'absolute',
        zIndex: 3000,
        opacity: '0.6'
    },
    title: {
        fontFamily: 'NerkoOne',
        fontWeight: 'bold',
        fontSize: '2em'
    },
    signUpButton: {
        width: '90%',
        marginTop: '5%'
    },
});

export default VerifyEmailPage;