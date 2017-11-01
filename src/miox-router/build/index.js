'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mioxCompose = require('miox-compose');

var _mioxCompose2 = _interopRequireDefault(_mioxCompose);

var _layer = require('./layer');

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = function () {
  function Router() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Router);

    this.opts = opts;
    this.methods = this.opts.methods || ['PATCH'];
    this.params = {};
    this.stack = [];
  }

  /**
   * Register route with all methods.
   *
   * @param {String} name Optional.
   * @param {String} path
   * @param {Function=} middleware You may also pass multiple middleware.
   * @param {Function} callback
   * @returns {Router}
   * @private
   */


  (0, _createClass3.default)(Router, [{
    key: 'all',
    value: function all() {
      return this.patch.apply(this, arguments);
    }

    /**
     * Create `router.verb()` methods, where *verb* is one of the HTTP verbs such
     * as `router.get()` or `router.post()`.
     *
     * Match URL patterns to callback functions or controller actions using `router.verb()`,
     * where **verb** is one of the HTTP verbs such as `router.get()` or `router.post()`.
     *
     * Additionaly, `router.all()` can be used to match against all methods.
     *
     * ```javascript
     * router
     *   .get('/', function (ctx, next) {
     *     ctx.body = 'Hello World!';
     *   })
     *   .post('/users', function (ctx, next) {
     *     // ...
     *   })
     *   .put('/users/:id', function (ctx, next) {
     *     // ...
     *   })
     *   .del('/users/:id', function (ctx, next) {
     *     // ...
     *   })
     *   .all('/users/:id', function (ctx, next) {
     *     // ...
     *   });
     * ```
     *
     * When a route is matched, its path is available at `ctx._matchedRoute` and if named,
     * the name is available at `ctx._matchedRouteName`
     *
     * Route paths will be translated to regular expressions using
     * [path-to-regexp](https://github.com/pillarjs/path-to-regexp).
     *
     * Query strings will not be considered when matching requests.
     *
     * #### Named routes
     *
     * Routes can optionally have names. This allows generation of URLs and easy
     * renaming of URLs during development.
     *
     * ```javascript
     * router.get('user', '/users/:id', function (ctx, next) {
     *  // ...
     * });
     *
     * router.url('user', 3);
     * // => "/users/3"
     * ```
     *
     * #### Multiple middleware
     *
     * Multiple middleware may be given:
     *
     * ```javascript
     * router.get(
     *   '/users/:id',
     *   function (ctx, next) {
     *     return User.findOne(ctx.params.id).then(function(user) {
     *       ctx.user = user;
     *       next();
     *     });
     *   },
     *   function (ctx) {
     *     console.log(ctx.user);
     *     // => { id: 17, name: "Alex" }
     *   }
     * );
     * ```
     *
     * ### Nested routers
     *
     * Nesting routers is supported:
     *
     * ```javascript
     * var forums = new Router();
     * var posts = new Router();
     *
     * posts.get('/', function (ctx, next) {...});
     * posts.get('/:pid', function (ctx, next) {...});
     * forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());
     *
     * // responds to "/forums/123/posts" and "/forums/123/posts/123"
     * app.use(forums.routes());
     * ```
     *
     * #### Router prefixes
     *
     * Route paths can be prefixed at the router level:
     *
     * ```javascript
     * var router = new Router({
     *   prefix: '/users'
     * });
     *
     * router.get('/', ...); // responds to "/users"
     * router.get('/:id', ...); // responds to "/users/:id"
     * ```
     *
     * #### URL parameters
     *
     * Named route parameters are captured and added to `ctx.params`.
     *
     * ```javascript
     * router.get('/:category/:title', function (ctx, next) {
     *   console.log(ctx.params);
     *   // => { category: 'programming', title: 'how-to-node' }
     * });
     * ```
     *
     * The [path-to-regexp](https://github.com/pillarjs/path-to-regexp) module is
     * used to convert paths to regular expressions.
     *
     * @name get|put|post|patch|delete|del
     * @memberof module:koa-router.prototype
     * @param {String} path
     * @param {Function=} middleware route middleware(s)
     * @param {Function} callback route callback
     * @returns {Router}
     */

  }, {
    key: 'patch',
    value: function patch(name, path, middleware) {
      if (typeof path === 'string' || path instanceof RegExp) {
        middleware = Array.prototype.slice.call(arguments, 2);
      } else {
        middleware = Array.prototype.slice.call(arguments, 1);
        path = name;
        name = null;
      }

      this.register(path, ['patch'], middleware, {
        name: name
      });

      return this;
    }

    /**
     * Use given middleware.
     *
     * Middleware run in the order they are defined by `.use()`. They are invoked
     * sequentially, requests start at the first middleware and work their way
     * "down" the middleware stack.
     *
     * @example
     *
     * ```javascript
     * // session middleware will run before authorize
     * router
     *   .use(session())
     *   .use(authorize());
     *
     * // use middleware only with given path
     * router.use('/users', userAuth());
     *
     * // or with an array of paths
     * router.use(['/users', '/admin'], userAuth());
     *
     * app.use(router.routes());
     * ```
     *
     * @param {String=} path
     * @param {Function} middleware
     * @param {Function=} ...
     * @returns {Router}
     */

  }, {
    key: 'use',
    value: function use() {
      var router = this;
      var middleware = Array.prototype.slice.call(arguments);
      var path = '(.*)';

      // support array of paths
      if (Array.isArray(middleware[0]) && typeof middleware[0][0] === 'string') {
        middleware[0].forEach(function (p) {
          return router.use.apply(router, [p].concat(middleware.slice(1)));
        });
        return this;
      }

      var hasPath = typeof middleware[0] === 'string';
      if (hasPath) {
        path = middleware.shift();
      }

      middleware.forEach(function (m) {
        if (m.router) {
          m.router.stack.forEach(function (nestedLayer) {
            if (path) nestedLayer.setPrefix(path);
            if (router.opts.prefix) nestedLayer.setPrefix(router.opts.prefix);
            router.stack.push(nestedLayer);
          });

          if (router.params) {
            Object.keys(router.params).forEach(function (key) {
              return m.router.param(key, router.params[key]);
            });
          }
        } else {
          router.register(path, [], m, {
            end: false,
            ignoreCaptures: !hasPath
          });
        }
      });

      return this;
    }

    /**
     * Set the path prefix for a Router instance that was already initialized.
     *
     * @example
     *
     * ```javascript
     * router.prefix('/things/:thing_id')
     * ```
     *
     * @param {String} prefix
     * @returns {Router}
     */

  }, {
    key: 'prefix',
    value: function prefix(_prefix) {
      _prefix = _prefix.replace(/\/$/, '');
      this.opts.prefix = _prefix;
      this.stack.forEach(function (route) {
        return route.setPrefix(_prefix);
      });
      return this;
    }

    /**
     * Returns router middleware which dispatches a route matching the request.
     *
     * @returns {Function}
     */
    /* istanbul ignore next */

  }, {
    key: 'middleware',
    value: function middleware() {
      return this.routes();
    }
  }, {
    key: 'routes',
    value: function routes() {
      var router = this;
      var dispatch = function dispatch(ctx, next) {
        var path = router.opts.routerPath || ctx.routerPath || ctx.path || ctx.req.pathname;
        var matched = router.match(path, 'PATCH');
        var layerChain = void 0,
            layer = void 0,
            i = void 0;

        if (ctx.matched) {
          ctx.matched.push.apply(ctx.matched, matched.path);
        } else {
          ctx.matched = matched.path;
        }

        ctx.router = router;

        if (!matched.route) return next();

        var matchedLayers = matched.pathAndMethod;
        var mostSpecificLayer = matchedLayers[matchedLayers.length - 1];
        ctx._matchedRoute = mostSpecificLayer.path;
        if (mostSpecificLayer.name) {
          ctx._matchedRouteName = mostSpecificLayer.name;
        }

        layerChain = matchedLayers.reduce(function (memo, layer) {
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

    /**
     * Redirect `source` to `destination` URL with optional 30x status `code`.
     *
     * Both `source` and `destination` can be route names.
     *
     * ```javascript
     * router.redirect('/login', 'sign-in');
     * ```
     *
     * This is equivalent to:
     *
     * ```javascript
     * router.all('/login', function (ctx) {
     *   ctx.redirect('/sign-in');
     * });
     * ```
     *
     * @param {String} source URL or route name.
     * @param {String} destination URL or route name.
     * @returns {Router}
     */

  }, {
    key: 'redirect',
    value: function redirect(source, destination) {
      if (source[0] !== '/') {
        source = this.url(source);
      }

      // lookup destination route by name
      if (destination[0] !== '/') {
        destination = this.url(destination);
      }

      return this.all(source, function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return ctx.redirect(destination);

                case 2:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }

    /**
     * Create and register a route.
     *
     * @param {String} path Path string.
     * @param {Array.<String>} methods Array of HTTP verbs.
     * @param {Function} middleware Multiple middleware also accepted.
     * @returns {Layer}
     * @private
     */

  }, {
    key: 'register',
    value: function register(path, methods, middleware) {
      var _this = this;

      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var router = this;
      var stack = this.stack;

      // support array of paths
      if (Array.isArray(path)) {
        path.forEach(function (p) {
          return router.register.call(router, p, methods, middleware, opts);
        });
        return this;
      }

      // create route
      var route = new _layer2.default(path, methods, middleware, {
        end: opts.end === false ? opts.end : true,
        name: opts.name,
        sensitive: opts.sensitive || this.opts.sensitive || false,
        strict: opts.strict || this.opts.strict || false,
        prefix: opts.prefix || this.opts.prefix || "",
        ignoreCaptures: opts.ignoreCaptures
      });

      if (this.opts.prefix) {
        route.setPrefix(this.opts.prefix);
      }

      // add parameter middleware
      Object.keys(this.params).forEach(function (param) {
        return route.param(param, _this.params[param]);
      });
      stack.push(route);
      return route;
    }

    /**
     * Lookup route with given `name`.
     *
     * @param {String} name
     * @returns {Layer|false}
     */

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

    /**
     * Generate URL for route. Takes a route name and map of named `params`.
     *
     * @example
     *
     * ```javascript
     * router.get('user', '/users/:id', function (ctx, next) {
     *   // ...
     * });
     *
     * router.url('user', 3);
     * // => "/users/3"
     *
     * router.url('user', { id: 3 });
     * // => "/users/3"
     *
     * router.use(function (ctx, next) {
     *   // redirect to named route
     *   ctx.redirect(ctx.router.url('sign-in'));
     * })
     * ```
     *
     * @param {String} name route name
     * @param {Object} params url parameters
     * @returns {String|Error}
     */

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

    /**
     * Match given `path` and return corresponding routes.
     *
     * @param {String} path
     * @param {String} method
     * @returns {Object.<path, pathAndMethod>} returns layers that matched path and
     * path and method.
     * @private
     */

  }, {
    key: 'match',
    value: function match(path, method) {
      var layers = this.stack;
      var layer = void 0;
      var matched = {
        path: [],
        pathAndMethod: [],
        route: false
      };

      for (var len = layers.length, i = 0; i < len; i++) {
        layer = layers[i];

        if (layer.match(path)) {
          matched.path.push(layer);

          if (layer.methods.length === 0 || ~layer.methods.indexOf(method)) {
            matched.pathAndMethod.push(layer);
            if (layer.methods.length) matched.route = true;
          }
        }
      }

      return matched;
    }

    /**
     * Run middleware for named route parameters. Useful for auto-loading or
     * validation.
     *
     * @example
     *
     * ```javascript
     * router
     *   .param('user', function (id, ctx, next) {
     *     ctx.user = users[id];
     *     if (!ctx.user) return ctx.status = 404;
     *     return next();
     *   })
     *   .get('/users/:user', function (ctx) {
     *     ctx.body = ctx.user;
     *   })
     *   .get('/users/:user/friends', function (ctx) {
     *     return ctx.user.getFriends().then(function(friends) {
     *       ctx.body = friends;
     *     });
     *   })
     *   // /users/3 => {"id": 3, "name": "Alex"}
     *   // /users/3/friends => [{"id": 4, "name": "TJ"}]
     * ```
     *
     * @param {String} param
     * @param {Function} middleware
     * @returns {Router}
     */

  }, {
    key: 'param',
    value: function param(_param, middleware) {
      this.params[_param] = middleware;
      this.stack.forEach(function (route) {
        return route.param(_param, middleware);
      });
      return this;
    }

    /**
     * Generate URL from url pattern and given `params`.
     *
     * @example
     *
     * ```javascript
     * var url = Router.url('/users/:id', {id: 1});
     * // => "/users/1"
     * ```
     *
     * @param {String} path url pattern
     * @param {Object} params url parameters
     * @returns {String}
     */

  }], [{
    key: 'url',
    value: function url(path, params) {
      return _layer2.default.prototype.url.call({ path: path }, params);
    }
  }]);
  return Router;
}();

exports.default = Router;
module.exports = exports['default'];