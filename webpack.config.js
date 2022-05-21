/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/i,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      alias: {},
    },
    output: {
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      filename: "bundle.js",
    },
    plugins: [
      new HtmlWebPackPlugin({
        hash: true,
        template: path.resolve(__dirname, "public", "index.html"),
      }),
    ],
  };
};
