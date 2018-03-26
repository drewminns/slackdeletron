const passport = require('passport');

module.exports = (app) => {
  app.get('/api/slack/login', passport.authenticate('slack'));

  app.get(
    '/api/slack/callback',
    passport.authenticate('slack', { failureRedirect: '/' }),
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
    }

    res.send({
      loggedIn: true,
      profile: req.user,
    });
  });
};
