import React from 'react';
import { Grid } from '@material-ui/core';
import Cell from '../../components/Cell';


const Board = ({board, onClick, lastMove = {i: -1, j: -1}}) => {
    if (lastMove === null) lastMove = {i: -1, j: -1}
    const generateBoard = () => {
        const SIZE = 18;
        for (let i = 0; i < SIZE; i++){
            let row = [];
            let temp = [];
            for (let j = 0; j < SIZE; j++){
                temp.push(<Grid key={i * SIZE + j} container item xs={4}> <Cell isBorder={lastMove.i === i && lastMove.j === j} onClick={() => onClick(i, j)} key={i * SIZE + j} isX={board[i][j]} /> </Grid>);
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
        <> 
            {generateBoard()}
        </>
    );
}


export default Board;