/**
 * Created by evio on 2017/8/29.
 */
import {
  EventEmitter
} from '../miox_modules/events';
import SessionStorage from './session';
import Request from '../miox_modules/request';
import {
  getLocalURI,
  replaceHash
} from './util';

export default class History extends EventEmitter {
  constructor(app) {
    super();
    this.app = app;
    this.stacks = [];
    this.action = null;
    this.direction = 0;
    this.title = global.document.title;
    this.popState = app.options.popState || (
      app.env === 'client' &&
      global.history &&
      typeof global.history.pushState === 'function'
    );

    if (this.useSessionStorage) {
      this.session = new SessionStorage(app);
    }
  }

  async notify(index) {
    if (!this.session) return;
    if (!this.app.installed) {
      if (this.session.current) return;
      return this.session.actionPush();
    }

    switch (this.action) {
      case 'push':
        this.session.actionPush();
        this.session.autoRemove();
        break;
      case 'replace':
        this.session.actionReplace();
        break;
      default:
        if (index) {
          this.session.moveSession(index);
        }
    }
  }

  clear() {
    this.action = null;
    this.direction = 0;
  }

  processDirection(req) {
    if (!this.session) return;
    switch (this.action) {
      case 'push':
        this.direction = 1;
        break;
      case 'replace':
        break;
      default:
        const index = this.session.findSession(req.pathname, req.sortQuery);
        if (index === undefined) {
          throw new Error('can not find this request of `' + req.href + '` in sessionStorage');
        }
        this.direction = this.session.current > index ?
          -1 :
          (
            this.session.current === index ?
            0 :
            1
          );
        return index;
    }
  }

  async push(url) {
    this.action = 'push';
    if (this.popState) {
      global.history.pushState(null, this.title, url);
      await this.change(this.request, new Request(this.location()));
    } else {
      global.location.hash = url;
    }
  }

  async replace(url) {
    this.action = 'replace';
    if (this.popState) {
      global.history.replaceState(null, this.title, url);
      await this.change(this.request, new Request(this.location()));
    } else {
      replaceHash(url);
    }
  }

  async go(obj) {
    if (typeof obj === 'number') {
      if (obj === 0) return;
      if (this.session) {
        this.direction = obj > 1 ? 1 : -1;
      }
      return global.history.go(obj);
    }

    const {
      pathname,
      sortQuery
    } = new Request(obj);
    if (this.session) {
      const index = this.session.findSession(pathname, sortQuery);

      if (index === undefined) {
        return await this.push(obj);
      }

      if (this.session.current !== index) {
        return this.go(index - this.session.current);
      }
    } else {
      await this.push(obj);
    }
  }

  async redirect(url) {
    const err = new Error('302 Redirect');
    err.code = 302;
    err.url = url;
    throw err;
  }

  link(url) {
    if (this.app.doing) return;
    this.app.doing = true;
    if (this.session) {
      const max = Math.max.apply(Math, Object.keys(this.session.variables).map(i => Number(i)));
      if (this.session.current < max) {
        this.session.autoRemove(this.session.current);
      }
      this.session.setSession(this.session.current + 1, url, '');
    }
    global.location.href = url
  }

  /**
   * 是否使用sessionStorage来判断方向
   * 如果没有动画插件，一律不使用。
   * 如果配置中未启动了，而你使用方向性动画，将报错或者无任何效果。
   * @returns {*}
   */
  get useSessionStorage() {
    if (!this.app.plugin.get('animate')) return false;
    return this.app.options.session;
  }

  get request() {
    return this.app.request;
  }

  location() {
    return getLocalURI(global.location, this.popState);
  }

  async compare(prev, next) {
    if (prev.pathname !== next.pathname) return await this.emit('pathchange', next, prev);
    if (prev.mark !== next.mark) return await this.emit('searchchange', next, prev);
    if (prev.hash !== next.hash) return await this.emit('hashchange', next, prev);
  }

  async change(prev, next) {
    await this.compare(prev, next).then(() => this.clear());
  }

  listen() {
    const callback = () => this.change(this.request, new Request(this.location()));
    global.addEventListener(this.popState ? 'popstate' : 'hashchange', callback);
    return () => {
      global.removeEventListener(this.popState ? 'popstate' : 'hashchange', callback);
    }
  }
}