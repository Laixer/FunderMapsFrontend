/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const base = require("../../vue.config.base");

module.exports = {
  chainWebpack: config => {
    config.merge(base.config);

    // TODO: Extract to base
    config.resolve.alias.delete("@");

    // TODO: Extract to base
    config.module
      .rule("icon loader")
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, "src/assets/icons"))
      .end()
      .use("html-loader")
      .loader("html-loader")
      .end();

    // TODO: Extract to base
    config.module
      .rule("favicon loader")
      .test(/\.ico(\?v=\d+\.\d+\.\d+)?$/)
      .use("url-loader")
      .loader("url-loader")
      .end();
  },
  ...base.css
};
