var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry : './src/recta.js',
  output: {
    filename: 'recta.js',
    path    : path.resolve(__dirname, 'dist'),
    library : {
      root    : 'Recta',
      amd     : 'recta',
      commonjs: 'recta',
    },
    libraryTarget    : 'umd',
    libraryExport    : 'default',
    sourceMapFilename: 'recta.map',
  },
  module: {
    rules: [
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        loader : 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug   : false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle  : {
        screw_ie8  : true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
  ],
}
