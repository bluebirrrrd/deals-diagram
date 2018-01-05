const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const baseDir = path.resolve(__dirname + '/..')
module.exports = {
  entry: path.resolve(baseDir + '/src/DealsDiagram.vue'),
  output: {
    path: path.resolve(baseDir + '/dist/'),
    filename: 'vue-diagram.js',
    libraryTarget: 'umd',

    // These options are useful if the user wants to load the module with AMD
    library: 'vue-diagram',
    umdNamedDefine: true
  },
  externals: {
    luxon: 'luxon'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: baseDir,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('styles.css')
  ]
};