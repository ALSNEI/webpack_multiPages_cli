const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config/index.js')

var entries = {};
config.entries.forEach(function (obj) {
    entries[obj.entryName] = obj.entry;
});

entries.vendor = [
    'jquery'
];

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let webpackConfig = {
    entry: entries,
    resolve: {
        //配置别名，在项目中可缩减引用路径
        alias: {
            'src': resolve('src'),
            'assets': resolve('src/assets'),
            'lib': resolve('src/lib'),
            'pages': resolve('src/pages')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],
    module: {
        rules: [{
                test: /\.js$/, // 处理以.js结尾的文件
                exclude: /node_modules/, // 处理除了nodde_modules里的js文件
                include: /src/,
                loader: 'babel-loader' // 用babel-loader处理
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV !== 'development' ? {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: process.env.NODE_ENV === 'development' ?
                                config.dev.assetsPublicPath :
                                config.build.assetsPublicPath
                        }
                    } : 'style-loader',
                    'css-loader',
                    "postcss-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: config.assetsSubDirectory + '/images/[name].[hash:9].[ext]',
                        publicPath: process.env.NODE_ENV === 'development' ?
                            config.dev.assetsPublicPath :
                            config.build.assetsPublicPath
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(html)$/,
                use: [
                    // 可编写公共组件
                    {
                        loader: 'underscore-template-loader', //模板导入加载器,可以使用公共头部、底部等
                        query: {
                            attributes: ['img:src',  'img:data-src', 'audio:src'],
                            root:'../dist/images',
                            prependFilenameComment: __dirname,
                        }
                    },
                    // 不可编写公共组件
                    // {
                    //     loader: 'html-loader',
                    //     options: {
                    //         attrs: ['img:src', 'img:data-src', 'audio:src'],
                    //         minimize: true,
                    //         publicPath: process.env.NODE_ENV === 'development' ?
                    //             config.dev.assetsPublicPath :
                    //             config.build.assetsPublicPath,
                    //         outputPath: '../dist/images'
                    //     }
                    // }
                ]
            }
        ]
    }
};

var htmlMinify = {
    caseSensitive: true,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortAttributes: true,
    sortClassName: true,
    useShortDoctype: true
}

config.entries.forEach(function (entry) {
    var options = {
        filename: entry.filename,
        template: entry.template,
        chunks: ['vendor', entry.entryName],
    }

    if (process.env.NODE_ENV === 'production') {
        options.minify = htmlMinify
    }

    webpackConfig.plugins.push(new HtmlWebpackPlugin(options))
});


module.exports = webpackConfig;