const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

//ovu env varijablu mi podesavamo i bice definisana kada radimo build aplikacije kroz ci/cd pipeline
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production", //javascript fajlovi su optimizovani, minified verziju dobijamo
  output: {
    filename: "[name].[contenthash].js", //svi fajlovi koriste ovaj template kako bi imali odgovarajuci naziv (zbog caching issue se radi)
    publicPath: "/container/latest" //ovu opciju cemo imati kad god webpack zeli da se obrati fajlu koji je build-an od strane webpack-a. Npr. kada htmlplugin zeli da se obrati js fajlu koji je kreiran. Kada god zeli da se obrati tom js fajlu, koristice filename. Ali mozemo da konfigurisemo putanju do njega.
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        //gde da odemo da dobijemo source cod
        marketing: `marketing@${domain}/marketing/remoteEntry.js`
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);
