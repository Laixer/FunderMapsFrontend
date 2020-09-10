
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
        prependData: `
          $PRIMARY_COLOR: ${process.env.PRIMARY_COLOR};
          $BREAKPOINT: ${process.env.BREAKPOINT};
        `
      }
    }
  }
}