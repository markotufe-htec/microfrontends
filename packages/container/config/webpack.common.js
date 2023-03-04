const HtmlWebpackPlugin = require("html-webpack-plugin"); //uzima html fajl i dodaje script tagove u njega

module.exports = {
  module: {
    rules: [
      //cilj loadera je da kaze webpacku da process fajlove koje importujemo u projekat. Jedan od njih je babel koji ce prevesti noviju sintaksu u regularnu es5 sintaksu koja ce moci da se pokrene u svim pretrazivacima
      {
        test: /\.m?js$/, //kad god se importuje fajl koji se zavrsava sa mjs ili js zelimo da bude processed by babel
        exclude: /node_modules/, //ignorisi node_module direktorijum
        use: {
          loader: "babel-loader",
          options: {
            //preset-react znaci da uzima sve jsx tagove
            //preset-env znaci da transformise es2017 itd. u es5
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"] //omogucuje async/await itd. unutar pretrazivaca
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
