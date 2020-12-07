import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import LeftSection from './LeftSection';


const LoginPage = () => {
    const classes = useStyle();
    return (
        <div className={classes.container}>
            <div className={classes.mark} />
                <Grid container>
                    <Grid item xs={3} />
                    <Grid className={classes.formSection} item xs={6}> 
                        <Grid container>
                            <Grid className={classes.rightLine} item xs={6}>
                                <LeftSection />
                            </Grid>
                            <Grid item xs={6}>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} />
                </Grid>
        </div>
    );
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
    rightLine: {
        borderRight: 'solid',
        borderRightColor: 'gray',
        borderRightWidth: '1.5px'
    }
});

export default LoginPage;