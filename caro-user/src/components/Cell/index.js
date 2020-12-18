import React from 'react';
import { makeStyles } from '@material-ui/core';


const Cell = ({isX, onClick, isBorder = false}) => {
    const classes = useStyle();
    const color = isX ? '#b71c1c' : '#2f78f7';
    const border = isBorder ? 'solid 1px black' : 'solid 0.5px white';
    const fillValue = () => {
        if (isX !== undefined && isX !== null){
            if (isX === true){
                return 'X'
            }else{
                return 'O';
            }
        }
    }
    return (
        <div className={classes.container} onClick={onClick} style={{color: color, border: border}}>
            {fillValue()}
        </div>
    );
}


const useStyle = makeStyles({
    container: {
        width: '100%',
        height: '32px',
        backgroundColor: '#bdbdbd',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        cursor: 'pointer',

    }
});

export default Cell;