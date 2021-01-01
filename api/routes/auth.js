var express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../configs/passport');
var router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/auth/failed', successRedirect: '/auth/success'}))


router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/auth/failed', successRedirect: '/auth/success'}));

router.get('/success', async function(req, res, next){
    const user = req.user;
    if (user){
        const payload = {_id: user._id, name: user.name, email: user.email, oauth: true};
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        res.redirect(process.env.CLIENT_DOMAIN + "oauth/" + token);
    }else{
        res.redirect(process.env.CLIENT_DOMAIN);
    }    
})

router.get('/failed', async function(req, res, next){
    res.redirect(process.env.CLIENT_DOMAIN);
})

module.exports = router;
