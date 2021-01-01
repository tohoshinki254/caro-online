const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const passport = require('../configs/passport');

router.post('/account', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    accountController.register(req, res, next);
});

router.post('/login', async (req, res, next) => {
    accountController.loginAdmin(req, res, next);
});

router.put('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    accountController.update(req, res, next);
});

router.get('/list-user', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    accountController.getListUser(req, res, next);
});

router.get('/user-info', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    accountController.getUserInfo(req, res, next);
});

router.put('/lock-user', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    accountController.lockUser(req, res, next);
})

module.exports = router;