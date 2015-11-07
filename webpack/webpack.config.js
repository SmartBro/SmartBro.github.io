var path = require('path');
var webpack = require('webpack');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
	context: path.join(__dirname, 'src'), // исходная директория
	entry: './index', // файл для сборки, если несколько - указываем hash (entry name => filename)
	output: {
		path: path.join(__dirname, 'assets') // выходная директория
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
			},
		],
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
			'NODE_ENV': JSON.stringify('production')
		}),
		new BowerWebpackPlugin({
			modulesDirectories: ['bower_components'],
			manifestFiles: ['bower.json', '.bower.json'],
			includes: /.*/,
			excludes: /.*\.less$/
		}),
		new ExtractTextPlugin('style.css'),
	]
};

module.exports = config;