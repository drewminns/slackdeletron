const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const PORT = 8081;
const ENTRY = {
  DEV: path.join(__dirname, '/config/index.pug'),
  PROD: path.join(__dirname, '/dist/index.pug'),
};

const app = express();

app.set('port', PORT);
app.set('view engine', 'pug');

if (process.env.NODE_ENV !== 'production') {
  // Load Webpack Config
  const config = require('./config/webpack.config.js');
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
    res.render(ENTRY.DEV, {
      scripts: DEVOUTPUT,
      isDev: true,
    });
  });
} else {
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('*', (req, res) => {
    res.render(ENTRY.PROD);
  });
}

app.listen(app.get('port'));
