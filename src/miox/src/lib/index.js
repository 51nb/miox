/**
 * Created by evio on 2017/8/29.
 */
import MiddleWare from '../miox_modules/middleware';
import Dictionary from '../miox_modules/dictionary';
import Request from '../miox_modules/request';
import Response from '../miox_modules/response';
import History from './history';
import Plugin from './plugin';
import WebTree from './webtree';
import {
  extend
} from './util';

const toString = Object.prototype.toString;

export default class Miox extends MiddleWare {
  /**
   * 参数详解：
   * @param options [Object object]
   *  - @max [Object number: 1] 在页面上存在最大个数的webview
   *  - @popState [Object boolean: false] 是否强制使用popState模式
   *  - @session [Object boolean: false] 是否使用sessionStorage来记录层级用于方向判断
   *  - @strict [Object boolean: true] 是否严格模式，用来区分query变化是否重新渲染页面
   */
  constructor(options = {}) {
    super();

    this.options = extend(options, {
      max: 1,
      popState: false,
      session: false,
      strict: true
    });

    this.env = process.env.MIOX_ENV || 'web';
    this.vars = new Dictionary();
    this.cache = new Dictionary();
    this.plugin = new Plugin(this);
    this.installed = false;
    this.err = null;
    this.doing = false;
    this.clientMounted = false;

    this.set('request', {});
    this.set('response', {});
    this.set('exists-webview', null);
    this.set('active-webview', null);

    if (this.env !== 'server') this.set('container', global.document.body);

    this.vars.on('engine', this.plugin.Engine.bind(this.plugin));
    this.vars.on('animate', this.plugin.Animate.bind(this.plugin));
  }

  /* istanbul ignore next */
  install(...args) {
    args.forEach(arg => {
      if (typeof arg === 'function') {
        arg(this);
      }
    })
  }

  set(...args) {
    return this.vars.set(...args);
  }
  get(...args) {
    return this.vars.get(...args);
  }
  /* istanbul ignore next */
  del(...args) {
    return this.vars.del(...args);
  }
  /* istanbul ignore next */
  exists(...args) {
    return this.vars.exists(...args);
  }
  /* istanbul ignore next */
  filter(...args) {
    return this.vars.filter(...args);
  }
  /* istanbul ignore next */
  link(...args) {
    return this.history.link(...args);
  }
  async push(...args) {
    return await this.history.push(...args);
  }
  async replace(...args) {
    return await this.history.replace(...args);
  }
  async go(...args) {
    return await this.history.go(...args);
  }
  /* istanbul ignore next */
  async redirect(url) {
    const err = new Error('302 Redirect');
    err.code = 302;
    err.url = url;
    throw err;
  }

  get request() {
    return this.get('request');
  }
  get response() {
    return this.get('response');
  }
  get req() {
    return this.request;
  }
  /* istanbul ignore next */
  get res() {
    return this.response;
  }
  /* istanbul ignore next */
  get query() {
    return this.req.query || {};
  }
  /* istanbul ignore next */
  get pathname() {
    return this.req.pathname || '/';
  }
  /* istanbul ignore next */
  get url() {
    return this.req.href || '/';
  }

  get webView() {
    const existsWebView = this.get('exists-webview');
    if (existsWebView) {
      return existsWebView.basic.dic.get(existsWebView.mark);
    }
  }

  /* istanbul ignore next */
  get reference() {
    return {
      fetch: this.fetch.bind(this),
      application: this.$application,
      service: this.$context,
      ctx: this,
    }
  }

  exchange() {
    const webView = this.get('active-webview');
    if (webView) {
      this.set('exists-webview', webView);
      this.set('active-webview', null);
    }
  }

  async notify(index, redirecting) {
    const webview = this.webView;

    if (this.env !== 'server' && !redirecting) {
      if (this.env === 'client' && !this.installed) {
        await this.emit('client:render:mount', webview);
      }
      await this.history.notify(index, webview);
    }

    if (webview && !redirecting) {
      this.installed = true;
      this.exchange();
    }
    this.doing = false;
  }

