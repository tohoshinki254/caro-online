import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import LeftSection from './LeftSection';
import CenterSection from './CenterSection';
import RightSection from './RightSection';
import { API_URL, TOKEN_NAME } from '../../global/constants';
import { fetchWithAuthentication } from '../../api/fetch-data';

const RoomDetails = () => {
    const { room } = useLocation().state;
    const [matches, setMatches] = useState([]);
    const [match, setMatch] = useState();
    const [creator, setCreator] = useState();
    const [player, setPlayer] = useState();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const data = {
            roomId: room.roomId
        };
        fetchWithAuthentication(API_URL + 'match/matches-of-room', 'POST', localStorage.getItem(TOKEN_NAME), data)
            .then(
                (data) => {
                    setMatches(data.matches);
                    if (data.matches.length !== 0) {
                        setMatch(matches[0]);
                    }
                },
                (error) => {

                }
            )
    }, [setMatch])

    const changeMatch = (match) => {
        setMatch(match);
        setHistory(match.history);
    }

    const changeHistory = (step) => {
        setHistory(match.history.slice(0, step + 1));
    }

    return (
        <>
            <Grid container>
                <Grid item xs={3}>
                    <LeftSection matches={matches} changeMatch={changeMatch} creator={room.creator} player={room.player}/>
                </Grid>
                <Grid item xs={6}>
                    <CenterSection room={room} history={history} match={match}/>
                </Grid>
                <Grid item xs={3}>
                    <RightSection room={room} match={match} setHistory={changeHistory} creator={room.creator} player={room.player}/>
                </Grid>
            </Grid>
        </>
    )
}

export default RoomDetails;