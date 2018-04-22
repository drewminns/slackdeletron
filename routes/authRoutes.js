const passport = require('passport');
const axios = require('axios');

const { ENDPOINT } = require('../config/constants');

module.exports = (app) => {
  app.get(
    '/api/slack/callback',
    passport.authenticate('Slack', {
      successRedirect: '/',
      failureRedirect: '/',
    }),
    function(req, res) {
      res.redirect('/');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/profile', async (req, res) => {
    if (!req.user) {
      res.send({
        loggedIn: false,
        profile: null,
      });
      return;
    }

    const userInfo = await axios.get(`${ENDPOINT}users.info`, {
      params: {
        token: req.user.accessToken,
        user: req.user.userId,
      },
    });

    res.send({
      loggedIn: true,
      profile: { ...req.user, isAdmin: userInfo.data.user.is_admin },
    });
  });
};
