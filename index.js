const express = require('express');
const app = express();
const chalk = require('chalk');

app.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

require('./server/index')(app);

const PORT = process.env.PORT || 8081;
console.log(chalk.bold('Sweet!'));
console.log(chalk.blue('Running at:'));
console.log(chalk.red.underline(`http://localhost:${PORT}`));
app.listen(PORT);
