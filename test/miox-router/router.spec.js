import MiddleWare from 'miox/miox_modules/middleware';
import Router from 'miox-router';
import Layer from 'miox-router/layer';

describe('Router', () => {
  it('shares context between routers (gh-205)', () => {
    var app = new MiddleWare();
    var router1 = new Router();
    var router2 = new Router();
    app.status = 200;
    app.req = {
      pathname: '/'
    }
    router1.patch('/', function (ctx, next) {
      ctx.foo = 'bar';
      return next();
    });
    router2.patch('/', function (ctx, next) {
      ctx.baz = 'qux';
      ctx.body = { foo: ctx.foo };
      return next();
    });
    app.use(router1.routes()).use(router2.routes());
    app.__defineProcessHandle__();
    app.execute(app);
    expect(app.status).toBe(200);
    expect(app.body.foo).toBe('bar');
  });

  it('does not register middleware more than once (gh-184)', () => {
    var app = new MiddleWare();
    var parentRouter = new Router();
    var nestedRouter = new Router();
    app.status = 200;
    app.req = {
      pathname: '/parent-route/first-nested-route'
    }
    nestedRouter
      .patch('/first-nested-route', function (ctx, next) {
        ctx.body = { n: ctx.n };
      })
      .patch('/second-nested-route', function (ctx, next) {
        return next();
      })
      .patch('/third-nested-route', function (ctx, next) {
        return next();
      });

    parentRouter.use('/parent-route', function (ctx, next) {
      ctx.n = ctx.n ? (ctx.n + 1) : 1;
      return next();
    }, nestedRouter.routes());

    app.use(parentRouter.routes());
    app.__defineProcessHandle__();
    app.execute(app);
    expect(app.status).toBe(200);
    expect(app.body.n).toBe(1);
  });

  it('router can be accecced with ctx', () => {
    var app = new MiddleWare();
    var router = new Router();
    app.status = 200;
    app.req = {
      pathname: '/'
    }
    router.patch('home', '/', function (ctx) {
        ctx.body = {
          url: ctx.router.url('home')
        };
    });
    app.use(router.routes());
    app.__defineProcessHandle__();
    app.execute(app);
    expect(app.status).toBe(200);
    expect(app.body.url).toBe('/');
  });

  it('registers multiple middleware for one route', function(done) {
    var app = new MiddleWare();
    var router = new Router();
    app.status = 200;
    app.req = {
      pathname: '/double'
    }

    router.patch('/double', function(ctx, next) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          ctx.body = {message: 'Hello'};
          resolve(next());
        }, 1);
      });
    }, function(ctx, next) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          ctx.body.message += ' World';
          resolve(next());
        }, 1);
      });
    }, function(ctx, next) {
      ctx.body.message += '!';
      expect(ctx.body.message).toBe('Hello World!');
      done();
    });

    app.use(router.routes());
    app.__defineProcessHandle__();
    app.execute(app);
    expect(app.status).toBe(200);
  });

  it('does not break when nested-routes use regexp paths', () => {
    var app = new MiddleWare();
    var parentRouter = new Router();
    var nestedRouter = new Router();
    app.status = 200;
    app.req = {
      pathname: '/parent-route/second-nested-route'
    }

    nestedRouter
      .patch(/^\/\w$/i, function (ctx, next) {
        return next();
      })
      .patch('/first-nested-route', function (ctx, next) {
        app.result = 1;
        return next();
      })
      .patch('/second-nested-route', function (ctx, next) {
        app.result = 2;
        return next();
      });

    parentRouter.use('/parent-route', function (ctx, next) {
      return next();
    }, nestedRouter.routes());

    app.use(parentRouter.routes());
    app.__defineProcessHandle__();
    app.execute(app);
    expect(app.status).toBe(200);
    expect(app.result).toBe(2);
  });

  it('exposes middleware factory', () => {
    var router = new Router();
    expect(!!router.routes).toBe(true);
    expect(typeof router.routes).toBe('function');
    var middleware = router.routes();
    expect(typeof middleware).toBe('function');
  });

  it('supports promises for async/await', function (done) {
    var app = new MiddleWare();
    var router = new Router();
    app.status = 200;
    app.req = {
      pathname: '/async'
    }
    router.patch('/async', function (ctx, next) {
      return new Promise(function (resolve, reject) {
        setTimeout(function() {
          ctx.body = {
            msg: 'promises!'
          };
          next().then(resolve);
        }, 1);
      });
    });

    app.use(router.routes(), async ctx => {
      expect(ctx.body.msg).toBe('promises!');
      done();
    });
    app.__defineProcessHandle__();
    app.execute(app);
    expect(app.status).toBe(200);
  });

  it('matches middleware only if route was matched (gh-182)', () => {
    var app = new MiddleWare();
    var router = new Router();
    var otherRouter = new Router();

    app.status = 200;
    app.req = {
      pathname: '/bar'
    }

    router.use(function (ctx, next) {
      ctx.body = { bar: 'baz' };
      return next();
    });

    otherRouter.patch('/bar', function (ctx) {
      ctx.body = ctx.body || { foo: 'bar' };
    });

    app.use(router.routes()).use(otherRouter.routes());
    app.__defineProcessHandle__();
    app.execute(app);
    expect(app.status).toBe(200);
    expect(app.body.foo).toBe('bar');
    expect(app.body.bar).toBeUndefined();
  });

  it('matches first to last', () => {
    var app = new MiddleWare();
    var router = new Router();

    app.status = 200;
    app.req = {
      pathname: '/user/account.jsx'
    }

    router
      .patch('user_page', '/user/(.*).jsx', function (ctx) {
        ctx.body = { order: 1 };
      })
      .all('app', '/app/(.*).jsx', function (ctx) {
        ctx.body = { order: 2 };
      })
      .all('view', '(.*).jsx', function (ctx) {
        ctx.body = { order: 3 };
      });

    app.use(router.routes());
    app.__defineProcessHandle__();
    app.execute(app);
    expect(app.status).toBe(200);
    expect(app.body.order).toBe(1);
  });

  it('does not run subsequent middleware without calling next', () => {
    var app = new MiddleWare();
    var router = new Router();

    app.status = 200;
    app.req = {
      pathname: '/user/account.jsx'
    }

    router
      .patch('user_page', '/user/(.*).jsx', function (ctx) {
        app.status = 404;
      }, function (ctx) {
        ctx.body = { order: 1 };
      });

    app.use(router.routes());
    app.__defineProcessHandle__();
    app.execute(app);
    expect(app.status).toBe(404);
  });

  it('nests routers with prefixes at root', () => {
    var app = new MiddleWare();
    var api = new Router();
    app.status = 404;
    app.req = {}
    var forums = new Router({
      prefix: '/forums',
      ignoreCaptures: true
    });
    var posts = new Router({
      prefix: '/:fid/posts',
      ignoreCaptures: true
    });
    var server;

    posts
      // /forums/:fid/posts
      .patch('/', function (ctx, next) {
        ctx.status = 204;
        return next();
      })
      // /forums/:fid/posts/:pid
      .patch('/:pid', function (ctx, next) {
        ctx.status = 200;
        ctx.body = ctx.params;
        return next();
      });

    forums.use(posts.routes());
    app.use(forums.routes());
    app.__defineProcessHandle__();
    app.req.pathname = '/forums/1/posts';
    app.execute(app);
    expect(app.status).toBe(204);
    app.status = 404;
    app.req.pathname = '/forums/1';
    app.execute(app);
    expect(app.status).toBe(404);
    app.status = 404;
    app.req.pathname = '/forums/1/posts/2';
    app.execute(app);
    expect(app.status).toBe(200);
    expect(app.body.fid).toBe('1');
    expect(app.body.pid).toBe('2');
  });

  it('nests routers with prefixes at path', () => {
    var app = new MiddleWare();
    var api = new Router();
    app.req = {};
    var forums = new Router({
      prefix: '/api'
    });
    var posts = new Router({
      prefix: '/posts'
    });
    var server;

    posts
      .patch('/', function (ctx, next) {
        ctx.status = 204;
        return next();
      })
      .patch('/:pid', function (ctx, next) {
        ctx.status = 200;
        ctx.body = ctx.params;
        return next();
      });

    forums.use('/forums/:fid', posts.routes());
    app.use(forums.routes());
    app.__defineProcessHandle__();

    app.status = 404;
    app.req.pathname = '/api/forums/1/posts';
    app.execute(app);
    expect(app.status).toBe(204);

    app.status = 404;
    app.req.pathname = '/api/forums/1';
    app.execute(app);
    expect(app.status).toBe(404);

    app.status = 404;
    app.req.pathname = '/api/forums/1/posts/2';
    app.execute(app);
    expect(app.status).toBe(200);
    expect(app.body.fid).toBe('1');
    expect(app.body.pid).toBe('2');
  });

  it('runs subrouter middleware after parent', () => {
    var app = new MiddleWare();
    app.req = {};
    var subrouter = new Router();
    subrouter.use(function (ctx, next) {
        ctx.msg = 'subrouter';
        return next();
      })
      .patch('/', function (ctx) {
        ctx.status = 200;
        ctx.body = { msg: ctx.msg };
      });
    var router = new Router();
    router.use(function (ctx, next) {
        ctx.msg = 'router';
        return next();
      })
      .use(subrouter.routes());

    app.use(router.routes());
    app.__defineProcessHandle__();
    app.status = 404;
    app.req.pathname = '/';
    app.execute(app);
    expect(app.status).toBe(200);
    expect(app.body.msg).toBe('subrouter');
  });

  it('runs parent middleware for subrouter routes', () => {
    var app = new MiddleWare();
    app.req = {};
    var subrouter = new Router();
    subrouter.patch('/sub', function (ctx) {
        app.status = 200;
        ctx.body = { msg: ctx.msg };
      });
    var router = new Router();
    router.use(function (ctx, next) {
        ctx.msg = 'router';
        return next();
      })
      .use('/parent', subrouter.routes());
    
    app.use(router.routes());
    app.__defineProcessHandle__();
    app.status = 404;
    app.req.pathname = '/parent/sub';
    app.execute(app);
    expect(app.status).toBe(200);
    expect(app.body.msg).toBe('router');
  });

  it('matches corresponding requests', () => {
    var app = new MiddleWare();
    app.req = {};
    var router = new Router();
    app.use(router.routes());
    router.patch('/:category', function (ctx) {
      expect(!!ctx.params).toBe(true);
      expect(ctx.params.category).toBe('programming');
      ctx.status = 204;
    });
    router.patch('/:category/not-a-title', function (ctx) {
      expect(!!ctx.params).toBe(true);
      expect(ctx.params.category).toBe('programming');
      expect(!!ctx.params.title).toBe(true);
		  ctx.status = 204;
    });
    router.patch('/:category/:title', function (ctx) {
      expect(!!ctx.params).toBe(true);
      expect(ctx.params.category).toBe('programming');
      expect(ctx.params.title).toBe('how-to-node');
      ctx.status = 204;
    });
    
    app.__defineProcessHandle__();

    app.status = 404;
    app.req.pathname = '/programming/how-to-node';
    app.execute(app);
    expect(app.status).toBe(204);


    app.status = 404;
    app.req.pathname = '/programming';
    app.execute(app);
    expect(app.status).toBe(204);

    app.status = 404;
    app.req.pathname = '/programming/not-a-title';
    app.execute(app);
    expect(app.status).toBe(204);
  });

  it('executes route middleware using `app.context`', () => {
    var app = new MiddleWare();
    app.req = {};
    var router = new Router();
    app.use(router.routes());
    router.use(function (ctx, next) {
      ctx.bar = 'baz';
      return next();
    });
    router.patch('/:category/:title', function (ctx, next) {
      ctx.foo = 'bar';
      return next();
    }, function (ctx) {
      expect(ctx.bar).toBe('baz');
      expect(ctx.foo).toBe('bar');
      expect(!!ctx.req).toBe(true);
      ctx.status = 204;
    });
    app.__defineProcessHandle__();
    app.status = 404;
    app.req.pathname = '/match/this';
    app.execute(app);
    expect(app.status).toBe(204);
  });

  it('supports promises for route middleware', function (done) {
    var app = new MiddleWare();
    app.req = {};
    var router = new Router();
    app.use(router.routes());
    var readVersion = function () {
      return new Promise(function (resolve, reject) {
        setTimeout(resolve, 40);
      });
    };
    router
      .patch('/', function (ctx, next) {
        return next();
      }, function (ctx) {
        return readVersion().then(function () {
          ctx.status = 204;
          expect(app.status).toBe(204);
          done();
        });
      });

    app.__defineProcessHandle__();
    app.status = 404;
    app.req.pathname = '/';
    app.execute(app);
  });

  describe('Router#[verb]()', function () {
    it('registers route with a regexp path', function () {
      var router = new Router();
      expect(router.patch(/^\/\w$/i, function () {})).toEqual(router);
    });

    it('registers route with a given name', function () {
      var router = new Router();
      expect(router.patch('patch','/', function () {})).toEqual(router);
    });

    it('registers route with with a given name and regexp path', function () {
      var router = new Router();
      expect(router.patch('patch',/^\/$/i, function () {})).toEqual(router);
    });

    it('enables route chaining', function () {
      var router = new Router();
      expect(router.patch('/', function () {})).toEqual(router);
    });

    it('registers array of paths (gh-203)', function () {
      var router = new Router();
      router.patch(['/one', '/two'], function (ctx, next) {
        return next();
      });
      expect(router.stack.length).toBe(2);
      expect(router.stack[0].path).toBe('/one');
      expect(router.stack[1].path).toBe('/two');
    });

    it('resolves non-parameterized routes without attached parameters', () => {
      var app = new MiddleWare();
      var router = new Router();
      app.req = {};

      router.patch('/notparameter', function (ctx, next) {
        ctx.status = 200;
        ctx.body = {
          param: ctx.params.parameter,
        };
      });

      router.patch('/:parameter', function (ctx, next) {
        ctx.status = 200;
        ctx.body = {
          param: ctx.params.parameter,
        };
      });

      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/notparameter';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body.param).toBeUndefined();
    });
  });

  describe('Router#use()', function () {
    it('uses router middleware without path', () => {
      var app = new MiddleWare();
      var router = new Router();
      app.req = {};

      router.use(function (ctx, next) {
        ctx.foo = 'baz';
        return next();
      });

      router.use(function (ctx, next) {
        ctx.foo = 'foo';
        return next();
      });

      router.patch('/foo/bar', function (ctx) {
        ctx.status = 200;
        ctx.body = {
          foobar: ctx.foo + 'bar'
        };
      });

      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/foo/bar';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body.foobar).toBe('foobar');
    });

    it('uses router middleware at given path', () => {
      var app = new MiddleWare();
      var router = new Router();
      app.req = {};

      router.use('/foo/bar', function (ctx, next) {
        ctx.foo = 'foo';
        return next();
      });

      router.patch('/foo/bar', function (ctx) {
        ctx.status = 200;
        ctx.body = {
          foobar: ctx.foo + 'bar'
        };
      });

      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/foo/bar';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body.foobar).toBe('foobar');
    });

    it('runs router middleware before subrouter middleware', () => {
      var app = new MiddleWare();
      var router = new Router();
      var subrouter = new Router();
      app.req = {};

      router.use(function (ctx, next) {
        ctx.foo = 'boo';
        return next();
      });

      subrouter
        .use(function (ctx, next) {
          ctx.foo = 'foo';
          return next();
        })
        .patch('/bar', function (ctx) {
          ctx.status = 200;
          ctx.body = {
            foobar: ctx.foo + 'bar'
          };
        });

      router.use('/foo', subrouter.routes());
      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/foo/bar';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body.foobar).toBe('foobar');
    });

    it('assigns middleware to array of paths', () => {
      var app = new MiddleWare();
      var router = new Router();
      app.req = {};

      router.use(['/foo', '/bar'], function (ctx, next) {
        ctx.foo = 'foo';
        ctx.bar = 'bar';
        return next();
      });

      router.patch('/foo', function (ctx, next) {
        ctx.status = 200;
        ctx.body = {
          foobar: ctx.foo + 'bar'
        };
      });

      router.patch('/bar', function (ctx) {
        ctx.status = 200;
        ctx.body = {
          foobar: 'foo' + ctx.bar
        };
      });

      app.use(router.routes());
      app.__defineProcessHandle__();

      app.status = 404;
      app.req.pathname = '/foo';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body.foobar).toBe('foobar');

      app.status = 404;
      app.req.pathname = '/bar';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body.foobar).toBe('foobar');
    });

    it('without path, does not set params.0 to the matched path - gh-247', () => {
      var app = new MiddleWare();
      var router = new Router();
      app.req = {};

      router.use(function(ctx, next) {
        return next();
      });

      router.patch('/foo/:id', function(ctx) {
        ctx.status = 200;
        ctx.body = ctx.params;
      });

      app.use(router.routes());
      app.__defineProcessHandle__();

      app.status = 404;
      app.req.pathname = '/foo/815';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body.id).toBe('815');
      expect(!!app.body['0']).toBe(false);
    });
  });

  describe('Router#register()', function () {
    it('registers new routes', () => {
      var app = new MiddleWare();
      var router = new Router();
      expect(!!router.register).toBe(true);
      expect(typeof router.register).toBe('function');
      var route = router.register('/', ['PATCH'], function () {});
      app.use(router.routes());
      expect(Array.isArray(router.stack)).toBe(true);
      expect(router.stack.length).toBe(1);
      expect(router.stack[0].path).toBe('/');
    });
  });

  describe('Router#redirect()', function () {
    it('registers redirect routes', () => {
      var app = new MiddleWare();
      var router = new Router();
      expect(!!router.redirect).toBe(true);
      expect(typeof router.redirect).toBe('function');
      router.redirect('/source', '/destination');
      app.use(router.routes());
      expect(router.stack.length).toBe(1);
      const stack = router.stack[0];
      expect(stack instanceof Layer).toBe(true);
      expect(stack.path).toBe('/source');
    });

    it('redirects using route names', done => {
      var app = new MiddleWare();
      var router = new Router();
      app.req = {};
      app.redirect = async function(url) {
        app.r = url;
        app.status = 301;
      }
      router.patch('home', '/', function (ctx, next) {next()});
      router.patch('sign-up-form', '/sign-up-form', function () {});
      router.redirect('home', 'sign-up-form');
      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/';
      app.execute(app).then(() => {
        expect(app.status).toBe(301);
        expect(app.r).toBe('/sign-up-form');
        done();
      });
    });
  });

  describe('Router#route()', function () {
    it('inherits routes from nested router', function () {
      var app = new MiddleWare();
      var subrouter = new Router().patch('child', '/hello', function (ctx) {
        ctx.body = { hello: 'world' };
      });
      var router = new Router().use(subrouter.routes());
      expect(router.route('child').name).toBe('child');
    });
  });

  describe('Router#url()', function () {
    it('generates URL for given route name', () => {
      var app = new MiddleWare();
      var router = new Router();
      app.use(router.routes());
      router.patch('books', '/:category/:title', function (ctx) {
        ctx.status = 204;
      });
      var url = router.url('books', { category: 'programming', title: 'how to node' });
      expect(url).toBe('/programming/how%20to%20node');
      url = router.url('books', 'programming', 'how to node');
      expect(url).toBe('/programming/how%20to%20node');
    });

    it('generates URL for given route name within embedded routers', () => {
        var app = new MiddleWare();
        var router = new Router({
          prefix: "/books"
        });

        var embeddedRouter = new Router({
          prefix: "/chapters"
        });
        embeddedRouter.patch('chapters', '/:chapterName/:pageNumber', function (ctx) {
          ctx.status = 204;
        });
        router.use(embeddedRouter.routes());
        app.use(router.routes());
        var url = router.url('chapters', { chapterName: 'Learning ECMA6', pageNumber: 123 });
        expect(url).toBe('/books/chapters/Learning%20ECMA6/123');
        url = router.url('chapters', 'Learning ECMA6', 123);
        expect(url).toBe('/books/chapters/Learning%20ECMA6/123');
    });
  });

  describe('Router#param()', function () {
    it('runs parameter middleware', () => {
      var app = new MiddleWare();
      var router = new Router();
      app.req = {};
      router
        .param('user', function (id, ctx, next) {
          ctx.user = { name: 'alex' };
          if (!id) return ctx.status = 404;
          return next();
        })
        .patch('/users/:user', function (ctx, next) {
          ctx.status = 200;
          ctx.body = ctx.user;
        });

      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/users/3';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body.name).toBe('alex');
    });

    it('runs parameter middleware in order of URL appearance', () => {
      var app = new MiddleWare();
      var router = new Router();
      app.req = {};
      router
        .param('user', function (id, ctx, next) {
          ctx.user = { name: 'alex' };
          if (ctx.ranFirst) {
            ctx.user.ordered = 'parameters';
          }
          if (!id) return ctx.status = 404;
          return next();
        })
        .param('first', function (id, ctx, next) {
          ctx.ranFirst = true;
          if (ctx.user) {
            ctx.ranFirst = false;
          }
          if (!id) return ctx.status = 404;
          return next();
        })
        .patch('/:first/users/:user', function (ctx) {
          ctx.status = 200;
          ctx.body = ctx.user;
        });

      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/first/users/3';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body.name).toBe('alex');
      expect(app.body.ordered).toBe('parameters');
    });

    it('runs parameter middleware in order of URL appearance even when added in random order', () => {
      var app = new MiddleWare();
      var router = new Router();
      app.req = {};
      app.state = {};
      router
        // intentional random order
        .param('a', function (id, ctx, next) {
          ctx.state.loaded = [ id ];
          return next();
        })
        .param('d', function (id, ctx, next) {
          ctx.state.loaded.push(id);
          return next();
        })
        .param('c', function (id, ctx, next) {
          ctx.state.loaded.push(id);
          return next();
        })
        .param('b', function (id, ctx, next) {
          ctx.state.loaded.push(id);
          return next();
        })
        .patch('/:a/:b/:c/:d', function (ctx, next) {
          ctx.status = 200;
          ctx.body = ctx.state.loaded;
        });

      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/1/2/3/4';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body.join('-')).toBe('1-2-3-4');
    });

    it('runs parent parameter middleware for subrouter', () => {
      var app = new MiddleWare();
      var router = new Router();
      var subrouter = new Router();
      app.req = {};
      subrouter.patch('/:cid', function (ctx) {
        ctx.status = 200;
        ctx.body = {
          id: ctx.params.id,
          cid: ctx.params.cid
        };
      });
      router
        .param('id', function (id, ctx, next) {
          ctx.params.id = 'ran';
          if (!id) return ctx.status = 404;
          return next();
        })
        .use('/:id/children', subrouter.routes());

      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/did-not-run/children/2';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body.id).toBe('ran');
      expect(app.body.cid).toBe('2');
    });
  });

  describe('Router#opts', function () {
    it('responds with 200', () => {
      var app = new MiddleWare();
      app.req = {};
      var router = new Router({
        strict: true
      });
      router.patch('/info', function (ctx) {
        ctx.status = 200;
        ctx.body = 'hello';
      });
      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/info';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body).toBe('hello');
    });

    it('should allow setting a prefix', () => {
      var app = new MiddleWare();
      var routes = new Router({ prefix: '/things/:thing_id' });
      app.req = {};
      routes.patch('/list', function (ctx) {
        ctx.status = 200;
        ctx.body = ctx.params;
      });

      app.use(routes.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/things/1/list';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body.thing_id).toBe('1');
    });

    it('responds with 404 when has a trailing slash', () => {
      var app = new MiddleWare();
      app.req = {};
      var router = new Router({
        strict: true
      });
      router.patch('/info', function (ctx) {
        ctx.status = 200;
        ctx.body = 'hello';
      });

      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/info/';
      app.execute(app);
      expect(app.status).toBe(404);
    });
  });

  describe('use middleware with opts', function () {
    it('responds with 200', () => {
      var app = new MiddleWare();
      app.req = {};
      var router = new Router({
        strict: true
      });
      router.patch('/info', function (ctx) {
        ctx.status = 200;
        ctx.body = 'hello';
      });

      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/info';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body).toBe('hello');
    });

    it('responds with 404 when has a trailing slash', () => {
      var app = new MiddleWare();
      app.req = {};
      var router = new Router({
        strict: true
      });
      router.patch('/info', function (ctx) {
        ctx.status = 200;
        ctx.body = 'hello';
      });

      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/info/';
      app.execute(app);
      expect(app.status).toBe(404);
    });
  });

  describe('router.routes()', function () {
    it('should return composed middleware', () => {
      var app = new MiddleWare();
      var router = new Router();
      var middlewareCount = 0;
      app.req = {};
      var middlewareA = function (ctx, next) {
        middlewareCount++;
        return next();
      };
      var middlewareB = function (ctx, next) {
        middlewareCount++;
        return next();
      };
      router.use(middlewareA, middlewareB);
      router.patch('/users/:id', function (ctx) {
        expect(ctx.params.id!==undefined).toBe(true);
        ctx.status = 200;
        ctx.body = { hello: 'world' };
      });

      var routerMiddleware = router.routes();

      expect(typeof routerMiddleware).toBe('function');

      app.use(routerMiddleware);
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/users/1';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(typeof app.body).toBe('object');
      expect(app.body.hello).toBe('world');
      expect(middlewareCount).toBe(2);
    });

    it('places a `_matchedRoute` value on context', () => {
      var app = new MiddleWare();
      var router = new Router();
      app.req = {};
      var middleware = function (ctx, next) {
        expect(ctx._matchedRoute).toBe('/users/:id');
        return next();
      };

      router.use(middleware);
      router.patch('/users/:id', function (ctx, next) {
        expect(ctx._matchedRoute).toBe('/users/:id')
        expect(ctx.params.id!==undefined).toBe(true);
        ctx.status = 200;
        ctx.body = { hello: 'world' };
      });

      var routerMiddleware = router.routes();

      app.use(routerMiddleware);
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/users/1';
      app.execute(app);
      expect(app.status).toBe(200);
    });

    it('places a `_matchedRouteName` value on the context for a named route', () => {
      var app = new MiddleWare();
      var router = new Router();
      app.req = {};

      router.patch('users#show', '/users/:id', function (ctx, next) {
        expect(ctx._matchedRouteName).toBe('users#show');
        ctx.status = 200
      });

      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/users/1';
      app.execute(app);
      expect(app.status).toBe(200);
    });

    it('does not place a `_matchedRouteName` value on the context for unnamed routes', () => {
      var app = new MiddleWare();
      var router = new Router();
      app.req = {};

      router.patch('/users/:id', function (ctx, next) {
        expect(ctx._matchedRouteName).toBeUndefined();
        ctx.status = 200
      });

      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/users/1';
      app.execute(app);
      expect(app.status).toBe(200);
    });
  });

  describe('If no HEAD method, default to GET', function () {
    it('should default to GET', () => {
      var app = new MiddleWare();
      var router = new Router();
      app.req = {};
      router.patch('/users/:id', function (ctx) {
        expect(ctx.params.id!==undefined).toBe(true);
        ctx.status = 200;
        ctx.body = 'hello';
      });
      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/users/1';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body).toBe('hello');
    });

    it('should work with middleware', () => {
      var app = new MiddleWare();
      var router = new Router();
      app.req = {};
      router.patch('/users/:id', function (ctx) {
        expect(ctx.params.id!==undefined).toBe(true);
        ctx.status = 200;
        ctx.body = 'hello';
      });

      app.use(router.routes());
      app.__defineProcessHandle__();
      app.status = 404;
      app.req.pathname = '/users/1';
      app.execute(app);
      expect(app.status).toBe(200);
      expect(app.body).toBe('hello');
    });
  });

  describe('Router#prefix', function () {
    it('should set opts.prefix', function () {
      var router = new Router();
      expect(router.opts.prefix).toBeUndefined();
      router.prefix('/things/:thing_id');
      expect(router.opts.prefix).toBe('/things/:thing_id');
    });

    it('should prefix existing routes', function () {
      var router = new Router();
      router.patch('/users/:id', function (ctx) {
        ctx.body = 'test';
      })
      router.prefix('/things/:thing_id');
      var route = router.stack[0];
      expect(route.path).toBe('/things/:thing_id/users/:id');
      expect(route.paramNames.length).toBe(2);
      expect(route.paramNames[0].name).toBe('thing_id');
      expect(route.paramNames[1].name).toBe('id');
    });

    describe('when used with .use(fn) - gh-247', function () {
      it('does not set params.0 to the matched path', () => {
        var app = new MiddleWare();
        var router = new Router();
        app.req = {};
        router.use(function(ctx, next) {
          return next();
        });

        router.patch('/foo/:id', function(ctx) {
          ctx.status = 200;
          ctx.body = ctx.params;
        });

        router.prefix('/things');

        app.use(router.routes());
        app.__defineProcessHandle__();
        app.status = 404;
        app.req.pathname = '/things/foo/108';
        app.execute(app);
        expect(app.status).toBe(200);
        expect(app.body.id).toBe('108');
      });
    });

    describe('with trailing slash', testPrefix('/admin/'));
    // describe('without trailing slash', testPrefix('/admin'));

    function testPrefix(prefix) {
      return function () {
        var app;
        var middlewareCount = 0;

        beforeEach(function () {
          app = new MiddleWare();
          var router = new Router();
          app.req = {};
          middlewareCount = 0;

          router.use(function (ctx, next) {
            middlewareCount++;
            ctx.thing = 'worked';
            return next();
          });

          router.patch('/', function (ctx) {
            middlewareCount++;
            ctx.status = 200;
            ctx.body = { name: ctx.thing };
          });

          router.prefix(prefix);
          app.use(router.routes());
        });

        it('should support root level router middleware', () => {
          app.__defineProcessHandle__();
          app.status = 404;
          app.req.pathname = prefix;
          app.execute(app);
          expect(app.status).toBe(200);
          expect(middlewareCount).toBe(2);
          expect(typeof app.body).toBe('object');
          expect(app.body.name).toBe('worked');
        });

        it('should support requests with a trailing path slash', () => {
          app.__defineProcessHandle__();
          app.status = 404;
          app.req.pathname = '/admin/';
          app.execute(app);
          expect(app.status).toBe(200);
          expect(middlewareCount).toBe(2);
          expect(typeof app.body).toBe('object');
          expect(app.body.name).toBe('worked');
        });

        it('should support requests without a trailing path slash', () => {
          app.__defineProcessHandle__();
          app.status = 404;
          app.req.pathname = '/admin';
          app.execute(app);
          expect(app.status).toBe(200);
          expect(middlewareCount).toBe(2);
          expect(typeof app.body).toBe('object');
          expect(app.body.name).toBe('worked');
        });
      }
    }
  });

  describe('Static Router#url()', function () {
    it('generates route URL', function () {
        var url = Router.url('/:category/:title', { category: 'programming', title: 'how-to-node' });
        expect(url).toBe('/programming/how-to-node');
    });

    it('escapes using encodeURIComponent()', function () {
      var url = Router.url('/:category/:title', { category: 'programming', title: 'how to node' });
      expect(url).toBe('/programming/how%20to%20node');
    });
  });

});