'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layer = function () {
    /**
     * Initialize a new routing Layer with given `method`, `path`, and `middleware`.
     *
     * @param {String|RegExp} path Path string or regular expression.
     * @param {Array} methods Array of HTTP verbs.
     * @param {Array} middleware Layer callback/middleware or series of.
     * @param {Object=} opts
     * @param {String=} opts.name route name
     * @param {String=} opts.sensitive case sensitive (default: false)
     * @param {String=} opts.strict require the trailing slash (default: false)
     * @returns {Layer}
     * @private
     */

    function Layer(path, methods, middleware, opts) {
        (0, _classCallCheck3.default)(this, Layer);

        this.opts = opts || {};
        this.name = this.opts.name || null;
        this.methods = [];
        this.paramNames = [];
        this.stack = Array.isArray(middleware) ? middleware : [middleware];

        methods.forEach(function (method) {
            var l = this.methods.push(method.toUpperCase());
            if (this.methods[l - 1] === 'GET') {
                this.methods.unshift('HEAD');
            }
        }, this);

        this.stack.forEach(function (fn) {
            var type = typeof fn === 'undefined' ? 'undefined' : (0, _typeof3.default)(fn);
            if (type !== 'function') {
                throw new Error(methods.toString() + " `" + (this.opts.name || path) + "`: `middleware` " + "must be a function, not `" + type + "`");
            }
        }, this);

        this.path = path;
        this.regexp = (0, _pathToRegexp2.default)(path, this.paramNames, this.opts);
    }

    /**
     * Returns whether request `path` matches route.
     *
     * @param {String} path
     * @returns {Boolean}
     * @private
     */


    (0, _createClass3.default)(Layer, [{
        key: 'match',
        value: function match(path) {
            return this.regexp.test(path);
        }

        /**
         * Returns map of URL parameters for given `path` and `paramNames`.
         *
         * @param {String} path
         * @param {Array.<String>} captures
         * @param {Object=} existingParams
         * @returns {Object}
         * @private
         */

    }, {
        key: 'params',
        value: function params(path, captures, existingParams) {
            var params = existingParams || {};

            for (var len = captures.length, i = 0; i < len; i++) {
                if (this.paramNames[i]) {
                    var c = captures[i];
                    params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;
                }
            }

            return params;
        }

        /**
         * Returns array of regexp url path captures.
         *
         * @param {String} path
         * @returns {Array.<String>}
         * @private
         */

    }, {
        key: 'captures',
        value: function captures(path) {
            return path.match(this.regexp).slice(1);
        }

        /**
         * Generate URL for route using given `params`.
         *
         * @example
         *
         * ```javascript
         * var route = new Layer(['GET'], '/users/:id', fn);
         *
         * route.url({ id: 123 }); // => "/users/123"
         * ```
         *
         * @param {Object} params url parameters
         * @returns {String}
         * @private
         */

    }, {
        key: 'url',
        value: function url(params) {
            var args = params;
            var url = this.path;
            var toPath = _pathToRegexp2.default.compile(url);

            // argument is of form { key: val }
            if ((typeof params === 'undefined' ? 'undefined' : (0, _typeof3.default)(params)) != 'object') {
                args = Array.prototype.slice.call(arguments);
            }

            if (args instanceof Array) {
                var tokens = _pathToRegexp2.default.parse(url);
                var replace = {};
                for (var len = tokens.length, i = 0, j = 0; i < len; i++) {
                    if (tokens[i].name) replace[tokens[i].name] = args[j++];
                }
                return toPath(replace);
            } else {
                return toPath(params);
            }
        }

        /**
         * Run validations on route named parameters.
         *
         * @example
         *
         * ```javascript
         * router
         *   .param('user', function (id, ctx, next) {
        *     ctx.user = users[id];
        *     if (!user) return ctx.status = 404;
        *     next();
        *   })
         *   .get('/users/:user', function (ctx, next) {
        *     ctx.body = ctx.user;
        *   });
         * ```
         *
         * @param {String} param
         * @param {Function} middleware
         * @returns {Layer}
         * @private
         */

    }, {
        key: 'param',
        value: function param(_param, fn) {
            var stack = this.stack;
            var params = this.paramNames;
            var middleware = function middleware(ctx, next) {
                return fn.call(this, ctx.params[_param], ctx, next);
            };
            middleware.param = _param;

            params.forEach(function (p, i) {
                var prev = params[i - 1];

                if (_param === p.name) {
                    // insert param middleware in order params appear in path
                    if (prev) {
                        if (!stack.some(function (m, i) {
                            if (m.param === prev.name) {
                                return stack.splice(i, 0, middleware);
                            }
                        })) {
                            stack.some(function (m, i) {
                                if (!m.param) {
                                    return stack.splice(i, 0, middleware);
                                }
                            });
                        }
                    } else {
                        stack.unshift(middleware);
                    }
                }
            });

            return this;
        }
    }, {
        key: 'setPrefix',


        /**
         * Prefix route path.
         *
         * @param {String} prefix
         * @returns {Layer}
         * @private
         */

        value: function setPrefix(prefix) {
            if (this.path) {
                this.path = prefix + this.path;
                this.paramNames = [];
                this.regexp = (0, _pathToRegexp2.default)(this.path, this.paramNames, this.opts);
            }

            return this;
        }
    }]);
    return Layer;
}();

/**
 * Safe decodeURIComponent, won't throw any error.
 * If `decodeURIComponent` error happen, just return the original value.
 *
 * @param {String} text
 * @returns {String} URL decode original string.
 * @private
 */

/**
 * Created by evio on 16/7/21.
 */


exports.default = Layer;
function safeDecodeURIComponent(text) {
    try {
        return decodeURIComponent(text);
    } catch (e) {
        return text;
    }
}
module.exports = exports['default'];