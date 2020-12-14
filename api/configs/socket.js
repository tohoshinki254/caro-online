const accountDAO = require('../models/account');
const { userJoin, getCurrentUser, userLeave, formatMessage } = require('../utils/user-socket');

const getOnlineList = async () => {
    const res = await accountDAO.find({isOnline: true, isAdmin: false});
    return res;
}
module.exports = {
    configSocket: async(socket, io) => {
        socket.on('get-online-list', async () => {
            const onlineList = await getOnlineList();
            socket.emit('online-list', onlineList);
        });
        socket.on('update-status', async (data) => {
            const user = await accountDAO.findById(data._id);
            if (user && user.isOnline !== data.isOnline){
                user.isOnline = data.isOnline;  
                await user.save();
                const onlineList = await getOnlineList();
                io.emit('update-online-list', onlineList)                
            }
        });

        socket.on('join-room', (data) => {
            socket.join(data.roomId);
            if (!data.isCreator){
                socket.to(`${data.roomId}`).emit('player-joined', data.name);
            }
        });

        socket.on('join-room', ({ username, room }) => {
            const user = userJoin(socket.id, username, room);

            socket.join(user.room);

            // Broadcast when a user connects
            socket.broadcast
                .to(user.room)
                .emit('message', formatMessage('', `${user.username} has joined the room`));
        });

        socket.on('chat-message', (message) => {
            const user = getCurrentUser(socket.id);
            io.to(user.room).emit('message', formatMessage(user.username, message));
        });

        socket.on('disconnect', () => {
            const user = userLeave(socket.id);
            if (user) {
                io.to(user.room).emit(
                    'message',
                    formatMessage('', `${user.username} has left the room`)
                );
            }
        });
    }
}