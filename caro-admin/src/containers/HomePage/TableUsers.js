import React, { useState } from 'react';
import { Table, TableHead, TableContainer, TableRow, Paper, TableBody, TablePagination } from '@material-ui/core';
import { StyledTableCell, StyledTableRow } from '../../components/StyledTable/index';
import MyButton from '../../components/MyButton';

const TableUsers = ({ users }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper style={{ width: '100%', marginBottom: '2%' }}>
            <TableContainer component={Paper}>
                <Table style={{ width: '100%' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ width: '15%'}}>Name</StyledTableCell>
                            <StyledTableCell style={{ width: '15%'}}>Email</StyledTableCell>
                            <StyledTableCell align="right">Wins</StyledTableCell>
                            <StyledTableCell align="right">Loses</StyledTableCell>
                            <StyledTableCell align="right">Draws</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                            <StyledTableRow key={user.name}>
                                <StyledTableCell component="th" scope="row" style={{ width: '15%'}}>
                                    {user.name}
                                </StyledTableCell>
                                <StyledTableCell style={{ width: '15%'}}>{user.email}</StyledTableCell>
                                <StyledTableCell align="right">0</StyledTableCell>
                                <StyledTableCell align="right">0</StyledTableCell>
                                <StyledTableCell align="right">0</StyledTableCell>
                                <StyledTableCell align="center">
                                    <MyButton>Lock</MyButton>
                                </StyledTableCell>
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
