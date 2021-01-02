import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import UserCard from '../../components/UserCard';
import MyButton from '../../components/MyButton';
import { DRAW_IMAGE, FLAG_IMAGE, LOSE_IMAGE, WIN_IMAGE } from '../../global/constants';
import { RoomContext } from './context';
import { addConfirmDialog, addWatingDialog, updateResult } from './actions';
import socket from '../../global/socket';


const InfoBoard = ({ creator, player, startStatus = 'Start', handleStart, isCreator, resetState, updateMark, yourTurn, roomId, start }) => {
  const classes = useStyle();
  const [xRemain, setXRemain] = useState(120);
  const [oRemain, setORemain] = useState(120);
  const [counter, setCounter] = useState(null);
  const { dispatch } = useContext(RoomContext);
  const defaultInfo = { name: 'N/A', mark: 0 };

  if (creator === null) creator = defaultInfo;
  if (player === null) player = defaultInfo;

  const handleResign = () => {
    if (!start)
      return;

    const handleYes = () => {
      //something
      resetState();
      updateMark(!isCreator);
      dispatch(addConfirmDialog({
        open: false,
        image: null,
        content: null,
        handleYes: () => { },
        handleNo: () => { }
      }))

      dispatch(updateResult({
        open: true,
        image: LOSE_IMAGE,
        content: 'You Lose'
      }))

      const eventResign = isCreator ? 'creator-resign' : 'player-resign';
      socket.emit(eventResign, { roomId: roomId });
    }
    const handleNo = () => {
      dispatch(addConfirmDialog({
        open: false,
        image: null,
        content: null,
        handleYes: () => { },
        handleNo: () => { }
      }))
    }

    dispatch(addConfirmDialog({
      open: true,
      image: FLAG_IMAGE,
      content: 'Do you want to resign?',
      handleYes: handleYes,
      handleNo: handleNo
    }))
  }

  const handleDraw = () => {
    if (!start)
      return;

    const handleYes = () => {
      dispatch(addConfirmDialog({
        open: false,
        image: null,
        content: null,
        handleYes: () => { },
        handleNo: () => { }
      }))

      dispatch(addWatingDialog({
        open: true
      }));

      const eventDraw = isCreator ? 'creator-claim-draw' : 'player-claim-draw';
      socket.emit(eventDraw, { roomId: roomId });

      const replyDraw = isCreator ? 'player-replied-draw' : 'creator-replied-draw';
      socket.on(replyDraw, ({ accept }) => {

        dispatch(addWatingDialog({
          open: false
        }));

        if (accept) {
          resetState();
          dispatch(updateResult({
            open: true,
            image: DRAW_IMAGE,
            content: 'Draw'
          }));
        } else {

        }

        socket.off(replyDraw);
      })
    }

    const handleNo = () => {
      dispatch(addConfirmDialog({
        open: false,
        image: null,
        content: null,
        handleYes: () => { },
        handleNo: () => { }
      }))
    }

    dispatch(addConfirmDialog({
      open: true,
      image: DRAW_IMAGE,
      content: 'Do you want to claim a draw?',
      handleYes: handleYes,
      handleNo: handleNo
    }))
  }

  useEffect(() => {
    if (yourTurn) {
      if (isCreator) {
        let countDown = setInterval(() => {
          setXRemain(xRemain => {
            socket.emit('countdown-creator', { remain: xRemain, roomId: roomId });
            return xRemain - 1;
          });
        }, 1000);
        setCounter(countDown);
        setORemain(120);
      } else {
        let countDown = setInterval(() => {
          setORemain(oRemain => {
            socket.emit('countdown-player', { remain: oRemain, roomId: roomId });
            return oRemain - 1;
          });
        }, 1000);
        setCounter(countDown);
        setXRemain(120);
      }
    } else {
      if (counter !== null) {
        clearInterval(counter)
        isCreator ? setXRemain(120) : setORemain(120);
      }
    }
  }, [yourTurn]);

  useEffect(() => {
    if (!start) {
      setXRemain(120);
      setORemain(120);
      if (counter !== null) clearInterval(counter)
    }
  }, [start])

  useEffect(() => {
    if (xRemain === 0) {
      if (isCreator) {
        socket.emit('countdown-creator', { remain: xRemain, roomId: roomId });
        dispatch(updateResult({
          open: true,
          image: LOSE_IMAGE,
          content: 'You Lose'
        }));
        resetState();
        updateMark(!isCreator)
      } else {
        dispatch(updateResult({
          open: true,
          image: WIN_IMAGE,
          content: 'You Win'
        }))
        updateMark(isCreator)
        resetState();
        setXRemain(120)
      }
    }
  }, [xRemain])

  useEffect(() => {
    if (oRemain === 0) {
      if (isCreator) {
        dispatch(updateResult({
          open: true,
          image: WIN_IMAGE,
          content: 'You Win'
        }))
        updateMark(isCreator)
        resetState();
        setORemain(120);
      } else {
        socket.emit('countdown-player', { remain: oRemain, roomId: roomId });
        dispatch(updateResult({
          open: true,
          image: LOSE_IMAGE,
          content: 'You Lose'
        }))
        updateMark(!isCreator)
        resetState();
      }
    }
  }, [oRemain])

  useEffect(() => {
    if (isCreator) {
      socket.on('player-remain-time', (data) => {
        setORemain(data.remain);
      })
    } else {
      socket.on('creator-remain-time', (data) => {
        setXRemain(data.remain);
      })
    }

    return () => {

      isCreator ? socket.off('player-remain-time') : socket.off('creator-remain-time');
    }
  }, [isCreator])


  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <MyButton
          style={{ width: '100%' }}
          onClick={handleStart}
        >
          {startStatus}
        </MyButton>
        <MyButton
          style={{ width: '45%', marginTop: '3%' }}
          onClick={handleResign}
        >
          Resign
        </MyButton>
        <MyButton
          style={{ width: '45%', marginLeft: '10%', marginTop: '3%' }}
          onClick={handleDraw}
        >
          Draw
        </MyButton>
      </div>
      <UserCard isBorder marginTop='10%' name={player.name} minutes={oRemain} mark={player.mark} />
      <UserCard isBorder marginTop='10%' name={creator.name} minutes={xRemain} mark={creator.mark} isX />

    </div>
  );
}


const useStyle = makeStyles({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',

  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginTop: '0%'
  }
});

export default InfoBoard;