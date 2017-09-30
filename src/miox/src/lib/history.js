/**
 * Created by evio on 2017/8/29.
 */
import { EventEmitter } from '../miox_modules/events';
import SessionStorage from './session';
import Request from '../miox_modules/request';
import { getLocalURI, replaceHash } from './util';

export default class History extends EventEmitter {
    constructor(app) {
        super();
        this.app = app;     // as top level browsering context
        this.stacks = [];   // without iframe embedded, called session history

        this.action = null;
        this.direction = 0;

        // current entry
        // active document of the browsing context
        // current active document
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

    // 更新模拟的 session history
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

    // 返回 index， 同时更新 direction，输入是下一个 route URL
    processDirection(req) {
        if (!this.session) return;
        switch (this.action) {
            // 1 --> forward
            case 'push':
                this.direction = 1;
                break;
            // reload/replace
            case 'replace': break;
            default:
                const index = this.session.findSession(req.pathname, req.sortQuery);
                if (index === undefined) {
                    throw new Error('can not find this request of `' + req.href + '` in sessionStorage');
                }
                this.direction = this.session.current > index
                    ? -1
                    : (
                        this.session.current === index
                            ? 0
                            : 1
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

        const { pathname, sortQuery } = new Request(obj);
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

    // 使用错误机制来控制程序流程? 这个是挺好的思路，比 return 强大多了
    async redirect(url) {
        const err = new Error('302 Redirect');
        err.code = 302;
        err.url = url;
        throw err;
    }

    // 跳转到另一 document，
    // 维护 sessionStorage 中的 sessionHistory 队列
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

    // 关注 request 的生命周期
    get request() {
        return this.app.request;
    }

    // 获取当前 session history entry 所对应的一个状态字符串
    location() {
        return getLocalURI(global.location, this.popState);
    }

    // 完全是异步的逻辑啊
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

        // return the removingListenerFunction
        return () => {
            global.removeEventListener(this.popState ? 'popstate' : 'hashchange', callback);
        }
    }
}
