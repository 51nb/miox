/**
 * Created by evio on 16/7/21.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mioxCompose = require('miox-compose');

var _mioxCompose2 = _interopRequireDefault(_mioxCompose);

var _layer = require('./layer');

var _layer2 = _interopRequireDefault(_layer);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _uri = require('./uri');

var _uri2 = _interopRequireDefault(_uri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = ['patch'];

var Router = function () {
    function Router() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, Router);

        this.opts = opts;
        this.methods = this.opts.methods || methods.map(function (m) {
            return m.toUpperCase();
        });
        this.params = {};
        this.stack = [];
    }

    (0, _createClass3.default)(Router, [{
        key: 'patch',
        value: function patch(name, path) {
            var middleware = void 0;

            if (typeof path === 'string' || path instanceof RegExp) {
                middleware = Array.prototype.slice.call(arguments, 2);
            } else {
                middleware = Array.prototype.slice.call(arguments, 1);
                path = name;
                name = null;
            }

            this.register(path, methods, middleware, { name: name });

            return this;
        }
    }, {
        key: 'use',
        value: function use() {
            var router = this;
            var middleware = Array.prototype.slice.call(arguments);
            var path = '(.*)';

            // support array of paths
            if (Array.isArray(middleware[0]) && typeof middleware[0][0] === 'string') {
                middleware[0].forEach(function (p) {
                    router.use.apply(router, [p].concat(middleware.slice(1)));
                });

                return this;
            }

            if (typeof middleware[0] === 'string') {
                path = middleware.shift();
            }

            // filter out nested routers from filter
            middleware = middleware.filter(function (fn) {
                if (fn.router) {
                    fn.router.stack.forEach(function (layer) {
                        if (path) layer.setPrefix(path);
                        if (router.opts.prefix) layer.setPrefix(router.opts.prefix);
                        router.stack.push(layer);
                    });

                    if (router.params) {
                        Object.keys(router.params).forEach(function (key) {
                            fn.router.param(key, router.params[key]);
                        });
                    }

                    return false;
                }

                return true;
            });

            if (middleware.length) {
                router.register(path || '(.*)', [], middleware, {
                    end: false,
                    ignoreCaptures: !path
                });
            }
            return this;
        }
    }, {
        key: 'prefix',
        value: function prefix(_prefix) {
            _prefix = _prefix.replace(/\/$/, '');

            this.opts.prefix = _prefix;

            this.stack.forEach(function (route) {
                route.setPrefix(_prefix);
            });

            return this;
        }
    }, {
        key: 'routes',
        value: function routes() {
            var router = this;
            var dispatch = function dispatch(ctx, next) {
                var path = router.opts.routerPath || ctx.routerPath || ctx.req.pathname;
                var matched = router.match(path, ctx.method);
                var layerChain = void 0;

                if (ctx.matched) {
                    ctx.matched.push.apply(ctx.matched, matched.path);
                } else {
                    ctx.matched = matched.path;
                }

                if (!matched.route) return next();

                layerChain = matched.pathAndMethod.reduce(function (memo, layer) {
                    memo.push(function (ctx, next) {
                        ctx.captures = layer.captures(path, ctx.captures);
                        ctx.params = layer.params(path, ctx.captures, ctx.params);
                        return next();
                    });
                    return memo.concat(layer.stack);
                }, []);

                return (0, _mioxCompose2.default)(layerChain)(ctx, next);
            };

            dispatch.router = this;

            return dispatch;
        }
    }, {
        key: 'register',
        value: function register(path, methods, middleware, opts) {
            opts = opts || {};

            var router = this;
            var stack = this.stack;

            // support array of paths
            if (Array.isArray(path)) {
                path.forEach(function (p) {
                    router.register.call(router, p, methods, middleware, opts);
                });

                return this;
            }

            // create route
            var route = new _layer2.default(path, methods, middleware, {
                end: opts.end === false ? opts.end : true,
                name: opts.name,
                sensitive: opts.sensitive || this.opts.sensitive || false,
                strict: opts.strict || this.opts.strict || false,
                prefix: opts.prefix || this.opts.prefix || ""
            });

            if (this.opts.prefix) {
                route.setPrefix(this.opts.prefix);
            }

            // add parameter middleware
            Object.keys(this.params).forEach(function (param) {
                route.param(param, this.params[param]);
            }, this);

            stack.push(route);

            return route;
        }
    }, {
        key: 'route',
        value: function route(name) {
            var routes = this.stack;

            for (var len = routes.length, i = 0; i < len; i++) {
                if (routes[i].name && routes[i].name === name) {
                    return routes[i];
                }
            }

            return false;
        }
    }, {
        key: 'url',
        value: function url(name, params) {
            var route = this.route(name);

            if (route) {
                var args = Array.prototype.slice.call(arguments, 1);
                return route.url.apply(route, args);
            }

            return new Error("No route found for name: " + name);
        }
    }, {
        key: 'match',
        value: function match(path, method) {
            var layers = this.stack;
            var layer;
            var matched = {
                path: [],
                pathAndMethod: [],
                route: false
            };

            for (var len = layers.length, i = 0; i < len; i++) {
                layer = layers[i];

                if (layer.match(path)) {
                    matched.path.push(layer);
                    if (layer.methods.length === 0 || !~layer.methods.indexOf(method)) {
                        matched.pathAndMethod.push(layer);
                        if (layer.methods.length) matched.route = true;
                    }
                }
            }

            return matched;
        }
    }, {
        key: 'param',
        value: function param(_param, middleware) {
            this.params[_param] = middleware;
            this.stack.forEach(function (route) {
                route.param(_param, middleware);
            });
            return this;
        }
    }], [{
        key: 'url',
        value: function url(path, params) {
            return _layer2.default.prototype.url.call({ path: path }, params);
        }
    }, {
        key: 'compile',
        value: function compile(uri) {
            return _pathToRegexp2.default.compile(uri);
        }
    }, {
        key: 'parse',
        value: function parse(uri) {
            return _pathToRegexp2.default.parse(uri);
        }
    }, {
        key: 'uri',
        value: function uri() {
            return new _uri2.default();
        }
    }]);
    return Router;
}();

exports.default = Router;
module.exports = exports['default'];