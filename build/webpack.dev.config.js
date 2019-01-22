const path = require('path');
const webpack  = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfigBase = require("./webpack.base.config");
const config = require('../config')

const webpackConfigDev = {
    mode:'development',
    output: {
        filename: config.assetsSubDirectory + '/js/[name].js',
		path: config.assetsRoot,
		publicPath: config.build.assetsPublicPath
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: config.assetsSubDirectory + '/css/[name].css',
            chunkFilename: "css/[id].css"
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
    devServer:{
        contentBase:path.resolve(__dirname,'../src'),
        host:'localhost',
        clientLogLevel: 'none',
        noInfo: true,
        overlay: true
    },
    devtool:'cheap-module-eval-source-map'
}

module.exports = merge(webpackConfigBase,webpackConfigDev);