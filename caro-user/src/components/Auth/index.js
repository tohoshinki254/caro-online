import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchWithAuthentication } from '../../api/fetch-data';
import { AppContext } from '../../contexts/AppContext';
import { API_URL, TOKEN_NAME } from '../../global/constants';

const Auth = ({match}) => {
    const {token} = match.params;
    const {isLogined, setIsLogined} = useContext(AppContext);
    const [result, setResult] = useState(true);

    useEffect(() => {
        if (token) {
            fetchWithAuthentication(API_URL + 'user/token-validation', 'GET', token)
                .then(
                    (data) => {
                        localStorage.setItem(TOKEN_NAME, token);
                        setIsLogined(true);
                    },
                    (error) => {
                        setResult(false);
                    }
                )
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (token === undefined || !result) return <Redirect to='/login'/>
    if (isLogined) return <Redirect to ='/home'/>;

    return <> </>;
};


export default Auth;