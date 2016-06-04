var path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src')
        ]
      }
    ]
  },
  stats: {
    colors: true
  }
}
