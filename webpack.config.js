const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

const ISPROD = process.env.NODE_ENV === 'production';

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins: [require('autoprefixer')()],
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
      // new ExtractTextPlugin('styles.css'),
    ]
  : [
      // new ExtractTextPlugin('style.css'),
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
    publicPath: ISPROD ? '/' : 'http://localhost:8081/scripts/',
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
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize=true', 'sass-loader'],
        }),
        exclude: '/node_modules/',
      },
    ],
  },
};
