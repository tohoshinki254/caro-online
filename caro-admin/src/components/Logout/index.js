import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { TOKEN_NAME } from '../../global/constants';
import decode from 'jwt-decode';

const Logout = () => {
    const {setIsLogined} = useContext(AppContext);
    localStorage.removeItem(TOKEN_NAME);

    useEffect(() => {
        setIsLogined(false);
    }, [setIsLogined])
    return (
        <Redirect to='/login'/>
    )
}

export default Logout;