var webpack = require('webpack')

module.exports = {
  entry: ['./javascript/main.js','./javascript/event.js','./javascript/gameData.js'],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  }
}