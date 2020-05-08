const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

const CleanWebpackPluginConfig = new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: 'dist/**',
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

const config = {
  entry: APP_DIR + '/index.jsx',
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        include: path.join(APP_DIR, 'data'),
        loader: 'json-loader',
        type: 'javascript/auto',
        exclude: /node_modules/,
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version),
    }),
    CleanWebpackPluginConfig,
    HtmlWebpackPluginConfig,
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = config;
