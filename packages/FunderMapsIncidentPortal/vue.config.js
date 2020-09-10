
module.exports = {
  configureWebpack: {
    plugins: [],
    module: {
      rules: [
        {
          /** SvgIcon loader */
          test: /\.svg$/,
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