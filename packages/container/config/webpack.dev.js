//merguje webpack common i webpack dev
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //uzima html fajl i dodaje script tagove u njega
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json"); //uzimamo package.json

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html"
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js"
      },
      // shared: ["react", "react-dom"] //ucitavamo samo jednu kopiju react-a
      shared: packageJson.dependencies //dajemo webpacku da automatski kontrolise koje dependencie sharujemo
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};

//devConfig ce da prelepi sve slicne konfiguracije iz webpack common, ima veci prioritet, njegove konfiguracije se uzimaju jer smo ga stavili drugog
module.exports = merge(commonConfig, devConfig);
