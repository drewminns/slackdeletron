const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

const ISPROD = process.env.NODE_ENV === 'production';

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
        template: path.join(__dirname, './index.pug'),
        filetype: 'pug',
      }),
      new HtmlWebpackPugPlugin(),
      new ExtractTextPlugin('style.[hash:12].min.css'),
    ]
  : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ];

const ENTRY = ISPROD
  ? './src/index.js'
  : [
      './src/index.js',
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
        test: /\.(css|scss)?$/,
        use: cssLoader,
        exclude: '/node_modules/',
      },
    ],
  },
};
