import { makeStyles, CircularProgress } from '@material-ui/core';
import React from 'react';

const Loading = () => {
    const classes = useStyle();

    return (
        <>
            <div className={classes.loadingDiv} />
            <CircularProgress size={60} className={classes.loadingItem}/> 
        </>
    );
}

const useStyle = makeStyles({
    loadingDiv:{
        position: 'absolute',
        background: 'black',
        height: '100%',
        width: '100%',
        opacity: 0.4,
        zIndex: 4000
      },
    loadingItem: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 4001
    }    
});


export default Loading;