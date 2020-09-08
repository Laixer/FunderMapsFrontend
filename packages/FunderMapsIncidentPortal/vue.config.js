
module.exports = {
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