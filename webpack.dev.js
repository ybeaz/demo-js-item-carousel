const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: '/',
  },
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 3420,
    inline: true,
    stats: {
      colors: true,
      chunks: false,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      children: false,
      source: false,
      warnings: true,
      noInfo: true,
      contentBase: './dist',
      hot: true,
      modules: false,
      errors: true,
      reasons: true,
      errorDetails: true,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
    }),
  ],
});