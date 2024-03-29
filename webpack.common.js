const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  output: {
    publicPath: ""
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          toplevel: true,
          compress: {
            passes: 2,
          },
          format: {
            comments: false,
          }
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test:/\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              filename: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.ProvidePlugin({
      "$": "jquery"
    })
  ]
};

