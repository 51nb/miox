'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URI = function () {
    function URI() {
        (0, _classCallCheck3.default)(this, URI);

        this.domains = {};
        this.setters = {};
        this.watcher = {};
    }

    (0, _createClass3.default)(URI, [{
        key: 'compile',
        value: function compile(uri) {
            return _pathToRegexp2.default.compile(uri);
        }
    }, {
        key: 'format',
        value: function format(name) {
            var selector = name.split(':');

            return {
                domain: selector[0],
                name: selector[1]
            };
        }
    }, {
        key: 'watch',
        value: function watch(name, fn) {
            if (typeof fn !== 'function') {
                throw new Error('watcher must be a function.');
            }
            this.watcher[name] = fn;
        }
    }, {
        key: 'domain',
        value: function domain(name, value) {
            var that = this;
            if (value) {
                this.domains[name] = value.replace(/\/$/, '');
                return {
                    watch: function watch(fn) {
                        that.watch(name, fn);
                    }
                };
            } else {
                return this.domains[name];
            }
        }
    }, {
        key: 'path',
        value: function path(mark, _path) {
            if (_path && typeof _path === 'string') {
                this.setters[mark] = this.compile(_path);
            } else {
                var _format = this.format(mark),
                    domain = _format.domain,
                    name = _format.name;

                if (this.domains[domain] === undefined || this.setters[name] === undefined) {
                    throw new Error('no such marked sign');
                }
                var val = this.setters[name](_path || {});
                if (this.watcher[domain]) {
                    val = this.watcher[domain](val);
                }
                var pathname = this.domains[domain].replace(/^\/\//, '/') + val;
                var str = new String(pathname);
                str.parse = function (args) {
                    var u = _querystring2.default.encode(args);
                    if (u) {
                        pathname += '?' + u;
                    }
                    return pathname;
                };

                return str;
            }
        }
    }]);
    return URI;
}();

exports.default = URI;
module.exports = exports['default'];