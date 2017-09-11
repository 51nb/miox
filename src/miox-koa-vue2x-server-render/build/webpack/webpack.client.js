'use strict';

/**
 * Created by evio on 2017/5/11.
 */
var webpack = require('webpack');
var merge = require('webpack-merge');
var VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

var isProd = process.env.NODE_ENV === 'production';

module.exports = function WebpackClientRenderer() {
    var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var configs = {
        entry: {},

        // For bundle renderer source map support
        devtool: isProd ? false : '#cheap-module-source-map',

        // This tells the server bundle to use Node-style exports
        output: {
            path: options.build,
            publicPath: options.prefix,
            filename: '[name].[chunkhash].js'
        },

        performance: {
            maxEntrypointSize: 300000,
            hints: isProd ? 'warning' : false
        },

        plugins: [new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.MIOX_ENV': '"client"'
        }),
        // extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function minChunks(module) {
                // a module is extracted into the vendor chunk if...
                return (
                    // it's inside node_modules
                    /node_modules/.test(module.context) &&
                    // and not a CSS file (due to extract-text-webpack-plugin limitation)
                    !/\.css$/.test(module.request)
                );
            }
        }),
        // Important: this splits the webpack runtime into a leading chunk
        // so that async chunks can be injected right after it.
        // this also enables better caching for your app/vendor code.
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        // This plugins generates `vue-ssr-client-manifest.json` in the
        // output directory.
        new VueSSRClientPlugin()]
    };

    if (options.app) {
        configs.entry.app = options.app;
    }

    return merge(base, configs);
};