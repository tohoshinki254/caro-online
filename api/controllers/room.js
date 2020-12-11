const roomDAO = require('../models/room');

module.exports = {
    getPublicRooms: async (req, res, next) => {
        try {
            const rooms = await roomDAO.find({ isPublic: true });
            res.status(200).json({
                message: 'Successful',
                rooms: rooms
            });
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    },

    joinRoom: async (req, res, next) => {
        try {
            const roomId = req.body.roomId;
            const playerId = req.user._id;

            const room = await roomDAO.findOne({ roomId: roomId });
            if (room === null) {
                res.status(401).json({
                    message: 'The room is not existed'
                });
                return;
            }
            room.player = playerId;
            console.log(room);
            
            await room.save();
            res.status(200).json({
                message: 'Successful'
            });
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    }
}