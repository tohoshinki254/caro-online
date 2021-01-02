import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableContainer, TableRow, Paper, TableBody, TablePagination } from '@material-ui/core';
import { StyledTableCell, StyledTableRow } from '../../components/StyledTable/index';
import { useHistory } from 'react-router-dom';

const TableUsers = ({ users }) => {
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

    const seeUserDetails = (user) => {
        const to = '/user/' + user._id;
        history.push({
            pathname: to,
            state: { user: user }
        });
    }

    return (
        <Paper style={{ width: '100%', marginBottom: '2%' }}>
            <TableContainer component={Paper}>
                <Table style={{ width: '100%' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ width: '15%'}}>Name</StyledTableCell>
                            <StyledTableCell style={{ width: '15%'}}>Email</StyledTableCell>
                            <StyledTableCell align="center">Cups</StyledTableCell>
                            <StyledTableCell align="center">Wins</StyledTableCell>
                            <StyledTableCell align="center">Draws</StyledTableCell>
                            <StyledTableCell align="center">Loses</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                            <StyledTableRow key={user.name} onClick={() => seeUserDetails(user)}>
                                <StyledTableCell component="th" scope="row" style={{ width: '15%'}}>
                                    {user.name}
                                </StyledTableCell>
                                <StyledTableCell style={{ width: '15%'}}>{user.email}</StyledTableCell>
                                <StyledTableCell align="center">{user.cups}</StyledTableCell>
                                <StyledTableCell align="center">{user.wins}</StyledTableCell>
                                <StyledTableCell align="center">{user.draws}</StyledTableCell>
                                <StyledTableCell align="center">{user.loses}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination 
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default TableUsers;
