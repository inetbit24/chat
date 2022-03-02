const path = require('path');
const webpack = require('webpack');
const UglifyJS = require("uglify-es");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');


module.exports = {
    cache: {
        type: 'filesystem',
        allowCollectingMemory: true,
    },
    entry: {
        'js/app.js': [
            path.resolve(__dirname, './build/js/app.js'),
        ],
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'assets/'),
        chunkFilename: '[id]',
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false
                        }
                    },
                    
                ],
            }
        ]
    },
    mode: 'production',
    // mode: 'development',
    watch: true,
    plugins: [
        new MergeIntoSingleFilePlugin({
            files: {
                "js/plugins.js": [
                    path.resolve(__dirname, 'build/js/plugins/winib.js'),
                ],
                "css/plugins.css": [
                    path.resolve(__dirname, 'build/css/ib.css'),
                    path.resolve(__dirname, 'build/css/winib.css'),
                ]
            }
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new FileManagerPlugin({
            events: {
                onEnd: {
                    delete: ['./assets/css/app']
                }
            }
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
}
