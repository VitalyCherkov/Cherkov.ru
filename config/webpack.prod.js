const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const webpackPlugins = require('./webpack.plugins');

const isProd = true;

module.exports = webpackMerge(commonConfig(isProd), {
  plugins: webpackPlugins({ isProd }),
  mode: 'production',
  devtool: false,
});
