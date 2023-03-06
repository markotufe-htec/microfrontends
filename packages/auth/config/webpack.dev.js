//merguje webpack common i webpack dev
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //uzima html fajl i dodaje script tagove u njega
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json"); //uzimamo package.json

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8082/"
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: "/index.html"
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth", //kreirace globalnu varijablu sa imenom marketing kada se nas projekat ucita u container-u
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap"
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
