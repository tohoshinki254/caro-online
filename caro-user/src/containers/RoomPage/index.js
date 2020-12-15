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
    if (start && yourTurn && history[stepNumber].board[i][j] === null) {
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

  const resetState = () => {
    setYourTurn(isCreator => isCreator ? true : false);
    setStepNumber(stepNumber => 0);
    setHistory(history => [{
      board: initBoard(),
      lastMove: null,
      isCreator: null
    }])
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
              socket.on('player-joined', (name) => {
                player = { name: name, mark: 0 };
                setInfoBoard({ creator: creator, player: player });
                setYourTurn(true);
                setStart(true);
              });

              socket.on('player-done', ({ newBoard, location, isCreator }) => {
                addBoard({ newBoard, location, isCreator })
              })

            } else {
              setStart(true);
              socket.on('creator-done', ({ newBoard, location, isCreator }) => {
                addBoard({ newBoard, location, isCreator });
              })
            }

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
      <Grid container item xs={12}>
        <Typography align='center' className={classes.idText}>{`ID: ${match.params.roomId}`}</Typography>
      </Grid>
      <Grid className={classes.container} container alignItems='flex-start' justify='center'>
        <Grid container item xs={3} direction='column' justify='flex-end' alignItems='flex-end'>
          <InfoBoard creator={infoBoard.creator} player={infoBoard.player} />
        </Grid>
        <Grid container item xs={6} direction='row'>
          <Grid container style={{ paddingLeft: '3%', paddingRight: '3%' }}>
            <Board board={cloneBoard(history[stepNumber].board)} onClick={handleClick} />
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
    marginTop: '0.5%',
    width: '100%'
  }
});

export default RoomPage;