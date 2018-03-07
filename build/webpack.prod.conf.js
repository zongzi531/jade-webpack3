'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const untils = require('./untils')

const { resolve } = untils

const { build } = config

if (build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  baseWebpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: build.assetsPublicPath
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: resolve('')
    }),
    new UglifyJsPlugin({
      sourceMap: build.productionSourceMap
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new CopyWebpackPlugin([{
      from: resolve('static'),
      to: resolve('dist/static')
    }])
  ]
})
