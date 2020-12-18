import React, { useContext, useEffect, useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import MyAppBar from '../../components/MyAppBar';
import { AppContext } from '../../contexts/AppContext';
import { Redirect } from 'react-router-dom';
import Board from './Board';
import InfoBoard from './InfoBoard';
import HistoryLog from './HistoryLog';
import Chat from './Chat';
import decode from 'jwt-decode';
import { API_URL, TOKEN_NAME } from '../../global/constants';
import socketIOClient from "socket.io-client";
import { fetchWithAuthentication } from '../../api/fetch-data';
import { calculateWinner, cloneBoard, initBoard } from './Services';


const RoomPage = ({ match }) => {
  const classes = useStyle();
  const [socket] = useState(socketIOClient(API_URL, { transports: ['websocket'] }))
  const { isLogined } = useContext(AppContext);
  const [infoBoard, setInfoBoard] = useState({
    creator: {
      name: 'N/A',
      mark: 0
    },
    player: {
      name: 'N/A',
      mark: 0
    }
  });
  const [isCreator, setIsCreator] = useState(null);
  const [playerStart, setPlayerStart] = useState(false);
  const [startStatus, setStartStatus] = useState('Start');
  //state about board
  const [stepNumber, setStepNumber] = useState(0);
  const [start, setStart] = useState(false);
  const [yourTurn, setYourTurn] = useState(false);
  const [history, setHistory] = useState([{
    board: initBoard(),
    lastMove: null,
    isCreator: null
  }]);


  const handleClick = (i, j) => {
    if (start && playerStart && yourTurn && history[stepNumber].board[i][j] === null) {
      const _history = history.slice();

      const curr = _history[_history.length - 1];
      const board = cloneBoard(curr.board);

      board[i][j] = isCreator;
      setHistory(_history.concat([{
        board: board,
        lastMove: {
          i: i,
          j: j
        },
        isCreator: isCreator
      }]));
      setStepNumber(_history.length);
      setYourTurn(false);

      const event = isCreator ? 'creator-do' : 'player-do';
      socket.emit(event, {
        board: board,
        location: {
          i: i, j: j
        },
        isCreator: isCreator,
        roomId: match.params.roomId
      });

      //check win
      const result = calculateWinner(board, i, j, isCreator);
      if (result === 1) {
        socket.emit('result', { isWin: true, roomId: match.params.roomId, isCreator: isCreator });
        alert('You win');
        resetState();
        updateMark(isCreator);
      }

      if (result === 0) {
        socket.emit('result', { isWin: false, roomId: match.params.roomId, isCreator: isCreator });
        resetState();
        alert('draw');
      }
      //------------------------------------
    }
  }

  const handleStart = () => {
    if (infoBoard.player.name === 'N/A') {
      alert('Game cannot start because room not enough two people');
      return;
    }
    if (!start) {
      setStart(true);
      setStepNumber(0);
      setHistory([{
        board: initBoard(),
        lastMove: null,
        isCreator: null
      }])
      if (!playerStart) {
        setStartStatus('Wating for player start');
      } else {
        setYourTurn(isCreator);
        setStartStatus('Game is started');
      }
      socket.emit('player-start', { roomId: match.params.roomId });
    }
  }

  const resetState = () => {
    setYourTurn(false);
    setStart(false);
    setStartStatus('start');
    setPlayerStart(false);

  }

  const updateMark = (isCreatorWin) => {
    if (isCreatorWin) {
      setInfoBoard(infoBoard => {
        return {
          player: infoBoard.player,
          creator: {
            name: infoBoard.creator.name,
            mark: infoBoard.creator.mark + 1
          }
        };
      })
    } else {
      setInfoBoard(infoBoard => {
        return {
          player: {
            name: infoBoard.player.name,
            mark: infoBoard.player.mark + 1
          },
          creator: infoBoard.creator
        }
      })
    }
  }
  const addBoard = ({ newBoard, location, isCreator }) => {
    setHistory(history => history.concat([{
      board: cloneBoard(newBoard),
      lastMove: {
        i: location.i,
        j: location.j
      },
      isCreator: isCreator
    }]));
    setStepNumber(stepNumber => stepNumber + 1);
    setYourTurn(true);
  }

  useEffect(() => {
    if (localStorage.getItem(TOKEN_NAME) !== null) {
      const userInfo = decode(localStorage.getItem(TOKEN_NAME));
      fetchWithAuthentication(API_URL + 'room/detail', 'POST', localStorage.getItem(TOKEN_NAME), { userId: userInfo._id, roomId: match.params.roomId })
        .then(
          (data) => {
            let { player, creator, isCreator } = data;
            socket.emit('join-room', { name: userInfo.name, roomId: match.params.roomId, isCreator: isCreator });
            if (isCreator) {
              //player join the room
              socket.on('player-joined', (name) => {
                player = { name: name, mark: 0 };
                setInfoBoard({ creator: creator, player: player });
              });

              //player play
              socket.on('player-done', ({ newBoard, location, isCreator }) => {
                addBoard({ newBoard, location, isCreator })
              })

            } else {
              socket.on('creator-done', ({ newBoard, location, isCreator }) => {
                addBoard({ newBoard, location, isCreator });
              })
            }
            //player click start
            socket.on('player-started', () => {
              setPlayerStart(true);
              setStart((start) => {
                if (start) {
                  setIsCreator(isCreator => {
                    setYourTurn(isCreator);
                    return isCreator;
                  });
                  setStartStatus('Game is started');
                } else {
                  setStartStatus('Player started, You can press this button to start right now');
                }
                return start;
              })
            })
            //event result
            socket.on('game-done', ({ result }) => {
              if (result === -1) {
                resetState()
                updateMark(!isCreator);
                alert('You lose');
              } else {
                resetState();
                alert('you draw')
              }
            })

            setIsCreator(isCreator);
            setInfoBoard({ creator: creator, player: player });
          },
          (error) => {
            alert(error.message);
          }
        )
    }
    return () => {
      socket.off('player-joined');
      socket.off('player-done');
      socket.off('creator-done');
      socket.off('game-done');
      socket.off('player-started');
    }
  }, []);

  if (!isLogined) {
    return <Redirect to='/login' />
  }


  return (
    <>
      <Grid container>
        <MyAppBar isLogined />
      </Grid>
      <Grid container>
        <Grid item container xs={3}>
          <Typography align='center' className={classes.idText}>{`ID: ${match.params.roomId}`}</Typography>
        </Grid>
        <Grid item container xs={6}>
          <Typography align='center' className={classes.turn} > {yourTurn ? 'Your Turn ...' : 'Waiting for player ...'}</Typography>
        </Grid>
      </Grid>
      <Grid className={classes.container} container alignItems='flex-start' justify='center'>
        <Grid container item xs={3} direction='column' justify='flex-end' alignItems='flex-end'>
          <InfoBoard handleStart={handleStart} startStatus={startStatus} creator={infoBoard.creator} player={infoBoard.player} />
        </Grid>
        <Grid container item xs={6} direction='row'>
          <Grid container style={{ paddingLeft: '3%', paddingRight: '3%' }}>
            <Board board={cloneBoard(history[stepNumber].board)} lastMove={history[stepNumber].lastMove} onClick={handleClick} />
          </Grid>
        </Grid>
        <Grid style={{ paddingLeft: '1%' }} item xs={3}>
          <HistoryLog histoy={history.slice()} creatorName={infoBoard.creator.name} playerName={infoBoard.player.name} />
          <Chat roomId={match.params.roomId} />
        </Grid>
      </Grid>
    </>
  );
}


const useStyle = makeStyles({
  container: {
    paddingLeft: '4%',
    paddingTop: '0.5%',
    paddingRight: '4%'
  },
  idText: {
    fontWeight: 'bold',
    paddingLeft: '4%',
    fontSize: '1.6rem',
    marginTop: '2%',
    width: '100%',
    marginLeft: '20%'
  },
  turn: {
    fontWeight: 'bold',
    fontSize: '1.6rem',
    marginTop: '1%',
    width: '100%',
    marginLeft: '4%'
  }
});

export default RoomPage;