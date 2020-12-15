const accountDAO = require('../models/account');
const moment = require('moment');

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

    socket.on('join-room', (data) => {
      socket.join(data.roomId);
      if (!data.isCreator) {
        socket.to(`${data.roomId}`).emit('player-joined', data.name);
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
    socket.on('result', ({isWin, roomId}) => {
      const result = isWin ? -1 : 0;
      socket.to(`${roomId}`).emit('game-done', {result: result});
    })
  }
}