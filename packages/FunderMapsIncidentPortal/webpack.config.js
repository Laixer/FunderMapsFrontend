modules.export = () => {
  return {
    /** SvgIcon loader */
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [{ loader: 'html-loader' }]
        }
      ]
    }
  }
}