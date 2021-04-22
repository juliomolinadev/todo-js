const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	mode: "production",

	output: {
		filename: "main.[contenthash].js"
	},

	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			},

			{
				test: /\.css$/,
				exclude: /styles\.css$/,
				use: ["style-loader", "css-loader"]
			},

			{
				test: /styles\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},

			{
				test: /\.html$/i,
				loader: "html-loader",
				options: {
					// sources: false,
					// attributes: false,
					minimize: false
				}
			},

			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							esModule: false
						}
					}
				]
			}
		]
	},

	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		}),

		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
			ignoreOrder: false
		}),

		new CopyPlugin({
			patterns: [{ from: "src/assets", to: "assets/" }]
		}),

		new CleanWebpackPlugin()
	],

	optimization: {
		minimize: true,
		minimizer: [
			// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
			`...`,
			new CssMinimizerPlugin()
		]
	}
};
