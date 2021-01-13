import React, { useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import MyTextField from '../../components/MyTextField';
import MyButton from '../../components/MyButton';
import { fetchWithAuthentication } from '../../api/fetch-data';
import { API_URL, TOKEN_NAME } from '../../global/constants';

const FormRegister = ({ history }) => {
    const classes = useStyle();
    const [username, setUsername] = useState({ value: '', error: false });
    const [password, setPassword] = useState({ value: '', error: false });
    const [email, setEmail] = useState({ value: '', error: false });
    const [name, setName] = useState({ value: '', error: false });
    const [rePassword, setRePassword] = useState({ value: '', error: false });

    const [loading, setLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [output, setOutput] = useState('');

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        const pattern =/^[a-zA-Z0-9.\-_$@*!]{6,16}$/;
        const newUsername = { value: value, error: !pattern.test(value) };
        setUsername(newUsername);
    }

    const handleEmailChange = (event) => {
        const value = event.target.value;
        const pattern =/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const newEmail = {value: value, error: !pattern.test(value)}
        setEmail(newEmail);
    }

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        const newPass = {value: value, error: !pattern.test(value)}
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

    const handleRegister = () => {
        const isAdmin = true;
        if (username.value !== "" && password.value !== "" && name.value !== "" && email.value !== "" && rePassword !== "") {
            setLoading(true);
            const data = {
                username: username.value,
                password: password.value,
                name: name.value,
                email: email.value,
                isAdmin: isAdmin
            }
            fetchWithAuthentication(API_URL + 'admin/account', 'POST', localStorage.getItem(TOKEN_NAME), data)
                .then(
                    (data) => {
                        setRegisterSuccess(true);
                        setLoading(false);
                    },
                    (error) => {
                        setLoading(false);
                        setOutput(error.message);
                    }
                )
        } else {
            alert('Enter full information');
        }
    }

    const goHomePage = () => {
        history.goBack();
    }

    if (registerSuccess) {
        alert('Create new admin successfully');
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.register}>Create New Admin</Typography>
            <MyTextField className={classes.textField}
                label='Username'
                value={username.value || ""}
                error={username.error}
                helperText={username.error ? 'Only contain a-z, 0-9 and length [6, 16]' : ''}
                onChange={handleUsernameChange}
            />
            <MyTextField className={classes.textField}
                label='Email'
                value={email.value || ""}
                error={email.error}
                helperText={email.error ? 'Email wrong format' : ''}
                onChange={handleEmailChange}
            />
            <MyTextField className={classes.textField}
                label='Name'
                value={name.value || ""}
                error={name.error}
                helperText={name.error ? 'Your name is not empty' : ''}
                onChange={handleNameChange}
            />
            <MyTextField className={classes.textField}
                label='Password'
                type='password'
                value={password.value || ""}
                error={password.error}
                helperText={password.error ? 'Must contain a-z, A-Z & 0-9 and length >= 8' : ''}
                onChange={handlePasswordChange}
            />
            <MyTextField className={classes.textField}
                label='Password Confirm'
                type='password'
                value={rePassword.value || ""}
                error={rePassword.error}
                helperText={rePassword.error ? 'Does not match password above' : ''}
                onChange={handleRePasswordChange}
            />
            <Typography className={classes.errorRegisterText}>{output}</Typography>
            <Grid className={classes.button} container>
                <Grid item xs={4}>
                    <MyButton onClick={handleRegister} variant="contained" color="primary">
                        Create
                    </MyButton>
                </Grid>
                <Grid item xs={8}>
                    <MyButton onClick={goHomePage} variant="contained" color="primary">
                        Back to home page
                    </MyButton>
                </Grid>
            </Grid>
        </div>
    )
}

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
        marginTop: '5%'
    },
    button: {
        marginTop: '10%'
    },
    errorRegisterText: {
      color: 'red',
      fontSize: '0.9em',
      marginTop: '2%'
    }
});

export default FormRegister;
