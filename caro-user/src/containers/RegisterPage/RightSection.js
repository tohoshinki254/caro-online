import React, { useState } from 'react';
import { makeStyles, Typography, withStyles, TextField, Button } from '@material-ui/core';


const RightSection = () => {
    const classes = useStyle();
    const [username, setUsername] = useState({value: '', error: false});
    const [email, setEmail] = useState({value: '', error: false});
    const [name, setName] = useState({value: '', error: false});
    const [password, setPassword] = useState({value: '', error: false});
    const [rePassword, setRePassword] = useState({value: '', error: false});

    const handleUsernameChange = (event) => {
      const value = event.target.value;
      const patt =/^[a-zA-Z0-9.\-_$@*!]{6,16}$/;
      const newUsername = {value: value, error: !patt.test(value)}
      setUsername(newUsername);
    }

    const handleEmailChange = (event) => {
      const value = event.target.value;
      const patt =/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const newEmail = {value: value, error: !patt.test(value)}
      setEmail(newEmail);
    }

    const handlePasswordChange = (event) => {
      const value = event.target.value;
      const patt = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      const newPass = {value: value, error: !patt.test(value)}
      setPassword(newPass);
      setRePassword({value: rePassword.value, error: !(value === rePassword)})
    }

    const handleRePasswordChange = (event) => {
      const value = event.target.value;
      const newRePassword = {value: value, error: !(value === password.value)}
      setRePassword(newRePassword);
    }

    const handleNameChange = (event) => {
      let value = event.target.value;
      const newName = {value: value, error: value === ''}
      setName(newName)
    }
    return (
        <div className={classes.container}>
            <Typography className={classes.register}>Register</Typography>
            <CssTextField className={classes.textField} 
                label='Username'
                value={username.value || ""}
                error={username.error}
                helperText={username.error ? 'Only contain a-z, 0-9 and length [6, 16]':''}
                onChange={handleUsernameChange}
            />
            <CssTextField className={classes.textField} 
                label='Email'
                value={email.value || ""}
                error={email.error}
                helperText={email.error ? 'Email wrong format':''}
                onChange={handleEmailChange}
            />
            <CssTextField className={classes.textField} 
                label='Your Name'
                value={name.value || ""}
                error={name.error}
                helperText={name.error ? 'Your name is not empty':''}
                onChange={handleNameChange}
            />
            <CssTextField className={classes.textField} 
                label='Password'
                type='password'
                value={password.value || ""}
                error={password.error}
                helperText={password.error ? 'Must contain a-z, A-Z & 0-9 and length >= 8':''}
                onChange={handlePasswordChange}
            />
            <CssTextField className={classes.textField} 
                label='Password Confirm'
                type='password'
                value={rePassword.value || ""}
                error={rePassword.error}
                helperText={rePassword.error ? 'Does not match password above':''}
                onChange={handleRePasswordChange}
            />
            <ColorButton className={classes.signUpButton} variant="contained" color="primary">
                Sign Up
            </ColorButton>                                                                
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
      '& label.Mui-error': {
        color: 'black'
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
        }
      },
    },
})(TextField);

const useStyle = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    register: {
        fontFamily: 'RussoOne',
        fontSize: '2em'
    },
    textField: {
        marginTop: '7%'
    },
    signUpButton: {
        width: '40%',
        marginTop: '10%'
    }
});

export default RightSection;