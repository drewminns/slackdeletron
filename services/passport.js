const passport = require('passport');
const SlackStrategy = require('passport-slack-oauth2').Strategy;

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
      const object = {
        name: profile.user.name,
        userId: profile.user.id,
        teamId: profile.team.id,
        teamName: profile.team.name,
        avatar: profile.user.image_192,
        accessToken: accessToken,
      };

      done(null, object);
    }
  )
);
