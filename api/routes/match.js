const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match');
const passport = require('../configs/passport');

router.post('/matches-of-room', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    matchController.getMatchesByRoomId(req, res, next);
});

module.exports = router;