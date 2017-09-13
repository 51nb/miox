'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLoaders = require('./webpack.loaders');
var sourceCompile = require('./webpack.source.compile');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
var VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
var webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var path = require('path');

var WebPack = function () {
    function WebPack() {
        (0, _classCallCheck3.default)(this, WebPack);

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

    (0, _createClass3.default)(WebPack, [{
        key: 'merge',
        value: function merge(object) {
            this.merger = object;
        }
    }, {
        key: 'set',
        value: function set(object) {
            this.setter = Object.assign(this.setter, object);
        }
    }, {
        key: 'resolve',
        value: function resolve() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return path.resolve.apply(path, [this.cwd].concat(args));
        }
    }, {
        key: 'resource',
        value: function resource() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return new (Function.prototype.bind.apply(ExtractTextPlugin, [null].concat(args)))();
        }
    }, {
        key: 'chunk',
        value: function chunk() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            return new (Function.prototype.bind.apply(webpack.optimize.CommonsChunkPlugin, [null].concat(args)))();
        }
    }, {
        key: 'vueClient',
        value: function vueClient() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            return new (Function.prototype.bind.apply(VueSSRClientPlugin, [null].concat(args)))();
        }
    }, {
        key: 'vueServer',
        value: function vueServer() {
            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
            }

            return new (Function.prototype.bind.apply(VueSSRServerPlugin, [null].concat(args)))();
        }
    }, {
        key: 'jsCompress',
        value: function jsCompress() {
            for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                args[_key6] = arguments[_key6];
            }

            return new (Function.prototype.bind.apply(webpack.optimize.UglifyJsPlugin, [null].concat(args)))();
        }
    }, {
        key: 'html',
        value: function html() {
            var htmlFile = this.resolve.apply(this, arguments);
            return new HtmlWebpackPlugin({
                template: htmlFile,
                filename: htmlFile.split('/').slice(-1)[0],
                inject: true
            });
        }
    }, {
        key: 'init',
        value: function init() {
            this.result.devtool = "#inline-source-map";
            this.result.module = {
                noParse: /es6-promise\.js$/,
                rules: createLoaders(sourceCompile(this.cwd, this.setter["source-compile"]))
            };
            this.result.plugins = [new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                'process.env.MIOX_ENV': '"' + (this.setter.env || 'web') + '"'
            }), new FriendlyErrorsPlugin()];
            if (this.merger) {
                this.result = webpackMerge(this.result, this.merger);
            }
        }
    }]);
    return WebPack;
}();

module.exports = function (callback) {
    var config = new WebPack();
    callback(config);
    config.init();
    return config.result;
};