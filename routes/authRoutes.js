const passport = require('passport');

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

  app.get('/api/profile', function(req, res) {
    res.send(req.user);
  });
};
