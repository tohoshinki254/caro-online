import { Grid, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import MyAppBar from '../../components/MyAppBar';
import RankingItem from '../../components/RankingItem';
import { AppContext } from '../../contexts/AppContext';
import Pagination from '@material-ui/lab/Pagination';
import { fetchWithAuthentication } from '../../api/fetch-data';
import { API_URL, TOKEN_NAME } from '../../global/constants';

const RankingBoard = () => {
  const classes = useStyle();
  const { isLogined, setLoading } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [rankingList, setRankingList] = useState([]);

  const handlePageChange = (event, value) => {
    setPage(value);
    setLoading(true)
    fetchWithAuthentication(API_URL + `user/ranking?page=${value}`, 'GET', localStorage.getItem(TOKEN_NAME))
      .then(
        (result) => {
          setRankingList(result.data);
          setLoading(false)
        },
        (error) => {
          console.log(error.message);
          setLoading(false)
        }
      )
  }

  useEffect(() => {
    setLoading(true)
    fetchWithAuthentication(API_URL + 'user/ranking', 'GET', localStorage.getItem(TOKEN_NAME))
      .then(
        (result) => {
          setRankingList(result.data);
          setTotalPage(result.totalPages);
          setLoading(false)
        },
        (error) => {
          console.log(error.message);
          setLoading(false)
        }
      )
  }, [])

  if (!isLogined) {
    return <Redirect to='/login' />
  }

  return (
    <>
      <Grid container>
        <MyAppBar isLogined />
      </Grid>
      <Grid className={classes.container} container >
        {rankingList.map(item => <RankingItem {...item} />)}
      </Grid>
      <Grid style={{marginTop: '2%'}} container justify='center'>
        <Pagination count={totalPage} page={page} color='primary' size='large' onChange={handlePageChange} />
      </Grid>
    </>
  )
}


const useStyle = makeStyles({
  container: {
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '2%',
    height: '75%'
  },
})


export default RankingBoard;