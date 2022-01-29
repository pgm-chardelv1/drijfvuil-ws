// PROD Webpack configuration used to build the service worker

const webpackDevConfig = require("./webpack.dev.config");

module.exports = Object.assign({}, webpackDevConfig, {
  mode: "production",
});