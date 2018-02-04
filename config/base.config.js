
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import merge from 'webpack-merge';

import util from './util';
import config from './config';

export default {
    context: path.resolve(__dirname, '../'),
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/',
        filename: 'static/scripts/[name].js?[hash]',
    },
    module: {
        rules: util.getRules.concat([
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                exclude: /(node_modules|font)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: `static/images/[name].[ext]`,
                        }
                    },
                    {   
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: { interlaced: false, },
                            optipng: { optimizationLevel: 7 },
                            pngquant: { quality: '65-90', speed: 4 },
                            mozjpeg: { progressive: true, quality: 80 },
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: /(node_modules|images)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/style/font/[name].[ext]?[hash]',
                        }
                    },
                ],
            }
        ])
    },
    plugins: [ 
        util.extractCSS,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: 'favicon.svg',
            inject: true,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'menifest'],
        }),
        new webpack.ProvidePlugin({
            $: 'jquery', // jquery 모듈을 불러온다.
            jQuery: 'jquery', // jquery 모듈을 불러온다.
            'window.jQuery': 'jquery' // angular.js 에서 jquery 를 사용시
        }),
    ],
    resolve: {
        alias: {
            comp: '../components',
            stc: './static'
        },
        extensions: ['.js', '.jsx', 'scss'],
    },
};