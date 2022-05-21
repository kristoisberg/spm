/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

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
  };
};
