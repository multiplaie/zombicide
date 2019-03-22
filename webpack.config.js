const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: './src/index.js',
	output: {
		filename: './main.js',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
		})
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}

		]
	}
};