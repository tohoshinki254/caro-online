const passport = require('passport');
const passportJWT = require('passport-jwt');
const accountDAO = require('../models/account');
const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY;

const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
    const account = await accountDAO.findById(jwt_payload._id);
    if (account) {
        next(null, account);
    } else {
        next(null, false);
    }
});

passport.use(strategy);

passport.serializeUser((account, done) => {
    done(null, account);
});

passport.deserializeUser((account, done) => {
    done(null, account);
});

module.exports = passport;