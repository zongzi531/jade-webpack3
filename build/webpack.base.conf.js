'use strict'
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const untils = require('./untils')

const { resolve, getEntry, getJadeToHTML } = untils

module.exports = {
  entry: getEntry('src'),
  output: {
    path: resolve('dist'),
    filename: 'static/js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve('src')
      },
      {
        test: /\.jade$/,
        loader: 'jade-loader',
        include: resolve('src')
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use:[
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: './static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: './static/fonts/[name].[hash:7].[ext]'
        }
      }
    ],
    loaders: [
      {
        test: require.resolve('../static/js/radialIndicator.js'),
        loader: 'exports-loader?window.radialIndicator!script-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: 2,
    }),
    ...getJadeToHTML('src'),
    new ExtractTextPlugin({
      filename: './static/css/[name].[hash:7].css'
    })
  ]
}
