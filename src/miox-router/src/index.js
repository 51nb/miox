import compose from 'miox-compose';
import Layer from './layer';

export default class Router {
  constructor(opts = {}) {
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
  all(...args) {
    return this.patch(...args);
  }

  /* istanbul ignore next */
  'static'(options = {}) {
    for (const uri in options) {
      this.patch(
        uri, 
        async ctx => await ctx.render(options[uri])
      );
    }
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
  patch(name, path, middleware) {
    if (typeof path === 'string' || path instanceof RegExp) {
      middleware = Array.prototype.slice.call(arguments, 2);
    } else {
      middleware = Array.prototype.slice.call(arguments, 1);
      path = name;
      name = null;
    }

    this.register(
      path, ['patch'],
      middleware, {
        name: name
      }
    );

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
  use() {
    const router = this;
    const middleware = Array.prototype.slice.call(arguments);
    let path = '(.*)';

    // support array of paths
    if (Array.isArray(middleware[0]) && typeof middleware[0][0] === 'string') {
      middleware[0].forEach(p => router.use.apply(router, [p].concat(middleware.slice(1))));
      return this;
    }

    var hasPath = typeof middleware[0] === 'string';
    if (hasPath) {
      path = middleware.shift();
    }

    middleware.forEach(m => {
      if (m.router) {
        m.router.stack.forEach(nestedLayer => {
          if (path) nestedLayer.setPrefix(path);
          if (router.opts.prefix) nestedLayer.setPrefix(router.opts.prefix);
          router.stack.push(nestedLayer);
        });

        if (router.params) {
          Object.keys(router.params).forEach(key => m.router.param(key, router.params[key]));
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
  prefix(prefix) {
    prefix = prefix.replace(/\/$/, '');
    this.opts.prefix = prefix;
    this.stack.forEach(route => route.setPrefix(prefix));
    return this;
  }

  /**
   * Returns router middleware which dispatches a route matching the request.
   *
   * @returns {Function}
   */
  /* istanbul ignore next */
  middleware() { return this.routes(); }
  routes() {
    const router = this;
    const dispatch = function dispatch(ctx, next) {
      const path = ctx.req.pathname;
      const matched = router.match(path, 'PATCH');
      let layerChain, layer, i;

      if (ctx.matched) {
        ctx.matched.push.apply(ctx.matched, matched.path);
      } else {
        ctx.matched = matched.path;
      }

      ctx.router = router;

      if (!matched.route) return next();

      const matchedLayers = matched.pathAndMethod;
      const mostSpecificLayer = matchedLayers[matchedLayers.length - 1];
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

      return compose(layerChain)(ctx, next);
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
  redirect(source, destination) {
    if (source[0] !== '/') {
      source = this.url(source);
    }
  
    // lookup destination route by name
    if (destination[0] !== '/') {
      destination = this.url(destination);
    }

    return this.all(source, async function (ctx) {
      await ctx.redirect(destination);
    });
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
  register(path, methods, middleware, opts = {}) {
    const router = this;
    const stack = this.stack;
  
    // support array of paths
    if (Array.isArray(path)) {
      path.forEach(p => router.register.call(router, p, methods, middleware, opts));  
      return this;
    }
  
    // create route
    const route = new Layer(path, methods, middleware, {
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
    Object.keys(this.params).forEach(param => route.param(param, this.params[param]));
    stack.push(route);
    return route;
  }

  /**
   * Lookup route with given `name`.
   *
   * @param {String} name
   * @returns {Layer|false}
   */
  route(name) {
    const routes = this.stack;
    
    for (let len = routes.length, i=0; i<len; i++) {
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
  url(name, params) {
    const route = this.route(name);
    
    if (route) {
      const args = Array.prototype.slice.call(arguments, 1);
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
  match(path, method) {
    const layers = this.stack;
    let layer;
    const matched = {
      path: [],
      pathAndMethod: [],
      route: false
    };
  
    for (let len = layers.length, i = 0; i < len; i++) {
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
  param(param, middleware) {
    this.params[param] = middleware;
    this.stack.forEach(route => route.param(param, middleware));
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
  static url(path, params) {
    return Layer.prototype.url.call({path: path}, params);
  }
}