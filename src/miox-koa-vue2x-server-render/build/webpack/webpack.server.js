'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = WebpackServerRenderer;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _webpackNodeExternals = require('webpack-node-externals');

var _webpackNodeExternals2 = _interopRequireDefault(_webpackNodeExternals);

var _serverPlugin = require('vue-server-renderer/server-plugin');

var _serverPlugin2 = _interopRequireDefault(_serverPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by evio on 2017/5/11.
 */
var isProd = process.env.NODE_ENV === 'production';

function WebpackServerRenderer() {
    var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var configs = {
        // This allows webpack to handle dynamic imports in a Node-appropriate
        // fashion, and also tells `vue-loader` to emit server-oriented code when
        // compiling Vue components.
        target: 'node',

        // For bundle renderer source map support
        devtool: 'source-map',

        // This tells the server bundle to use Node-style exports
        output: {
            path: options.build,
            publicPath: options.prefix,
            filename: 'server-bundle.js',
            libraryTarget: 'commonjs2'
        },

        // https://webpack.js.org/configuration/externals/#function
        // https://github.com/liady/webpack-node-externals
        // Externalize app dependencies. This makes the server build much faster
        // and generates a smaller bundle file.
        externals: (0, _webpackNodeExternals2.default)({
            // do not externalize dependencies that need to be processed by webpack.
            // you can add more file types here e.g. raw *.vue files
            // you should also whitelist deps that modifies `global` (e.g. polyfills)
            whitelist: options.whitelist
        }),

        performance: {
            maxEntrypointSize: 300000,
            hints: isProd ? 'warning' : false
        },

        // This is the plugin that turns the entire output of the server build
        // into a single JSON file. The default file name will be
        // `vue-ssr-server-bundle.json`
        plugins: [new _webpack2.default.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.MIOX_ENV': '"server"'
        }), new _serverPlugin2.default()]
    };

    if (options.app) {
        configs.entry = options.app;
    }

    return (0, _webpackMerge2.default)(base, configs);
}
module.exports = exports['default'];