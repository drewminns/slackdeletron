const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config.js');

const app = express();
const ENTRY = {
  dev: { FILE: path.join(__dirname, '/src/config/index.pug') },
  prod: { FILE: path.join(__dirname, 'dist/index.html'), DIR: path.join(__dirname, 'dist') }
};

const compiler = webpack(config);
const PORT = 8081;
const IS_DEV = process.env.NODE_ENV !== 'production';

app.set('port', PORT);
app.set('view engine', 'pug');

if (IS_DEV) {
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'main.js',
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));

  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));

  app.get('*', (req, res, next) => {
    res.render(ENTRY.dev.FILE, { assets: config.output.publicPath + config.output.filename });
  });

} else {
  app.use(express.static(ENTRY.prod.DIR));

  app.get('*', (req, res) => {
    res.sendFile(ENTRY.prod.FILE);
  });
}

app.listen(app.get('port'));