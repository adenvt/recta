var path = require('path');

module.exports = {
  entry: './src/recta.js',
  output: {
    filename: 'recta.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
		contentBase: ['./dist', './dev'],
	},
};
