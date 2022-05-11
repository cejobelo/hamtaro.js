const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  optimization: {
    minimize: true,
  },

  entry: [
    'babel-polyfill',
    path.join(__dirname, '../../../vendor/cejobelo/hamtaro/src/Javascript/main.js'),
  ],

  output: {
    path: path.join(__dirname, '../../../public'),
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
          presets: ['@babel/preset-env']
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