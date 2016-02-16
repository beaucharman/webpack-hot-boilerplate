const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '..', 'app/index.js'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../public'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    moduleDirectories: [],
    root: path.join(__dirname, 'app'),
  },
  module: {
    loaders: [
      {
        include: path.join(__dirname, 'app'),
        loader: 'babel',
        test: /\.js?$/,
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
