const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const passport = require('../configs/passport');

router.post('/register', async (req, res, next) => {
    accountController.register(req, res, next);
});

router.post('/login', async (req, res, next) => {
    accountController.loginUser(req, res, next);
});

router.put('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    accountController.update(req, res, next);
});

router.get('/', passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    accountController.getUserInfo(req, res, next);
});

router.get('/mail-verification', async (req, res, next) => {
    accountController.verifyEmail(req, res, next);
});

router.post('/mail-reset-password', async (req, res, next) => {
    accountController.sendMailForgotPass(req, res, next);
});

router.post('/reset-password', async (req, res, next) => {
    accountController.resetPassword(req, res, next);
})

module.exports = router;