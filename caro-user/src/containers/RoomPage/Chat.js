import React, { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Message from '../../components/Message';
import MyTextField from '../../components/MyTextField';
import MyButton from '../../components/MyButton';
import { API_URL, TOKEN_NAME } from '../../global/constants';
import socketIOClient from "socket.io-client";
import decode from 'jwt-decode';

const Chat = ({ roomId }) => {
    const classes = useStyle();
    const socket = socketIOClient(API_URL, { transports: ['websocket'] });
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([]);
    const userInfo = decode(localStorage.getItem(TOKEN_NAME));

    useEffect(() => {
      socket.on('message', data => {
        if (data !== undefined && data !== null && data.roomId === roomId) {
          const temp = messages;
          temp.push({ id: data.id, name: data.name, mess: data.text, time: data.time });
          setMessages([...temp]);
          console.log(messages);
        }
      });
    }, [socket, messages]);

    const sendMessage = (message) => {
      socket.emit('chat-message', { message: message, _id: userInfo._id, roomId: roomId });
    };

    return (
      <div className={classes.container}>
        <Typography className={classes.text} align='center'>Chat</Typography>
        <div className={classes.chatContent}>
          {messages.map(message => message.id === userInfo._id ? 
            <Message isX isSender username={message.name} content={message.mess} time={message.time}/>
            : <Message username={message.name} content={message.mess} time={message.time}/>)}
        </div>
        <div className={classes.textField}>
          <MyTextField 
            placeholder='Enter content...'
            style={{width: '60%'}}
            value={content}
            onChange={event => setContent(event.target.value)}
          />
          <MyButton style={{width: '10%'}} onClick={() => sendMessage(content)}>
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
    marginTop: '5%'
  },
  text: {
    marginTop: '2%',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginBottom: '1%',
  },
  chatContent: {
    width: '100%',
    height: '250px',
    overflowX: 'hidden',
  },
  textField: {
    width: '100%',
    display: 'flex',
    marginTop: '4.5%',
    paddingLeft: '0%',
    justifyContent: 'space-around'
  }
});

export default Chat;