import React, { useState } from 'react';
import { Grid, makeStyles  } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import UserRow from '../../components/UserRow';

const TableUsers = ({ users }) => {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    let history = useHistory();

    let totalPages = Math.floor(users.length / 4);
    users.length % 4 > 0 && totalPages++;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };  

    const seeUserDetails = (user) => {
        const to = '/user/' + user._id;
        history.push({
            pathname: to,
            state: { user: user }
        });
    }

    return (
        <>
            <Grid className={classes.container} container >
                {users.filter((user, index) => {
                    return index >= (page - 1) * 4 && index < (page - 1) * 4 + 4;
                }).map((user, index) => <UserRow user={user} key={index} seeDetails={seeUserDetails}/>)}
            </Grid>
            <Grid style={{marginTop: '2%', marginBottom: '5%'}} container justify='center'>
                <Pagination count={totalPages} page={page} color='primary' size='large' onChange={handleChangePage} />
            </Grid>
        </>
    )
}

const useStyles = makeStyles({
    container: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '2%',
        height: '75%',
    },
})

export default TableUsers;
