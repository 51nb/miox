const createLoaders = require('./webpack.loaders');
const sourceCompile = require('./webpack.source.compile');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

class WebPack {
    constructor() {
        this.result = {};
        this.cwd = process.cwd();
        this.setter = {
            "env": "web",
            "source-compile": {
                dirs: /^src/i,
                modules: /^miox\-/i
            }
        };
        this.merger = null;
    }

    merge(object) { this.merger = object; }
    set(object) { this.setter = Object.assign(this.setter, object); }
    resolve(...args) { return path.resolve(this.cwd, ...args); }

    resource(...args) { return new ExtractTextPlugin(...args); }
    chunk(...args) { return new webpack.optimize.CommonsChunkPlugin(...args); }
    vueClient(...args) { return new VueSSRClientPlugin(...args); }
    vueServer(...args) { return new VueSSRServerPlugin(...args); }
    jsCompress(...args) { return new webpack.optimize.UglifyJsPlugin(...args); }

    html(...args) {
        const htmlFile = this.resolve(...args);
        return new HtmlWebpackPlugin({
            template: htmlFile,
            filename: htmlFile.split('/').slice(-1)[0],
            inject: true
        });
    }

    init() {
        this.result.devtool = "#inline-source-map";
        this.result.module = {
            noParse: /es6-promise\.js$/,
            rules: createLoaders(sourceCompile(this.cwd, this.setter["source-compile"]))
        };
        this.result.plugins = [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                'process.env.MIOX_ENV': `"${this.setter.env || 'web'}"`
            }),
            new FriendlyErrorsPlugin()
        ];
        if (this.merger) {
            this.result = webpackMerge(this.result, this.merger);
        }
    }

}

module.exports = function(callback) {
    const config = new WebPack();
    callback(config);
    config.init();
    return config.result;
};