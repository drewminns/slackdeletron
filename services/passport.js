const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;

const keys = require('../config/keys');

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(
  new SlackStrategy(
    {
      clientID: keys.slackClientID,
      clientSecret: keys.slackClientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);
