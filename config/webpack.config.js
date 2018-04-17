const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const ISPROD = process.env.NODE_ENV === 'production';
const PUBLIC_PATH = ISPROD
  ? 'https://slackdeletron.com/'
  : 'http://localhost:8081';

const postcss = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [autoprefixer],
  },
};

const cssLoader = ISPROD
  ? ExtractTextPlugin.extract({
      use: ['css-loader?minimize=true', postcss, 'sass-loader'],
    })
  : ['style-loader', 'css-loader', postcss, 'sass-loader'];

const plugins = ISPROD
  ? [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new HTMLWebpackPlugin({
        template: path.join(__dirname, './templates/prod.html'),
      }),
      new ExtractTextPlugin('style.[hash:12].min.css'),
      new SWPrecacheWebpackPlugin({
        cacheId: 'slack-deletron',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }),
    ]
  : [
      new HTMLWebpackPlugin({
        template: path.join(__dirname, './templates/dev.html'),
        alwaysWriteToDisk: true,
      }),
      new HtmlWebpackHarddiskPlugin({
        outputPath: path.resolve(__dirname, '..', 'dist'),
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ];

const ENTRY = ISPROD
  ? './client/index.js'
  : [
      './client/index.js',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    ];

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ENTRY,
  devtool: ISPROD ? 'cheap-module-source-map' : 'eval',
  output: {
    filename: ISPROD ? 'main.[hash:12].min.js' : 'main.js',
    publicPath: ISPROD ? '/' : 'http://localhost:8081/assets/',
  },
  optimization: {
    minimize: ISPROD,
  },
  target: 'web',
  plugins,
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: ['babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.(svg|png|gif|jpg)$/,
        use: ['url-loader?limit=30000&name=images/[hash:12].[ext]'],
        exclude: '/node_modules/',
      },
      {
        test: /\.(css|scss)?$/,
        use: cssLoader,
        exclude: '/node_modules/',
      },
    ],
  },
};
