/**
 * Created by evio on 2017/5/12.
 */
const { alias } =  require('./util');
const webpack = require('webpack');
const renderer = require('../src/miox-koa-vue2x-server-render/src/index');
const configs = require('./webpack.ssr.config');
const server = module.exports = new renderer(configs);
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const loaders = require('./webpack.loaders');

server.use({
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: loaders
    },
    resolve: { alias },
    plugins: isProd
        ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            }),
            new ExtractTextPlugin({
                filename: 'common.[chunkhash].css'
            })
        ]
        : [
            new FriendlyErrorsPlugin()
        ]
});