const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const injectConfig = new HtmlWebpackPlugin({
  template: "./index.html",
  filename: "index.html",
  inject: "body"
});

module.exports = {
  context: __dirname + "/src",
  entry: {
    "bundle.min": "./index"
  },
  output: {
    path: __dirname + "/dst",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
        exclude: /node_modules/
      }
    ], 
  },
  plugins: [
    injectConfig,    
    new webpack.optimize.CommonsChunkPlugin("common"),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()  
  ]     
};