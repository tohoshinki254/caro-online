const passport = require('passport');
const passportJWT = require('passport-jwt');
const accountDAO = require('../models/account');
const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

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

passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: '/auth/google/callback'
        },
        async (request, accessToken, refreshToken, profile, done) => {
            const email = profile.email;
            const name = profile.displayName;
            const account = await accountDAO.findOne({email: email});
            if (account)
                return done(null, account);
            else {
                const newAcc = new accountDAO({
                    username: email,
                    password: null,
                    name: name,
                    email: email,
                    isAdmin: false,
                    isOnline: false,
                    isLocked: false,
                    cups: 0,
                    draws: 0,
                    loses: 0,
                    wins: 0,
                    isConfirmed: true,
                    inRoom: false
                });
                await newAcc.save();
                return done(null, newAcc);
            }
        }
    )
)

passport.use(
        new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: '/auth/facebook/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            const username = profile.id;
            const name = profile.displayName;
            const account = await accountDAO.findOne({username: username});
            if (account) {
                return done(null, account);
            } else {
                const newAcc = new accountDAO({
                    username: username,
                    password: null,
                    name: name,
                    email: null,
                    isAdmin: false,
                    isOnline: false,
                    isLocked: false,
                    cups: 0,
                    draws: 0,
                    loses: 0,
                    wins: 0,
                    isConfirmed: true,
                    inRoom: false
                });
                await newAcc.save();
                return done(null, newAcc);
            }
        } 
    )
)

passport.serializeUser((account, done) => {
    done(null, account);
});

passport.deserializeUser((account, done) => {
    done(null, account);
});

module.exports = passport;