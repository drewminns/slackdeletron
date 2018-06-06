const axios = require('axios');
const url = require('url');

const keys = require('../config/keys');

module.exports = (app) => {
  app.get('/auth/slack', (req, res) => {
    const urlPath = url.format({
      pathname: 'https://slack.com/oauth/authorize',
      query: {
        client_id: keys.slackClientID,
        scope:
          'users:read channels:read files:read files:write:user groups:read',
      },
    });
    res.redirect(urlPath);
  });

  app.get('/api/slack/callback', (req, res) => {
    axios
      .get('https://slack.com/api/oauth.access', {
        params: {
          code: req.query.code,
          client_id: keys.slackClientID,
          client_secret: keys.slackClientSecret,
        },
      })
      .then((response) => {
        if (response.data.ok) {
          req.session.slack = response.data;
          req.session.save((err) => {
            if (!err) {
              return res.redirect('/');
            }
          });
        } else {
          res.redirect('/');
        }
      });
  });

  app.get('/api/logout', (req, res) => {
    req.session.destroy(function(err) {
      res.redirect('/');
    });
  });

  app.get('/api/profile', (req, res) => {
    if (!req.session.slack) {
      return res.redirect('/');
    }
    const token = req.session.slack.access_token;
    const user = req.session.slack.user_id;
    axios
      .get('https://slack.com/api/users.info', {
        params: {
          token,
          user,
        },
      })
      .then((response) => {
        if (response.data.ok) {
          return res.send({ ...response.data, token, user_id: user });
        }

        res.send({ ok: false });
      })
      .catch((err) => {
        res.send(err);
      });
  });
};
