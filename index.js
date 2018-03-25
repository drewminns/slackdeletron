const express = require('express');

const app = express();

require('./server/index')(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT);
