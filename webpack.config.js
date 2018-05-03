var webpack = require("webpack");

module.exports = {
	entry: {
		main: __dirname + 'src/app.js'
	},
	output: {
		path: __dirname + 'dist',
		filename: 'js.bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	stats: {
		errorDetails: true
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /(node_modules|browser_components)/,
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	}
};