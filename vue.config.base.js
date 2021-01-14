/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { argv } = require("yargs");

const vendor = argv.vendor ? argv.vendor : "fundermaps";
const vendorPath = path.relative(".", `../__vendor/src/${vendor}`);

console.log(
  "\x1b[32m \x1b[1m \x1b[5m",
  `\nAPP: \t${process.VUE_CLI_SERVICE.pkg.name}\nVENDOR: ${vendor}\nENV: \t${process.env.NODE_ENV}\n`,
  "\x1b[0m"
);

exports.config = {
  plugin: {
    // TODO: Rename to project vendor
    "vendor define": {
      plugin: require("webpack").DefinePlugin,
      args: [{ VENDOR: JSON.stringify(vendor) }]
    },
    "vendor copy": {
      plugin: require("copy-webpack-plugin"),
      args: [
        {
          patterns: [
            {
              from: path.resolve(vendorPath, "favicon.ico"),
              to: "."
            }
          ]
        }
      ]
    }
  },
  resolve: {
    plugin: {
      "tsconfig paths": {
        plugin: require("tsconfig-paths-webpack-plugin")
      }
    },
    modules: [path.resolve(__dirname, vendorPath)]
  }
};

exports.css = {
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, vendorPath)]
        },
        additionalData: `
          @import "~@vendor/${vendor}/style.scss";
          @import "~@/style.scss";
        `
      }
    }
  }
};