  async error(value) {
    if (value instanceof Error || Object.prototype.toString.call(value) === '[object Error]') {
      this.err = value;
      /* istanbul ignore if */
      if (this.err.code === 302) {
        if (this.env === 'server') {
          throw value;
        } else {
          return async() => await this.go(this.err.url);
        }
      } else {
        try{
          await this.emit(String(value.code), value);
        }catch(e) {
          return await this.error(e);
        }
      }
    } else {
      this.err = null;
      await this.emit('200', this.webView);
    }
  }

  /**
   * 运行系统中间件方法
   * 用来匹配到对应的webview
   * @returns {Promise.<*>}
   */
  async createServerProgress(uri) {
    if (this.doing) return;
    this.doing = true;

    let error, index;
    this.set('request', uri instanceof Request ? uri : new Request(uri));
    this.set('response', new Response());
    this.request.app = this.response.app = this;
    if (this.history) {
      index = this.history.processDirection(this.request);
    }

    await this.emit('process:start');
    this.index = index;
    try {
      await this.execute(this);
    } catch (e) {
      error = e;
    }
    delete this.index;

    if (error) {
      if (!error.code) error.code = 500;
    } else {
      const value = this.get('active-webview');
      if (value) {
        const {
          basic,
          mark
        } = value;
        const webview = basic.dic.get(mark);

        if (webview) {
          this.exchange();
        } else {
          error = new Error('webview lost');
          error.code = 404;
        }
      } else {
        error = new Error('webview lost');
        error.code = 404;
      }
    }

    const callback = await this.error(error);
    await this.notify(index, !!callback);
    await this.emit('process:end');
    callback && await callback();
  }

  async render(views, data) {
    return await this.response.render(
      this.plugin.get('engine'),
      views, data
    );
  }

  pathChange() {
    this.history.on(
      'pathchange',
      async next => await this.createServerProgress(next)
    );
  }

  searchChange() {
    const engine = this.plugin.get('engine');
    this.history.on('searchchange', async(next, prev) => {
      if (this.options.strict) {
        await this.createServerProgress(next);
      } else {
        await engine.searchchange(this.webView, prev, next);
        await this.emit('searchchange', prev, next);
      }
    });
  }

  hashChange() {
    this.history.on('hashchange', async(next, prev) => {
      this.set('request', next instanceof Request ? next : new Request(next));
      this.set('response', new Response());
      await engine.hashchange(this.webView, prev, next);
      await this.emit('hashchange', prev, next);
    });
  }

  listen() {
    const engine = this.plugin.get('engine');

    /* istanbul ignore if */
    if (!engine) {
      throw new Error(
        'You have not set webview rendering engine, ' +
        'you must set it first.'
      );
    }

    this.__defineProcessHandle__();

    /* istanbul ignore if */
    if (this.env === 'server') {
      if (typeof engine.ssr !== 'function') {
        throw new Error(`SSR must be a function to render`);
      }
      return engine.ssr();
    }

    /* istanbul ignore next */
    const clientResolveCallback = () => {
      this.emit('client:render:polyfill');
      this.history.action = 'push';
      this.createServerProgress(this.history.location()).then(() => {
        this.history.clear();
        this.clientMounted = true;
        return this.emit('app:end');
      });
    };

    const webResolveCallback = () => {
      this.history.action = 'push';
      this.createServerProgress(this.history.location()).then(() => {
        this.history.clear();
        return this.emit('app:end');
      });
    };

    this.history = new History(this);
    const historyListener = this.history.listen();
    this.pathChange();
    this.searchChange();
    this.hashChange();

    this.emit('app:start').then(() => {
      WebTree(this);
      /* istanbul ignore if */
      if (this.env === 'client') {
        clientResolveCallback();
      } else {
        webResolveCallback();
      }
    });

    return historyListener;
  }

  /* istanbul ignore next */
  async fetch(callback = {}) {
    let client, server;

    if (typeof callback === 'function') {
      client = server = callback;
    } else {
      client = callback.client;
      server = callback.server;
    }
    if (
      (!this.clientMounted && this.env === 'client') ||
      (this.env === 'server' && this.clientMounted)
    ) {
      return;
    }

    if (!client || !server) {
      throw new Error('client and server must be both function');
    }

    if (this.env === 'client' && this.clientMounted) {
      return await client(this.reference);
    }

    if (this.env === 'server' && !this.clientMounted) {
      return await server(this.reference);
    }

    return await client(this.reference);
  }
}