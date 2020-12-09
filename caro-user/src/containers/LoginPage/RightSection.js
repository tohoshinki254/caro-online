import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { fetchWithoutAuthentication } from '../../api/fetch-data';
import { API_URL, TOKEN_NAME } from '../../global/constants';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import MyTextField from '../../components/MyTextField/index'
import MyButton from '../../components/MyButton/index'

const RightSection = ({setLoading}) => {
    const classes = useStyle();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [output, setOutput] = useState('');
    const [username, setUsername] = useState({value: '', error: false});
    const [password, setPassword] = useState({value: '', error: false});
    const {setIsLogined} = useContext(AppContext);

    
    const handleUsernameChange = (event) => {
      let value = event.target.value;
      const newUsername = { value: value, error: value === '' };
      setUsername(newUsername);
    }

    const handlePasswordChange = (event) => {
      let value = event.target.value;
      const newPassword = { value: value, error: value === '' };
      setPassword(newPassword);
    }

    const handleLogin = () => {
      if (username.value !== "" && password.value !== "") {
        setLoading(true);
        const data = {
          username: username.value,
          password: password.value
        }
        fetchWithoutAuthentication(API_URL + 'user/login', 'POST', data)
          .then(
            (data) => {
              localStorage.setItem(TOKEN_NAME, data.token);
              setLoading(false);
              setLoginSuccess(true);
            },
            (error) => {
              setLoading(false);
              setOutput(error.message);
            }
          )
      } else {
        alert('Enter username and password');
      }
    }

    useEffect(() => {
      if (loginSuccess) setIsLogined(true);
    }, [setIsLogined, loginSuccess])

    if (loginSuccess) {
      return <Redirect to='/home' />
    }

    return (
      <>
        <div className={classes.container}>
            <Typography className={classes.login}>Log In</Typography>
            <MyTextField className={classes.username} 
                placeholder='Username'
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle style={{fontSize: '1.3rem'}} />
                      </InputAdornment>
                    ),
                }}
                error={username.error}
                onChange={handleUsernameChange}
                value={username.value || ""}
            />
            <MyTextField className={classes.password} 
                placeholder='Password'
                type='password'
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{fontSize: '1.3rem'}} />
                      </InputAdornment>
                    ),
                }}
                error={password.error}
                onChange={handlePasswordChange}
                value={password.value || ""}
            />
            <Typography className={classes.errorLoginText}>{output}</Typography>
            <MyButton onClick={handleLogin} className={classes.loginButton} variant="contained" color="primary">
                Login
            </MyButton>
            <div className={classes.otherLogin}>
                <Typography className={classes.otherLoginText}>Or login with: </Typography>
                <img className={classes.icon} src="/assets/icons/facebook.svg" alt='facebook-icon'/>
                <img className={classes.icon} src="/assets/icons/google.svg" alt='google-icon'/>
            </div>         
        </div>
      </>

    );
}


const useStyle = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    login: {
        fontFamily: 'RussoOne',
        fontSize: '2em'
    },
    username: {
        marginTop: '10%'
    },
    password: {
        marginTop: '7%'
    },
    loginButton: {
        marginTop: '8%',
        width: '40%'
    },
    otherLogin: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '10%'
    },
    otherLoginText: {
        fontWeight: 'bold',
        fontSize: '0.9em',
        color: 'dimgray',
    },
    icon: {
        width: '7%',
        marginLeft: '5%',
        cursor: 'pointer'
    },
    errorLoginText: {
      color: 'red',
      fontSize: '0.9em',
      marginTop: '2%'
    }
});

export default RightSection;