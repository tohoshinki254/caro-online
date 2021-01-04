import React, { useState } from 'react';
import { makeStyles, Paper, Table, TableContainer, TableHead, TablePagination, TableRow, TableBody } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { StyledTableCell, StyledTableRow } from '../../components/StyledTable';

const RightSection = ({ rooms, userId }) => {
    const classes = useStyles();
    let history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    const seeRoomDetails = (room) => {
        const to = '/review-room/' + room.roomId;
        history.push({
            pathname: to,
            state: { room: room }
        });
    }

    return (
        <Paper style={{ width: '100%' }}>
            <TableContainer component={Paper}>
                <Table style={{ width: '100%' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ width: '40%' }}>Competitor</StyledTableCell>
                            <StyledTableCell align="center">Cups won</StyledTableCell>
                            <StyledTableCell align="center">Wins</StyledTableCell>
                            <StyledTableCell align="center">Draws</StyledTableCell>
                            <StyledTableCell align="center">Loses</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((room) => (
                            <StyledTableRow key={room.creator !== userId ? room.creator : room.player} onClick={() => seeRoomDetails(room)}>
                                <StyledTableCell component="th" scope="row" style={{ width: '15%'}}>
                                    {room.creator !== userId ? room.creator : room.player}
                                </StyledTableCell>
                                <StyledTableCell align="center">{room.cups}</StyledTableCell>
                                <StyledTableCell align="center">{room.creator !== userId ? room.playerWinner : room.creatorWinner}</StyledTableCell>
                                <StyledTableCell align="center">{room.draws}</StyledTableCell>
                                <StyledTableCell align="center">{room.creator !== userId ? room.creatorWinner : room.playerWinner}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination 
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={rooms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

const useStyles = makeStyles({

});

export default RightSection;