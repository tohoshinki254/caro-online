import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import MyTextField from '../../components/MyTextField';
import MyButton from '../../components/MyButton';
import { fetchWithoutAuthentication } from '../../api/fetch-data';
import { API_URL } from '../../global/constants';

const FormSection = ({ id, setLoading }) => {
    const classes = useStyles();
    const [password, setPassword] = useState({ value: '', error: false });
    const [rePassword, setRePassword] = useState({ value: '', error: false });
    const [output, setOutput] = useState('');
    
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

    const resetPassword = () => {
        setLoading(true);
        const data = {
            id: id,
            password: password.value
        }
        fetchWithoutAuthentication(API_URL + 'user/reset-password', 'POST', data)
            .then(
                (data) => {
                    setOutput('Reset password successfully');
                    setLoading(false);
                },
                (error) => {
                    setOutput('Error');
                    setLoading(false);
                }
            )
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.title}>Reset Password</Typography>
            <MyTextField className={classes.textField} 
                label='Password'
                type='password'
                value={password.value || ""}
                error={password.error}
                helperText={password.error ? 'Must contain a-z, A-Z & 0-9 and length >= 8':''}
                onChange={handlePasswordChange}
            />
            <MyTextField className={classes.textField} 
                label='Password Confirm'
                type='password'
                value={rePassword.value || ""}
                error={rePassword.error}
                helperText={rePassword.error ? 'Does not match password above':''}
                onChange={handleRePasswordChange}
            />
            <Typography className={classes.errorText}>{output}</Typography>
            <MyButton onClick={() => resetPassword()} className={classes.button} variant="contained" color="primary">
                Change Password
            </MyButton>    
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontFamily: 'RussoOne',
        fontSize: '2em'
    },
    textField: {
        marginTop: '7%'
    },
    button: {
        width: '100%',
        marginTop: '10%'
    },
    errorText: {
      color: 'red',
      fontSize: '0.9em',
      marginTop: '2%'
    }
});

export default FormSection;