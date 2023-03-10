//merguje webpack common i webpack dev
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json"); //uzimamo package.json

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/"
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "/index.html"
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        auth: "auth@http://localhost:8082/remoteEntry.js",
        dashboard: "dashboard@http://localhost:8083/remoteEntry.js"
      },
      // shared: ["react", "react-dom"] //ucitavamo samo jednu kopiju react-a
      shared: packageJson.dependencies //dajemo webpacku da automatski kontrolise koje dependencie sharujemo
    })
  ]
};

//devConfig ce da prelepi sve slicne konfiguracije iz webpack common, ima veci prioritet, njegove konfiguracije se uzimaju jer smo ga stavili drugog
module.exports = merge(commonConfig, devConfig);
