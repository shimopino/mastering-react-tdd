const path = require("path");

/** @type {import('webpack').Configuration} */
const config = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist/"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    // React × TypeScriptで使う可能性のある拡張子を全て記述
    extensions: [".ts", ".js", ".tsx", ".jsx"],
  },
};

module.exports = config;
