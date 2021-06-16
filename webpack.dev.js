const { merge } = require("webpack-merge");
const { WebpackPluginServe: Serve } = require("webpack-plugin-serve");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  entry: [
    "webpack-plugin-serve/client",
    "./src/index.js"
  ],
  plugins: [
    new Serve(options)
  ],
  watch: true
});

