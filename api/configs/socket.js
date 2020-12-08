const accountDAO = require('../models/account');

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
            if (user){
                user.isOnline = data.isOnline;
                await user.save();
                const onlineList = await getOnlineList();
                io.emit('update-online-list', onlineList)                
            }
        })
    }
}