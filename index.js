const express = require('express');
const app = express();
const chalk = require('chalk');

const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

app.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

require('./server/index')(app);

const PORT = process.env.PORT || 8081;
console.log(chalk.bold('Sweet!'));
console.log(chalk.blue('Running at:'));
console.log(chalk.red.underline(`http://localhost:${PORT}`));
app.listen(PORT);
