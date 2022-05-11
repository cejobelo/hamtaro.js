const { merge } = require('webpack-merge');
const common = require('./webpack.js');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
});