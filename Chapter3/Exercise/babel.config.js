/** @type {import('@babel/core').TransformOptions} */
const config = {
  presets: ["@babel/env", "@babel/react", "@babel/preset-typescript"],
  plugins: ["@babel/transform-runtime"],
};

module.exports = config;
