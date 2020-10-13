const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { pages } = require('./webpack-config/file/html');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: [
        './src/script/script.js',
        './src/style/style.scss'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/script.min.js'
    },
    devServer: {
        contentBase: './dist'
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true
                }
            }
        })],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new CopyPlugin([
            { from: './src/assets/fonts', to: './assets/fonts' },
            { from: './src/assets/img', to: './assets/img' },
            { from: './src/temp', to: './temp' },
            { from: './src/pages/index.html', to: './' }
        ]),
        new MiniCssExtractPlugin({
            filename: './assets/css/index.css',
            allChunks: true
        }),
        ...pages
    ],
    module: {
        rules: [
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "[name].[ext]",
                        outputPath: (url, resourcePath, context) => {
                            const relativePath = path.relative(context, resourcePath);

                            if (/assets\//.test(resourcePath)) {
                                return `assets/img/${url}`;
                            }

                            const noSrcPath = relativePath.replace('src', '')
                            const cleanPath = noSrcPath.replace(noSrcPath.charAt(0), '')

                            console.log('path: ', cleanPath)

                            return `${cleanPath}`;
                        }
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: "assets/fonts/[name]/[name].[ext]"
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/'
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
}