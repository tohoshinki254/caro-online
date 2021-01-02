import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Message from '../../components/Message';

const Chat = () => {
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <Typography className={classes.text} align='center'>Chat</Typography>
      <div className={classes.chatContent}>
          <Message  isX isSender username="thanhtien813" content="abc" time="123" />
          <Message  username="thanhtien813" content="abc" time="123" />
          <Message  username="thanhtien813" content="abc" time="123" />
          <Message  isX isSender username="thanhtien813" content="abc" time="123" />
          <Message  username="thanhtien813" content="abc" time="123" />
          <Message  username="thanhtien813" content="abc" time="123" />
          <Message  isX isSender username="thanhtien813" content="abc" time="123" />
          <Message  username="thanhtien813" content="abc" time="123" />
          <Message  username="thanhtien813" content="abc" time="123" />
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