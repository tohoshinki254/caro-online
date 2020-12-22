import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { TOKEN_NAME } from '../../global/constants';
import decode from 'jwt-decode';
import socket from '../../global/socket';

const Logout = () => {
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