const passport = require('passport');

const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.get('/api/slack/login', passport.authenticate('slack'));

  app.get(
    '/api/slack/callback',
    passport.authenticate('slack', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/api/profile');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/profile', requireLogin, (req, res) => {
    res.send(req.user);
  });
};
