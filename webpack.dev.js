const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // live reloading already works with dev server
    contentBase: './dist',
    hot: true, // Hot module replacement,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
