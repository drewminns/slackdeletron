const express = require('express');
const Raven = require('raven-js');
const app = express();

if (process.env.NODE_ENV === 'production') {
  Raven.config(process.env.SENTRY).install();
  app.use(Raven.requestHandler());
  app.use(Raven.errorHandler());
}

app.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

require('./server/index')(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT);
