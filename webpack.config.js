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
        /*'css/app': [
            path.resolve(__dirname, './build/sass/app.sass'),
        ]*/
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
                    path.resolve(__dirname, 'build/js/base/svg4everybody.min.js'),
                    path.resolve(__dirname, 'build/js/base/jquery.min.js'),
                    path.resolve(__dirname, 'build/js/base/popper.min.js'),
                    path.resolve(__dirname, 'build/js/base/bootstrap.min.js'),
                    path.resolve(__dirname, 'build/js/plugins/slick.js'),
                    path.resolve(__dirname, 'build/js/plugins/fancybox.min.js'),
                    path.resolve(__dirname, 'build/js/plugins/mask.js'),
                    path.resolve(__dirname, 'build/js/plugins/select2.full.min.js'),
                    path.resolve(__dirname, 'build/js/plugins/icheck.min.js'),
                    path.resolve(__dirname, 'build/js/plugins/jquery.mCustomScrollbar.concat.min.js'),
                    path.resolve(__dirname, 'build/js/plugins/jquery.mousewheel.min.js'),
                    path.resolve(__dirname, 'build/js/plugins/aoc.js'),
                    path.resolve(__dirname, 'build/js/plugins/nouislider.min.js'),
                    path.resolve(__dirname, 'build/js/plugins/winib.js'),
                    path.resolve(__dirname, 'build/js/plugins/moment.min.js'),
                    path.resolve(__dirname, 'build/js/plugins/daterangepicker.min.js'),
                    path.resolve(__dirname, 'assets/vendors/sweetalert2/dist/sweetalert2.all.min.js'),
                    path.resolve(__dirname, 'assets/vendors/jquery-cookie/jquery.cookie.js'),
                    path.resolve(__dirname, 'assets/vendors/jquery.countdown/dist/jquery.countdown.min.js'),
                    path.resolve(__dirname, 'build/js/main.js'),
                ],
                "css/plugins.css": [
                    path.resolve(__dirname, 'build/css/ib.css'),
                    path.resolve(__dirname, 'build/css/winib.css'),
                ]
            }
        }),
        new CopyWebpackPlugin({
            patterns: [{
                    from: path.resolve(__dirname, 'build/js/script3.js'),
                    to: path.resolve(__dirname, 'assets/js/script3.js'),
                    transform: function(content, path) {
                        return UglifyJS.minify(content.toString()).code;
                    }
                },
                {
                    from: 'build/js/vue/**/*.vue',
                    // to: 'js/vue/',
                    to({ context, absoluteFilename }) {
                      return "js/vue/[name][ext]";
                    },

                    // flatten: false,
                    // transform(content, absoluteFrom) {
                    //     console.log(content)
                    // }
                    // transformPath(targetPath, absolutePath) {
                    //     return targetPath.replace(/build\/js\/vue/, '');
                    // },
                }
            ]
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
