'use strict'
const path = require('path')
const glob = require('glob')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const resolve = (dir) => path.join(__dirname, '..', dir)

const getArrayToSomething = (dir, matchBase, func) => {
  const pattern = `${dir}/**/*.${matchBase}`
  const patternArray = glob.sync(pattern)
  if (func) {
    return func(patternArray)
  } else {
    return patternArray
  }
}

const getEntry = (dir) => {
  return getArrayToSomething(dir, 'js', (patternArray) => {
    const entry = {}
    patternArray.forEach((value, index) => {
      const itemValue = value.split('/')
      const key = itemValue[itemValue.length - 2]
      entry[key] = `./${value}`
    })
    return entry
  })
}

const getJadeToHTML = (dir) => {
  return getArrayToSomething(dir, 'jade', (patternArray) => {
    const HTMLWebpackPluginArray = []
    patternArray.forEach((value, index) => {
      const itemValue = value.split('/')
      const key = itemValue[1]
      HTMLWebpackPluginArray.push(new HTMLWebpackPlugin({
        filename: `${key}.html`,
        template: resolve(value),
        chunks: [key, 'vendor']
      }))
    })
    return HTMLWebpackPluginArray
  })
}

module.exports = {
  resolve,
  getArrayToSomething,
  getEntry,
  getJadeToHTML
}
