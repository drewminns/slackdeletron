const passport = require('passport');
const axios = require('axios');

const { ENDPOINT } = require('../config/constants');

module.exports = (app) => {
  app.get(
    '/auth/slack',
    passport.authenticate('slack', {
      scope: [
        'identity.basic',
        'identity.email',
        'identity.team',
        'identity.avatar',
      ],
    })
  );

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
      if (!req.user.avatar) {
        axios
          .get(`${ENDPOINT}users.info`, {
            params: {
              token: req.user.accessToken,
              user: req.user.userId,
            },
          })
          .then((userInfo) => {
            // eslint-disable-next-line
            console.log(userInfo.data);
            res.send({
              ok: true,
              loggedIn: true,
              profile: {
                ...req.user,
                avatar: userInfo.data.user.profile.image_192,
              },
            });
            return;
          })
          .catch((err) => {
            // eslint-disable-next-line
            console.log(err);
            res.send({ ok: false });
            return;
          });
      } else {
        res.send({
          ok: true,
          loggedIn: true,
          profile: {
            ...req.user,
          },
        });
      }
    }
  });
};
