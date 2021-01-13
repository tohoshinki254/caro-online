const matchDAO = require('../models/match');

module.exports = {
    getMatchesByRoomId: async (req, res, next) => {
        try {
            const { roomId } = req.body;
            const matches = await matchDAO.find({ roomId: roomId });
            if (matches === null) {
                res.status(400).json({
                    message: 'Room Id is not existed'
                });
            } else {
                res.status(200).json({
                    message: 'OK',
                    matches: matches
                });
            }
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    }
}