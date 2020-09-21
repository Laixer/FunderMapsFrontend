const path = require('path')
const {argv} = require('yargs')
const webpack = require('webpack')

module.exports = {
  outputDir: argv.vendor ?  `${argv.vendor}-dist` : 'dist',
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        VENDOR: JSON.stringify(argv.vendor ?  argv.vendor : 'default')
      })
    ],
    module: {
      rules: [
        {
          /** SvgIcon loader */
          test: /\.svg$/,
          include: [
            path.resolve(__dirname, "src/assets/icons")
        ],
          use: [{ loader: 'html-loader' }]
        }
      ]
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          $PRIMARY_COLOR: ${process.env.VUE_APP_PRIMARY_COLOR};
          $BREAKPOINT: ${process.env.BREAKPOINT};
        `
      }
    }
  }
}