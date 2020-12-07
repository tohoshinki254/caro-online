import React from 'react';
import { makeStyles, Typography, withStyles, TextField, Button } from '@material-ui/core';


const RightSection = () => {
    const classes = useStyle();
    return (
        <div className={classes.container}>
            <Typography className={classes.register}>Register</Typography>
            <CssTextField className={classes.textField} 
                label='Username'
            />
            <CssTextField className={classes.textField} 
                label='Email'
            />
            <CssTextField className={classes.textField} 
                label='Your Name'
            />
            <CssTextField className={classes.textField} 
                label='Password'
                type='password'
            />
            <CssTextField className={classes.textField} 
                label='Password Confirm'
                type='password'
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