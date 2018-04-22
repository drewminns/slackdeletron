const passport = require('passport');
const axios = require('axios');

const { ENDPOINT } = require('../config/constants');

module.exports = (app) => {
  app.get('/auth/slack', passport.authenticate('slack'));

  app.get(
    '/api/slack/callback',
    passport.authenticate('slack', {
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

  app.get('/api/profile', (req, res) => {
    if (!req.user) {
      res.send({
        loggedIn: false,
        profile: null,
      });
      return;
    } else {
      res.send({
        ok: true,
        loggedIn: true,
        profile: {
          ...req.user,
        },
      });
    }
  });
};
