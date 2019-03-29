const path = require('path');
const merge = require('webpack-merge');
const config = require('../config/index.js');
const webpackConfigBase = require('./webpack.base.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfigProd = {
	mode: 'production', // 通过 mode 声明生产环境
	output: {
		filename: config.assetsSubDirectory + '/js/[name].[chunkhash:9].js',
		path: config.assetsRoot,
		publicPath: config.build.assetsPublicPath
	},
	// devtool: 'source-map',
	plugins: [
		//删除dist目录
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'), //根目录
        }),
		// 分离css插件参数为提取出去的路径
		// new extractTextPlugin('assets/css/[name][hash].css'), //此处也可以根据splitChunkPlugin的chunk名字做对应
		new MiniCssExtractPlugin({
            filename: config.assetsSubDirectory + '/css/[name].[contenthash:9].css',
            chunkFilename: "/css/[id].[contenthash:9].css"
		}),
	],
	optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
}
module.exports = merge(webpackConfigBase, webpackConfigProd);