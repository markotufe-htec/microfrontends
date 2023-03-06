const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const prodConfig = {
  mode: "production", //javascript fajlovi su optimizovani, minified verziju dobijamo
  output: {
    filename: "[name].[contenthash].js", //svi fajlovi koriste ovaj template kako bi imali odgovarajuci naziv (zbog caching issue se radi)
    publicPath: "/auth/latest/" //gde se nalazi remoteEntry.js
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap"
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);
