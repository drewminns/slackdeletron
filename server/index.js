const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const keys = require('../config/keys');
require('../services/passport');

const ENTRY = {
  DEV: path.join(__dirname, '../config/templates/dev.html'),
  PROD: path.join(__dirname, '../dist/index.html'),
};

module.exports = (app) => {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey],
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  require('../routes/authRoutes')(app);

  if (process.env.NODE_ENV !== 'production') {
    // Load Webpack Config
    const config = require('../config/webpack.config.js');
    const compiler = webpack(config);
    const DEVOUTPUT = config.output.publicPath + config.output.filename;

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
      res.sendFile(ENTRY.DEV);
    });
  } else {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.get('*', (req, res) => {
      res.sendFile(ENTRY.PROD);
    });
  }
};
