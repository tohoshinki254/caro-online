import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import MyTextField from '../../components/MyTextField';
import MyButton from '../../components/MyButton';
import { fetchWithoutAuthentication } from '../../api/fetch-data';
import { API_URL } from '../../global/constants';

const FormSendEmail = ({ setLoading }) => {
    const classes = useStyles();
    const [email, setEmail] = useState({value: '', error: false});
    const [output, setOutput] = useState('');

    const handleEmailChange = (event) => {
        const value = event.target.value;
        const pattern =/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const newEmail = {value: value, error: !pattern.test(value)}
        setEmail(newEmail);
    }

    const sendMail = () => {
        setLoading(true);
        const data = {
            email: email.value
        };
        fetchWithoutAuthentication(API_URL + 'user/mail-reset-password', 'POST', data)
            .then(
                (data) => {
                    setOutput('Click link in email to reset password')
                    setLoading(false);
                },
                (error) => {
                    setOutput('Invalid email');
                    setLoading(false);
                }
            )
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.title}>Forget Password</Typography>
            <MyTextField className={classes.textField} 
                label='Email'
                value={email.value || ""}
                error={email.error}
                helperText={email.error ? 'Email wrong format':''}
                onChange={handleEmailChange}
            />
            <Typography className={classes.errorText}>{output}</Typography>
            <MyButton onClick={() => sendMail()} className={classes.button} variant="contained" color="primary">
                Send Email
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

export default FormSendEmail;