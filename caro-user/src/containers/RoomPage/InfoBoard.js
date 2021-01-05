import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import UserCard from '../../components/UserCard';
import MyButton from '../../components/MyButton';
import { DRAW_IMAGE, ERRO_IMAGE, FLAG_IMAGE, LOSE_IMAGE, WIN_IMAGE } from '../../global/constants';
import { RoomContext } from './context';
import { addConfirmDialog, addInvitePlayerDialog, addWatingDialog, updateResult } from './actions';
import socket from '../../global/socket';
import { convertBoardArray } from './util';


const InfoBoard = ({ creator, player, startStatus = 'Start', handleStart, isCreator, resetState, updateMark, yourTurn, roomId, start, history }) => {
  const classes = useStyle();
  const [xRemain, setXRemain] = useState(120);
  const [oRemain, setORemain] = useState(120);
  const [counter, setCounter] = useState(null);
  const { dispatch } = useContext(RoomContext);
  const defaultInfo = { name: 'N/A', mark: 0 };

  if (creator === null) creator = defaultInfo;
  if (player === null) player = defaultInfo;

  const handleCloseResultDialog = () => {
    dispatch(updateResult({
      open: false,
      image: null,
      content: null
    }))
  }
  
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
        content: 'You Lose',
        buttonText: 'Play Again',
        onClose: handleCloseResultDialog
      }))

      const eventResign = isCreator ? 'creator-resign' : 'player-resign';
      socket.emit(eventResign, { roomId: roomId, history: convertBoardArray(history) });
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
          updateMark();
          dispatch(updateResult({
            open: true,
            image: DRAW_IMAGE,
            content: 'Draw',
            buttonText: 'Play Again',
            onClose: handleCloseResultDialog
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

  const handleInvite = () => {
    if (creator.name !== 'N/A' && player.name !== 'N/A') {
      dispatch(updateResult({
        open: true,
        image: ERRO_IMAGE,
        content: 'Room is full.',
        onClose: handleCloseResultDialog,
        buttonText: 'OK',
        textSize: '2rem'
      }))
      return;
    }

    dispatch(addInvitePlayerDialog({
      open: true
    }));
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
        socket.emit('countdown-creator', { remain: xRemain, roomId: roomId, history: convertBoardArray(history) });
        dispatch(updateResult({
          open: true,
          image: LOSE_IMAGE,
          content: 'You Lose',
          buttonText: 'Play Again',
          onClose: handleCloseResultDialog
        }));
        resetState();
        updateMark(!isCreator)
      } else {
        dispatch(updateResult({
          open: true,
          image: WIN_IMAGE,
          content: 'You Win',
          buttonText: 'Play Again',
          onClose: handleCloseResultDialog
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
          content: 'You Win',
          buttonText: 'Play Again',
          onClose: handleCloseResultDialog
        }))
        updateMark(isCreator)
        resetState();
        setORemain(120);
      } else {
        socket.emit('countdown-player', { remain: oRemain, roomId: roomId, history: convertBoardArray(history) });
        dispatch(updateResult({
          open: true,
          image: LOSE_IMAGE,
          content: 'You Lose',
          buttonText: 'Play Again',
          onClose: handleCloseResultDialog
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
          style={{ width: '100%', marginTop: '2%' }}
          onClick={handleInvite}
        >
          INVITE PLAYER
        </MyButton>
        <MyButton
          style={{ width: '45%', marginTop: '2%' }}
          onClick={handleResign}
        >
          Resign
        </MyButton>
        <MyButton
          style={{ width: '45%', marginLeft: '10%', marginTop: '2%' }}
          onClick={handleDraw}
        >
          Draw
        </MyButton>
      </div>
      <UserCard isBorder userStat={player} marginTop='5%'  minutes={oRemain} />
      <UserCard isBorder userStat={creator} marginTop='5%' minutes={xRemain} isX />

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