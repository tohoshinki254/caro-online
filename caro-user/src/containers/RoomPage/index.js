import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import MyAppBar from '../../components/MyAppBar';
import { AppContext } from '../../contexts/AppContext';
import { Redirect } from 'react-router-dom';
import Board from './Board';
import InfoBoard from './InfoBoard';
import HistoryLog from './HistoryLog';
import Chat from './Chat';
import decode from 'jwt-decode';
import { API_URL, DRAW_IMAGE, LOSE_IMAGE, TOKEN_NAME, WIN_IMAGE } from '../../global/constants';
import { fetchWithAuthentication } from '../../api/fetch-data';
import { calculateWinner, cloneBoard, initBoard } from './Services';
import ResultDialog from './ResultDialog';
import RoomReducer from './reducer';
import { RoomContext } from './context';
import { addConfirmDialog, updateResult } from './actions';
import socket from '../../global/socket';
import ConfirmDialog from './ConfirmDialog';
import WaitingDialog from './WaitingDialog';

const initialState = {
  resultDialog: {
    open: false,
    image: null,
    content: null
  },
  confirmDialog: {
    open: false,
    image: null,
    content: null,
    handleYes: () => { },
    handleNo: () => { }
  },
  waitingDialog: {
    open: false
  }
}
const RoomPage = ({ match }) => {
  const classes = useStyle();
  const { isLogined } = useContext(AppContext);
  const [state, dispatch] = useReducer(RoomReducer, initialState);
  const [infoBoard, setInfoBoard] = useState({
    creator: {
      name: 'N/A',
      mark: 0,
      cups: 0,
      wins: 0,
      draws: 0,
      loses: 0
    },
    player: {
      name: 'N/A',
      mark: 0,
      cups: 0,
      wins: 0,
      draws: 0,
      loses: 0
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
        dispatch(updateResult({
          open: true,
          image: WIN_IMAGE,
          content: 'You Win'
        }))
        resetState();
        updateMark(isCreator);
      }

      if (result === 0) {
        socket.emit('result', { isWin: false, roomId: match.params.roomId, isCreator: isCreator });
        dispatch(updateResult({
          open: true,
          image: DRAW_IMAGE,
          content: 'Draw Game'
        }))
        updateMark();
        resetState();
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
        setStartStatus('Waiting for player start');
      } else {
        setYourTurn(isCreator);
        setStartStatus('Game started');
      }
      socket.emit('player-start', { roomId: match.params.roomId });
    }
  }

  const handleCloseResultDialog = () => {
    dispatch(updateResult({
      open: false,
      image: null,
      content: null
    }))
  }
  const resetState = () => {
    setYourTurn(false);
    setStart(false);
    setStartStatus('start');
    setPlayerStart(false);
  }

  const updateMark = (isCreatorWin) => {
    if (isCreatorWin === true) {
      setInfoBoard(infoBoard => {
        const winCups = infoBoard.creator.cups >= infoBoard.player.cups ? 1 : 3;
        const loseCups = infoBoard.player.cups > infoBoard.creator.cups ? 3 : 1;
        return {
          player: {
            ...infoBoard.player,
            cups: infoBoard.player.cups - loseCups,
            loses: infoBoard.player.loses + 1,
          },
          creator: {
            ...infoBoard.creator,
            mark: infoBoard.creator.mark + 1,
            cups: infoBoard.creator.cups + winCups,
            wins: infoBoard.creator.wins + 1,
          }
        };
      })
    } else {
      if (isCreatorWin === false) {
        setInfoBoard(infoBoard => {
          const winCups = infoBoard.player.cups >= infoBoard.creator.cups ? 1 : 3;
          const loseCups = infoBoard.creator.cups > infoBoard.player.cups ? 3 : 1;
          return {
            player: {
              ...infoBoard.player,
              cups: infoBoard.player.cups + winCups,
              mark: infoBoard.player.mark + 1,
              wins: infoBoard.player.wins + 1
            },
            creator: {
              ...infoBoard.creator,
              loses: infoBoard.creator.loses + 1,
              cups: infoBoard.creator.cups - loseCups
            }
          }
        })
      } else {
        setInfoBoard(infoBoard => {
          return {
            player: {
              ...infoBoard.player,
              draws: infoBoard.player.draws + 1,
            },
            creator: {
              ...infoBoard.creator,
              draws: infoBoard.player.draws + 1
            }
          }
        })
      }
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
            socket.emit('join-room', { name: userInfo.name, roomId: match.params.roomId, isCreator: isCreator, userId: userInfo._id });
            if (isCreator) {
              socket.emit('new-room-created');
              //player join the room
              socket.on('player-joined', (playerJoined) => {
                player = {
                  name: playerJoined.name,
                  mark: 0,
                  cups: playerJoined.cups,
                  wins: playerJoined.wins,
                  draws: playerJoined.draws,
                  loses: playerJoined.loses
                };
                setInfoBoard({ creator: creator, player: player });
              });

              //player play
              socket.on('player-done', ({ newBoard, location, isCreator }) => {
                addBoard({ newBoard, location, isCreator })
              })

              //listen player resign
              socket.on('player-resigned', () => {
                updateMark(true);
                resetState();
                dispatch(updateResult({
                  open: true,
                  image: WIN_IMAGE,
                  content: 'You Win'
                }));
              })

              //listen player claim draw
              socket.on('player-claimed-draw', () => {
                const handleYes = () => {
                  dispatch(addConfirmDialog({
                    open: false,
                    image: null,
                    content: null,
                    handleYes: () => { },
                    handleNo: () => { }
                  }));

                  socket.emit('creator-reply-draw', { roomId: match.params.roomId, accept: true });

                  dispatch(updateResult({
                    open: true,
                    image: DRAW_IMAGE,
                    content: 'Draw'
                  }));
                  updateMark();
                  resetState();
                }

                const handleNo = () => {
                  dispatch(addConfirmDialog({
                    open: false,
                    image: null,
                    content: null,
                    handleYes: () => { },
                    handleNo: () => { }
                  }));

                  socket.emit('creator-reply-draw', { roomId: match.params.roomId, accept: false });
                }

                dispatch(addConfirmDialog({
                  open: true,
                  image: DRAW_IMAGE,
                  content: 'Player want to claim a draw?',
                  handleYes: handleYes,
                  handleNo: handleNo
                }))
              })
            } else {
              socket.on('creator-done', ({ newBoard, location, isCreator }) => {
                addBoard({ newBoard, location, isCreator });
              })

              //listen creator resign
              socket.on('creator-resigned', () => {
                updateMark(false);
                resetState();
                dispatch(updateResult({
                  open: true,
                  image: WIN_IMAGE,
                  content: 'You Win'
                }));
              })

              //listen creator claim draw
              socket.on('creator-claimed-draw', () => {
                const handleYes = () => {
                  dispatch(addConfirmDialog({
                    open: false,
                    image: null,
                    content: null,
                    handleYes: () => { },
                    handleNo: () => { }
                  }));

                  socket.emit('player-reply-draw', { roomId: match.params.roomId, accept: true });

                  dispatch(updateResult({
                    open: true,
                    image: DRAW_IMAGE,
                    content: 'Draw'
                  }));
                  updateMark();
                  resetState();
                }

                const handleNo = () => {
                  dispatch(addConfirmDialog({
                    open: false,
                    image: null,
                    content: null,
                    handleYes: () => { },
                    handleNo: () => { }
                  }));

                  socket.emit('player-reply-draw', { roomId: match.params.roomId, accept: false });
                }

                dispatch(addConfirmDialog({
                  open: true,
                  image: DRAW_IMAGE,
                  content: 'Player want to claim a draw?',
                  handleYes: handleYes,
                  handleNo: handleNo
                }))
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
                  setStartStatus('Game started');
                } else {
                  setStartStatus('Player started, You can press this button to start right now');
                }
                return start;
              })
            })
            //event result
            socket.on('game-done', ({ result }) => {
              if (result === -1) {
                dispatch(updateResult({
                  open: true,
                  image: LOSE_IMAGE,
                  content: 'You Lose'
                }))
                resetState()
                updateMark(!isCreator);
              } else {
                dispatch(updateResult({
                  open: true,
                  image: DRAW_IMAGE,
                  content: 'Draw Game'
                }))
                updateMark();
                resetState();
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
      socket.off('creator-resigned')
      socket.off('player-resigned');
      socket.off('creator-claimed-draw');
      socket.off('player-claimed-draw');
    }
  }, []);

  if (!isLogined) {
    return <Redirect to='/login' />
  }


  return (
    <RoomContext.Provider value={{ dispatch, state }}>
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
          <InfoBoard
            yourTurn={yourTurn}
            resetState={resetState}
            updateMark={updateMark}
            isCreator={isCreator}
            handleStart={handleStart}
            startStatus={startStatus}
            creator={infoBoard.creator}
            player={infoBoard.player}
            roomId={match.params.roomId}
            start={start}
          />
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
      <ResultDialog
        open={state.resultDialog.open}
        content={state.resultDialog.content}
        image={state.resultDialog.image}
        onClose={handleCloseResultDialog} />
      <ConfirmDialog
        open={state.confirmDialog.open}
        content={state.confirmDialog.content}
        image={state.confirmDialog.image}
        handleNo={state.confirmDialog.handleNo}
        handleYes={state.confirmDialog.handleYes}
      />
      <WaitingDialog
        open={state.waitingDialog.open}
      />
    </RoomContext.Provider>
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
    marginLeft: '20%',
    fontFamily: 'NerkoOne',
  },
  turn: {
    fontWeight: 'bold',
    fontSize: '1.6rem',
    marginTop: '1%',
    width: '100%',
    marginLeft: '4%',
    fontFamily: 'NerkoOne',
  }
});

export default RoomPage;