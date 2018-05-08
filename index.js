const express = require('express');
const app = express();

app.enable('trust proxy');

app.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use(function(req, res, next) {
    if (req.secure) {
      next();
    } else {
      res.redirect(`https://${req.headers.host + req.url}`);
    }
  });
}

require('./server/index')(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT);
