import React, { useState } from 'react';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { StyledTableCell, StyledTableRow } from '../../components/StyledTable/index';

const TableRooms = ({ rooms }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    let history = useHistory();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const seeRoomDetails = (room) => {
        const to = '/room/' + room.roomId;
        history.push({
            pathname: to,
            state: { room: room }
        });
    }

    return (
        <Paper style={{ width: '100%', marginBottom: '2%' }}>
            <TableContainer component={Paper}>
                <Table style={{ width: '100%' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ width: '15%'}}>Player 1</StyledTableCell>
                            <StyledTableCell style={{ width: '15%'}}>Player 2</StyledTableCell>
                            <StyledTableCell align="center">Matches</StyledTableCell>
                            <StyledTableCell align="center">P1 Wins</StyledTableCell>
                            <StyledTableCell align="center">P2 Wins</StyledTableCell>
                            <StyledTableCell align="center">Draws</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((room) => (
                            <StyledTableRow key={room.creator} onClick={() => seeRoomDetails(room)}>
                                <StyledTableCell component="th" scope="row" style={{ width: '15%' }}>
                                    {room.creator}
                                </StyledTableCell>
                                <StyledTableCell style={{ width: '15%' }}>{room.player}</StyledTableCell>
                                <StyledTableCell align="center">{room.creatorWinner + room.playerWinner + room.draws}</StyledTableCell>
                                <StyledTableCell align="center">{room.creatorWinner}</StyledTableCell>
                                <StyledTableCell align="center">{room.playerWinner}</StyledTableCell>
                                <StyledTableCell align="center">{room.draws}</StyledTableCell>
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

export default TableRooms;