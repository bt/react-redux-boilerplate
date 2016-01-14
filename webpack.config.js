var webpack = require('webpack');

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}

module.exports = {
  devtool: process.env.NODE_ENV !== 'production' ? 'eval-source-map' : '',
  entry: {
    bundle: getEntrySources([
      './src/app.js'
    ])
  },
  output: {
    publicPath: 'http://localhost:8080/',
    filename: 'dist/[name].js'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'source-map-loader'
    }],
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel', 'eslint-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader!cssnext-loader',
    }, {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      loader: 'url-loader?prefix=img/&limit=5000',
    }, {
      test: /\.(woff|woff2|ttf|eot)$/,
      loader: 'url-loader?prefix=font/&limit=5000',
    }, ]
  }
};