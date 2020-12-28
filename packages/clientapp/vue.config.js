/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { argv } = require("yargs");
const pjson = require('./package.json')

const vendor = argv.vendor ? argv.vendor : "fundermaps";
const vendorPath = path.relative('.', `../__vendor/src/${vendor}`);

console.log("\x1b[32m \x1b[1m \x1b[5m", `\nAPP: \t${pjson.name}\nVENDOR: ${vendor}\nENV: \t${process.env.NODE_ENV}\n`, "\x1b[0m")

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.delete("@")

    config.resolve
      .plugin("tsconfig-paths")
      .use(require("tsconfig-paths-webpack-plugin"))

    config.resolve.modules
      .add(path.resolve(__dirname, vendorPath))

    config.plugin('define')
      .tap((args) => {
        // TODO: Rename to project_vendor
        args[0].VENDOR = JSON.stringify(vendor)
        return args
      })

    config.plugin('copy')
      .tap((args) => {
        args[1] = [{
          from: path.resolve(vendorPath, 'favicon.ico'),
          to: "."
        }]
        return args
      })

    config.module
      .rule("icon loader")
      .test(/\.svg$/)
      .include
        .add(path.resolve(__dirname, "src/assets/icons"))
        .end()
      .use("html-loader")
        .loader("html-loader")
        .end()

    config.module
      .rule("favicon loader")
      .test(/\.ico(\?v=\d+\.\d+\.\d+)?$/)
      .use("url-loader")
        .loader("url-loader")
        .end()
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: [ path.resolve(__dirname, vendorPath) ]
        },
        additionalData: `
          @import "~@vendor/${vendor}/style.scss";
          @import "~@/style.scss";
        `
      }
    }
  }
};

