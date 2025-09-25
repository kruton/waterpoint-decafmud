const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    static: {
      directory: "./dist"
    },
    open: true,
    port: 3000,
    hot: true,
    host: "localhost",
    compress: true
  }
});

