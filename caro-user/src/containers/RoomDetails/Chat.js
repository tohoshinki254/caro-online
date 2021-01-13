import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Message from '../../components/Message';

const Chat = ({ chat, creatorName, playerName }) => {
  const classes = useStyle();

  console.log(chat);

  return (
    <div className={classes.container}>
      <Typography className={classes.text} align='center'>Chat</Typography>
      <div className={classes.chatContent}>
          {chat.map((item) => (
            item.isCreator ?
            <Message username={creatorName} content={item.content} />
            : <Message isX isSender username={playerName} content={item.content} />
          ))}
      </div>
    </div>
  );
}

const useStyle = makeStyles({
  container: {
    height: '320px',
    borderColor: 'darkgray',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '2%'
  },
  text: {
    marginTop: '2%',
    fontWeight: 'bold',
    fontSize: '1.7rem',
    marginBottom: '1%',
    fontFamily: 'NerkoOne'
  },
  chatContent: {
    width: '100%',
    height: '250px',
    overflowX: 'hidden',
  },
});

export default Chat;