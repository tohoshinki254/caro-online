import React from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import Cell from '../../components/Cell/index';

const CenterSection = ({ room, history, match }) => {
    const classes = useStyles();

    let board = [];
    for (let i = 0; i < 18; i++) {
        board.push(Array(18).fill(null))
    };

    for (let i = 0; i < history.length; i++) {
        const item = history[i];
        board[item.i][item.j] = item.isCreator;
    }

    const generateBoard = () => {
        const SIZE = 18;
        for (let i = 0; i < SIZE; i++){
            let row = [];
            let temp = [];
            for (let j = 0; j < SIZE; j++){
                temp.push(<Grid key={i * SIZE + j} container item xs={4}> <Cell onClick={() => {}} key={i * SIZE + j} isX={board[i][j]} /> </Grid>);
                if (temp.length === 3){
                    row.push(<Grid key={i * SIZE + j} container item xs={2} >{temp.slice()}</Grid>);
                    temp = [];
                }
            }
            board.push(row);
        }
        return board;
    } 

    return (
        <div className={classes.root}>
            <Typography className={classes.title}>Room {room.roomId} {match !== undefined ? ` - Game ${match.match}` : null} </Typography>
            <Grid container>
                {generateBoard()}
            </Grid>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'NerkoOne',
        fontSize: '1.7rem',
    },
});

export default CenterSection;