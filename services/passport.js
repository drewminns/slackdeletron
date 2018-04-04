const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;
const axios = require('axios');

const keys = require('../config/keys');
const { ENDPOINT } = require('../config/constants');

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
    async (accessToken, refreshToken, profile, done) => {
      const res = await axios.get(`${ENDPOINT}users.info`, {
        params: {
          token: accessToken,
          user: profile.user.id,
        },
      });

      const object = {
        name: profile.user.name,
        userId: profile.user.id,
        teamId: profile.team.id,
        avatar: profile.user.image_192,
        accessToken: accessToken,
        isAdmin: res.data.user.is_admin,
      };

      done(null, object);
    }
  )
);
