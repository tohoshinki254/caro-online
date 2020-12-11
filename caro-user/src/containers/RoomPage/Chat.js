import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Message from '../../components/Message';
import MyTextField from '../../components/MyTextField';
import MyButton from '../../components/MyButton';

const Chat = () => {
    const classes = useStyle();
    return (
      <div className={classes.container}>
        <Typography className={classes.text} align='center'>Chat</Typography>
        <div className={classes.chatConent} >
          <Message isX isSender username='quang thien' content='123' />
          <Message isX isSender username='quang thien' content='123' />
          <Message username='thien fake' content='123' />
          <Message username='thien fake' content='123' />
          <Message username='thien fake' content='123' />
        </div>
        <div className={classes.textField}>
          <MyTextField 
            placeholder='Enter content...'
            style={{width: '60%'}}
          />
          <MyButton style={{marginLeft: '15%'}}>
            Send
          </MyButton>
        </div>
      </div>
    );
}


const useStyle = makeStyles({
  container: {
    width: '100%',
    height: '350px',
    backgroundColor: '#bdbdbd',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    marginTop: '10%'
  },
  text: {
    marginTop: '2%',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginBottom: '1%',
  },
  chatConent: {
    width: '100%',
    height: '250px',
    overflowX: 'hidden',
  },
  textField: {
    width: '100%',
    display: 'flex',
    marginTop: '4.5%',
    paddingLeft: '4%',
  }
});

export default Chat;