const passport = require('passport');
const SlackStrategy = require('@aoberoi/passport-slack').default.Strategy;

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
    (accessToken, scopes, team, extra, profiles, done) => {
      const object = {
        name: profiles.user.name,
        userId: profiles.user.id,
        teamId: profiles.team.id,
        accessToken: accessToken,
      };

      // eslint-disable-next-line
      console.log(object);

      done(null, object);
    }
  )
);
