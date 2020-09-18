var path = require('path')

module.exports = {
  configureWebpack: {
    plugins: [],
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
          $PRIMARY_COLOR: ${process.env.PRIMARY_COLOR};
          $BREAKPOINT: ${process.env.BREAKPOINT};
        `
      }
    }
  }
}