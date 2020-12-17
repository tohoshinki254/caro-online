const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room');
const passport = require('../configs/passport');

router.post('/join', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    roomController.joinRoom(req, res, next);
});

router.get('/public', async (req, res, next) => {
    roomController.getPublicRooms(req, res, next);
});

router.post('/', passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    roomController.createRoom(req, res, next);
})

module.exports = router;