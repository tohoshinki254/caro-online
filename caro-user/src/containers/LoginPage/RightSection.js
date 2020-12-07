import React, { useState } from 'react';
import { Button, makeStyles, TextField, Typography, withStyles } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { fetchWithoutAuthentication } from '../../api/fetch-data';
import { API_URL, TOKEN_NAME } from '../../global/constants';

const RightSection = () => {
    const classes = useStyle();
    const [loading, setLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [output, setOutput] = useState('');
    const [username, setUsername] = useState({value: '', error: false});
    const [password, setPassword] = useState({value: '', error: false});

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
              setLoginSuccess(true);
              setLoading(false);
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

    if (loginSuccess) {
      alert('Login successfully');
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.login}>Log In</Typography>
            <CssTextField className={classes.username} 
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
            <CssTextField className={classes.password} 
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
            <ColorButton onClick={handleLogin} className={classes.loginButton} variant="contained" color="primary">
                Login
            </ColorButton>
            <div className={classes.otherLogin}>
                <Typography className={classes.otherLoginText}>Or login with: </Typography>
                <img className={classes.icon} src="/assets/icons/facebook.svg" alt='facebook-icon'/>
                <img className={classes.icon} src="/assets/icons/google.svg" alt='google-icon'/>
            </div>         
        </div>
    );
}

const ColorButton = withStyles((theme) => ({
    root: {
      color: 'white',
      backgroundColor: 'dodgerblue',
      '&:hover': {
        backgroundColor: 'dodgerblue',
      },
    },
}))(Button);

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'black',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'black',
        },
      },
    },
})(TextField);

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