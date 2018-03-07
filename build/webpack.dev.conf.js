'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const untils = require('./untils')

const { resolve } = untils

const { dev } = config

module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: dev.assetsPublicPath
  },
  devServer: {
    contentBase: dev.contentBase,
    host: dev.host,
    port: dev.port,
    compress: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([{
      from: resolve('static'),
      to: resolve('dist/static')
    }])
  ]
})
