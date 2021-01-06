const accountDAO = require('../models/account');
const roomDAO = require('../models/room');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const { updateResult, inviteUser } = require('../controllers/room');

const getOnlineList = async () => {
  const res = await accountDAO.find({ isOnline: true, isAdmin: false });
  return res;
}

const formatMessage = (id, name, text, roomId) => {
  return {
    id,
    name,
    text,
    roomId,
    time: moment().format('h:mm a')
  };
};

module.exports = {
  configSocket: async (socket, io) => {
    socket.on('get-online-list', async () => {
      const onlineList = await getOnlineList();
      socket.emit('online-list', onlineList);
    });
    socket.on('update-status', async (data) => {
      const user = await accountDAO.findById(data._id);
      if (user && user.isOnline !== data.isOnline) {
        user.isOnline = data.isOnline;
        await user.save();
        const onlineList = await getOnlineList();
        io.emit('update-online-list', onlineList)
      }
    });

    socket.on('join-room', async (data) => {
      socket.join(data.roomId);
      if (!data.isCreator) {
        const player = await accountDAO.findById(data.userId);
        if (player)
          socket.to(`${data.roomId}`).emit('player-joined', player);
      }
    });

    socket.on('chat-message', async (data) => {
      const user = await accountDAO.findById(data._id);
      if (user) {
        io.emit('message', formatMessage(user._id, user.name, data.message, data.roomId));
      }
    });

    socket.on('creator-do', ({ board, location, isCreator, roomId }) => {
      socket.to(`${roomId}`).emit('creator-done', { newBoard: board, location, isCreator });
    })

    socket.on('player-do', ({ board, location, isCreator, roomId }) => {
      socket.to(`${roomId}`).emit('player-done', { newBoard: board, location, isCreator });
    })

    //isWin true: win, false: draw
    socket.on('result', async ({ isWin, roomId, isCreator, history }) => {
      //update db
      const room = await roomDAO.findOne({ roomId: roomId });
      if (room) {
        if (isCreator && isWin) {
          room.creatorWinner++;
          await updateResult(roomId, 1, history);
        } else {
          if (!isCreator && isWin) {
            room.playerWinner++;
            await updateResult(roomId, -1, history);
          } else {
            await updateResult(roomId, 0, history);
          }
        }
        await room.save();
      }
      const result = isWin ? -1 : 0;
      socket.to(`${roomId}`).emit('game-done', { result: result });
    })

    //update list room realtime 
    socket.on('new-room-created', () => {
      socket.broadcast.emit('reload-list-room');
    });

    //player start the game
    socket.on('player-start', (data) => {
      socket.to(`${data.roomId}`).emit('player-started');
    })

    //countdown creator
    socket.on('countdown-creator', async ({ remain, roomId, history }) => {
      socket.to(`${roomId}`).emit('creator-remain-time', { remain: remain })
      if (remain === 0) {
        const room = await roomDAO.findOne({ roomId: roomId });
        room.playerWinner++;
        await updateResult(roomId, -1, history);
        await room.save();
      }

    })

    //countdown player
    socket.on('countdown-player', async ({ remain, roomId, history }) => {
      socket.to(`${roomId}`).emit('player-remain-time', { remain: remain });
      if (remain === 0) {
        const room = await roomDAO.findOne({ roomId: roomId });
        room.creatorWinner++;
        await updateResult(roomId, 1, history);
        await room.save();
      }
    })

    //creator resign
    socket.on('creator-resign', async ({ roomId, history }) => {
      socket.to(`${roomId}`).emit('creator-resigned');
      const room = await roomDAO.findOne({ roomId: roomId });
      if (room) {
        room.playerWinner++;
        await updateResult(roomId, -1, history);
        await room.save();
      }
    })

    //player resign
    socket.on('player-resign', async ({ roomId, history }) => {
      socket.to(`${roomId}`).emit('player-resigned');
      const room = await roomDAO.findOne({ roomId: roomId });
      if (room) {
        room.creatorWinner++;
        await updateResult(roomId, 1, history);
        await room.save();
      }
    })

    //creator claim draw
    socket.on('creator-claim-draw', async ({ roomId }) => {
      socket.to(`${roomId}`).emit('creator-claimed-draw');
    })

    socket.on('player-reply-draw', async ({ roomId, accept, history }) => {
      socket.to(`${roomId}`).emit('player-replied-draw', { accept });
      if (accept) {
        const room = await roomDAO.findOne({ roomId: roomId });
        if (room) {
          room.draws++;
          await room.save();
          await updateResult(roomId, 0, history);
        }
      }
    })

    //player claim draw
    socket.on('player-claim-draw', async ({ roomId }) => {
      socket.to(`${roomId}`).emit('player-claimed-draw');
    })


    socket.on('creator-reply-draw', async ({ roomId, accept, history }) => {
      socket.to(`${roomId}`).emit('creator-replied-draw', { accept });
      if (accept) {
        const room = await roomDAO.findOne({ roomId: roomId });
        if (room) {
          room.draws++;
          await room.save();
          await updateResult(roomId, 0, history);
        }
      }
    })

    //player exit
    socket.on('player-exit', async ({ roomId, isCreator, history, start }) => {
      const room = await roomDAO.findOne({ roomId: roomId });
      //set false in room value
      const userId = isCreator ? room.creator : room.player;
      const user = await accountDAO.findById(userId);
      if (user) {
        user.inRoom = false;
        await user.save();
      }
      //
      if (!room.isEnd && start) {
        if (isCreator)
          await updateResult(roomId, -1, history);
        else
          await updateResult(roomId, 1, history);
      }

      socket.to(`${roomId}`).emit('player-exited');
    })

    //invite player
    socket.on('invite-player', async ({ username, inviterName, roomId }) => {
      const res = await inviteUser(username);
      socket.emit('result-invite-player', { result: res.result, message: res.message });
      if (res.result) {
        io.emit('receive-invitation', { username, inviterName, roomId });
      }
    })
  }
}