import MiddleWare from 'miox/miox_modules/middleware';
import Router from 'miox-router';
import Layer from 'miox-router/layer';

describe('Layer', () => {

  it('composes multiple callbacks/middlware', () => {
    const app = new MiddleWare();
    const router = new Router();
    let status;
    app.req = {
      pathname: '/programming/how-to-node'
    }
    router.patch(
      '/:category/:title',
      async (ctx, next) => {
        status = 500;
        await next();
      },
      async (ctx, next) => {
        status = 204;
        await next();
      }
    );
    app.use(router.routes());
    app.__defineProcessHandle__();
    app.execute(app);

    expect(app.params.category).toEqual('programming');
    expect(app.params.title).toEqual('how-to-node');
    expect(status).toEqual(204);
  });

  describe('Layer#match()', () => {
    it('captures URL path parameters', () => {
      const app = new MiddleWare();
      const router = new Router();
      app.req = {
        pathname: '/programming/how-to-node'
      }
      router.patch('/:category/:title', async (ctx, next) => {
        expect(!!ctx.params).toBe(true);
        expect(typeof ctx.params).toBe('object');
        expect(ctx.params.category).toEqual('programming');
        expect(ctx.params.title).toEqual('how-to-node');
      });
      app.use(router.routes());
      app.__defineProcessHandle__();
      app.execute(app);
    });

    it('return orginal path parameters when decodeURIComponent throw error', () => {
      const app = new MiddleWare();
      const router = new Router();
      let status;
      app.req = {
        pathname: '/100%/101%'
      }
      router.patch('/:category/:title', async (ctx, next) => {
        expect(ctx.params.category).toEqual('100%');
        expect(ctx.params.title).toEqual('101%');
        status = 204;
      });
      app.use(router.routes());
      app.__defineProcessHandle__();
      app.execute(app);
      expect(status).toEqual(204);
    });

    it('populates ctx.captures with regexp captures', () => {
      const app = new MiddleWare();
      const router = new Router();
      let status;
      app.req = {
        pathname: '/api/1'
      }
      router.patch(/^\/api\/([^\/]+)\/?/i, async (ctx, next) => {
        expect(!!ctx.captures).toBe(true);
        expect(ctx.captures instanceof Array).toBe(true);
        expect(ctx.captures[0]).toEqual('1');
        status = 500;
        await next();
      }, async (ctx, next) => {
        expect(!!ctx.captures).toBe(true);
        expect(ctx.captures instanceof Array).toBe(true);
        expect(ctx.captures[0]).toEqual('1');
        status = 204;
      });
      app.use(router.routes());
      app.__defineProcessHandle__();
      app.execute(app);
      expect(status).toEqual(204);
    });

    it('return orginal ctx.captures when decodeURIComponent throw error', () => {
      const app = new MiddleWare();
      const router = new Router();
      let status;
      app.req = {
        pathname: '/api/101%'
      }
      router.patch(/^\/api\/([^\/]+)\/?/i, async (ctx, next) => {
        expect(!!ctx.captures).toBe(true);
        expect(typeof ctx.captures).toBe('object');
        expect(ctx.captures[0]).toEqual('101%');
        await next();
      }, async (ctx, next) => {
        expect(!!ctx.captures).toBe(true);
        expect(typeof ctx.captures).toBe('object');
        expect(ctx.captures[0]).toEqual('101%');
        status = 204;
      });
      app.use(router.routes());
      app.__defineProcessHandle__();
      app.execute(app);
      expect(status).toEqual(204);
    });

    it('populates ctx.captures with regexp captures include undefiend', () => {
      const app = new MiddleWare();
      const router = new Router();
      let status;
      app.req = {
        pathname: '/api'
      }
      router.patch(/^\/api(\/.+)?/i, async (ctx, next) => {
        expect(!!ctx.captures).toBe(true);
        expect(typeof ctx.captures).toBe('object');
        expect(ctx.captures[0]).toEqual(undefined);
        await next();
      }, async (ctx, next) => {
        expect(!!ctx.captures).toBe(true);
        expect(typeof ctx.captures).toBe('object');
        expect(ctx.captures[0]).toEqual(undefined);
        status = 204;
      });
      app.use(router.routes());
      app.__defineProcessHandle__();
      app.execute(app);
      expect(status).toEqual(204);
    });

    it('should throw friendly error message when handle not exists', () => {
      const app = new MiddleWare();
      const router = new Router();
      app.use(router.routes());
      var notexistHandle = undefined;
      expect(function() {
        router.patch('/foo', notexistHandle);
      }).toThrowError('patch `/foo`: `middleware` must be a function, not `undefined`')

      expect(function() {
        router.patch('foo router', '/foo', notexistHandle);
      }).toThrowError('patch `foo router`: `middleware` must be a function, not `undefined`')

      expect(function() {
        router.patch('/foo', function() {}, notexistHandle);
      }).toThrowError('patch `/foo`: `middleware` must be a function, not `undefined`')
    });
  });

  describe('Layer#param()', () => {
    it('composes middleware for param fn', () => {
      const app = new MiddleWare();
      const router = new Router();
      let status;
      app.req = {
        pathname: '/users/3'
      }
      router.param('user', async function(id, ctx, next) {
        ctx.user = { name: 'alex', id };
        if (!id) return status = 404;
        await next();
      });
      router.patch('/users/:user', async ctx => {
        expect(ctx.user.name).toBe('alex');
        expect(ctx.user.id).toBe('3');
        status = 204;
      });
      app.use(router.routes());
      app.__defineProcessHandle__();
      app.execute(app);
      expect(status).toEqual(204);
    });

    it('ignores params which are not matched', () => {
      const app = new MiddleWare();
      const router = new Router();
      let status = 200;
      app.req = {
        pathname: '/users/3'
      }
      const route = new Layer('/users/:user', ['PATCH'], [function (ctx) {
        expect(ctx.user.name).toBe('alex');
        expect(ctx.user.id).toBe('3');
      }]);
      route.param('user', function (id, ctx, next) {
        ctx.user = { name: 'alex', id };
        if (!id) return status = 404;
        return next();
      });
      route.param('title', function (id, ctx, next) {
        ctx.user = { name: 'mark', id };
        if (!id) return status = 404;
        return next();
      });
      router.stack.push(route);
      app.use(router.routes());
      app.__defineProcessHandle__();
      app.execute(app);
      expect(status).toEqual(200);
    });
  });

  describe('Layer#url()', () => {
    it('generates route URL', () => {
      var route = new Layer('/:category/:title', ['patch'], [function () {}]);
      var url = route.url({ category: 'programming', title: 'how-to-node' });
      expect(url).toBe('/programming/how-to-node');
      url = route.url('programming', 'how-to-node');
      expect(url).toBe('/programming/how-to-node');
    });

    it('escapes using encodeURIComponent()', () => {
      var route = new Layer('/:category/:title', ['patch'], [function () {}]);
      var url = route.url({ category: 'programming', title: 'how to node' });
      expect(url).toBe('/programming/how%20to%20node');
    });
  });
});