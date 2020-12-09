import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { API_URL, TOKEN_NAME } from '../../global/constants';
import decode from 'jwt-decode';
import socketIOClient from "socket.io-client";

const Logout = () => {
    const socket = socketIOClient(API_URL, {transports: ['websocket']});
    const {setIsLogined} = useContext(AppContext);
    const userInfo = decode(localStorage.getItem(TOKEN_NAME));
    localStorage.removeItem(TOKEN_NAME);

    useEffect(() => {
        socket.emit('update-status', {_id: userInfo._id, isOnline: false});
        setIsLogined(false);
    }, [setIsLogined])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Redirect to='/login'/>
    )
}

export default Logout;