const express = require('express');
const app = express();

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
