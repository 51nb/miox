'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = WebpackClientRenderer;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _clientPlugin = require('vue-server-renderer/client-plugin');

var _clientPlugin2 = _interopRequireDefault(_clientPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isProd = process.env.NODE_ENV === 'production'; /**
                                                     * Created by evio on 2017/5/11.
                                                     */
function WebpackClientRenderer() {
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

        plugins: [new _webpack2.default.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.MIOX_ENV': '"client"'
        }),
        // extract vendor chunks for better caching
        new _webpack2.default.optimize.CommonsChunkPlugin({
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
        new _webpack2.default.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        // This plugins generates `vue-ssr-client-manifest.json` in the
        // output directory.
        new _clientPlugin2.default()]
    };

    if (options.app) {
        configs.entry.app = options.app;
    }

    return (0, _webpackMerge2.default)(base, configs);
}
module.exports = exports['default'];