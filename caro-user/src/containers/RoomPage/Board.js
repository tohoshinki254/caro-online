import React from 'react';
import { Grid } from '@material-ui/core';
import Cell from '../../components/Cell';


const Board = () => {
    const generateBoard = () => {
        const board = [];
        const SIZE = 17;

        for (let i = 0; i < SIZE; i++){
            let row = [];
            for (let j = 0; j < SIZE; j++){
                row.push(<Cell key={i * SIZE + j}/>)
            }
            row = <Grid key={i} container item justify='center'> {row} </Grid>
            board.push(row)
        }

        return board;
    } 
    return (
        <> 
            {generateBoard()}
        </>
    );
}


export default Board;