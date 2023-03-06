const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js"
  },
  resolve: {
    extensions: [".js", ".vue"] //da webpack zna da mora da ucita vue fajlove
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use: [{ loader: "file-loader" }] //da webpack zna da zelimo da importujemo font ili slike
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.scss|\.css$/,
        use: ["vue-style-loader", "style-loader", "css-loader", "sass-loader"]
      },
      {
        //cilj loadera je da kaze webpacku da process fajlove koje importujemo u projekat. Jedan od njih je babel koji ce prevesti noviju sintaksu u regularnu es5 sintaksu koja ce moci da se pokrene u svim pretrazivacima
        test: /\.m?js$/, //kad god se importuje fajl koji se zavrsava sa mjs ili js zelimo da bude processed by babel
        exclude: /node_modules/, //ignorisi node_module direktorijum
        use: {
          loader: "babel-loader",
          options: {
            //preset-react znaci da uzima sve jsx tagove
            //preset-env znaci da transformise es2017 itd. u es5
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"] //omogucuje async/await itd. unutar pretrazivaca
          }
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
