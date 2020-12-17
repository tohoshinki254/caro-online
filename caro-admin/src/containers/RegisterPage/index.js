import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import FormRegister from './FormRegister';

const RegisterPage = ({ history }) => {
    const classes = useStyle();
    return (
        <div className={classes.container}>
            <div className={classes.mark} />
            <Grid container>
                <Grid item xs={4}/>
                <Grid className={classes.formSection} item xs={4}>
                    <FormRegister history={history} />
                </Grid>
                <Grid item xs={4}/>
            </Grid>
        </div>
    )
}

const useStyle = makeStyles({
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
        paddingTop: '3%',
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingBottom: '3%'
    },
    mark: {
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        position: 'absolute',
        zIndex: 3000,
        opacity: '0.6'
    },
})

export default RegisterPage;
