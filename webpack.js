const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',

  optimization: {
    minimize: true,
  },

  entry: [
    path.join(__dirname, '../../vendor/cejobelo/hamtaro/src/main.js'),
    path.join(__dirname, '../../src/main.js')
  ],

  output: {
    path: path.join(__dirname, '../../public'),
    publicPath: '/',
    filename: 'main.min.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-strict-mode']
        }
      }
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    }, {
      test: /(php|twig)/,
      loader: 'ignore-loader',
    }]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.min.css'
    }),
  ],
};