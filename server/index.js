const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const keys = require('../config/keys');

const ENTRY = path.join(__dirname, '../dist/index.html');

module.exports = (app) => {
  app.use(
    expressSession({
      secret: keys.cookieKey,
      resave: false,
      saveUninitialized: true,
    })
  );
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  require('../routes/authRoutes')(app);

  if (process.env.NODE_ENV !== 'production') {
    // Load Webpack Config
    const config = require('../config/webpack.config.js');
    const compiler = webpack(config);

    app.use(
      webpackDevMiddleware(compiler, {
        hot: true,
        filename: 'main.js',
        publicPath: config.output.publicPath,
        stats: {
          colors: true,
        },
        historyApiFallback: true,
      })
    );

    app.use(
      webpackHotMiddleware(compiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
      })
    );

    app.get('*', (req, res, next) => {
      res.sendFile(ENTRY);
    });
  } else {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.get('*', (req, res) => {
      res.sendFile(ENTRY);
    });
  }
};
