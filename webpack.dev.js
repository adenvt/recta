var path = require('path')

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
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  devtool  : 'inline-source-map',
  devServer: {
    contentBase: ['./dist', './dev'],
  },
}
