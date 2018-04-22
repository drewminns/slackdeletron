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
      // eslint-disable-next-line
      console.log(profiles);
      const object = {
        name: profiles.user.name,
        userId: profiles.user.id,
        teamId: profiles.team.id,
        accessToken: accessToken,
        avatar: profiles.user.image_192,
      };

      done(null, object);
    }
  )
);
