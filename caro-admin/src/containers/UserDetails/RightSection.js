import React, { useState } from 'react';
import { makeStyles, Paper, Table, TableContainer, TableHead, TablePagination, TableRow, TableBody } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { StyledTableCell, StyledTableRow } from '../../components/StyledTable';

const RightSection = () => {
    const classes = useStyles();
    let history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);

    const [matches, setMatches] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };    

    return (
        <Paper style={{ width: '100%' }}>
            <TableContainer component={Paper}>
                <Table style={{ width: '100%' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ width: '40%' }}>Competitor</StyledTableCell>
                            <StyledTableCell align="right">Cups won</StyledTableCell>
                            <StyledTableCell align="right">Wins</StyledTableCell>
                            <StyledTableCell align="right">Draws</StyledTableCell>
                            <StyledTableCell align="right">Loses</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {matches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((match) => (
                            <></>
                        ))} */}
                        <StyledTableRow>
                            <StyledTableCell style={{ width: '40%' }}>Competitor</StyledTableCell>
                            <StyledTableCell align="right">Cups won</StyledTableCell>
                            <StyledTableCell align="right">Wins</StyledTableCell>
                            <StyledTableCell align="right">Draws</StyledTableCell>
                            <StyledTableCell align="right">Loses</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell style={{ width: '40%' }}>Competitor</StyledTableCell>
                            <StyledTableCell align="right">Cups won</StyledTableCell>
                            <StyledTableCell align="right">Wins</StyledTableCell>
                            <StyledTableCell align="right">Draws</StyledTableCell>
                            <StyledTableCell align="right">Loses</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell style={{ width: '40%' }}>Competitor</StyledTableCell>
                            <StyledTableCell align="right">Cups won</StyledTableCell>
                            <StyledTableCell align="right">Wins</StyledTableCell>
                            <StyledTableCell align="right">Draws</StyledTableCell>
                            <StyledTableCell align="right">Loses</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination 
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={matches.length}
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