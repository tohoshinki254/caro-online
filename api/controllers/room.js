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

            if (room.player !== null){
                res.status(403).json({
                    message: 'The room is full.'
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
    },
    createRoom: async (req, res, next) => {
        try {
            let isPublic = req.body.isPublic;
            const name = req.body.name;
            if (isPublic === undefined) isPublic = true; 
            if (name === undefined){
                res.status(401).json({
                    message: 'Name is not define.'
                });
                return;
            }
            const roomWithMaxId = await roomDAO.findOne().sort('-roomId');
            const newRoom = new roomDAO({
                roomId: roomWithMaxId.roomId + 1,
                creator: req.user._id,
                player: null,
                isEnd: false,
                creatorWinner: 0,
                playerWinner: 0,
                createTime: new Date(),
                isPublic: isPublic,
                name: name
            });
            await newRoom.save();
            res.status(200).json({
                message: 'OK',
                roomId: newRoom.roomId
            });
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    }
}