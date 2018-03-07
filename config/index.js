const path = require('path')

module.exports = {
  dev: {
    contentBase: path.join(__dirname, '../dist'),
    host: '0.0.0.0',
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/'
  },
  build: {
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
