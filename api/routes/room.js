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
});


router.post('/detail', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    roomController.getDetailRoom(req, res, next);
});

router.post('/saving-result', async (req, res, next) => {
    roomController.updateParamsAfterEnd(req, res, next);
});

router.post('/rooms-by-user', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    roomController.getRoomByUserId(req, res, next);
});

router.get('/rooms-ended', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    roomController.getRoomsEnded(req, res, next);
});

router.post('/end', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    roomController.setEndRoom(req, res, next);
});

router.get('/room-no-player', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    roomController.getRoomsNoPlayer(req, res, next);
});

module.exports = router;