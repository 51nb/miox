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
import { extend } from './util';

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
            strict: true,
            debug: false
        });

        this.env = process.env.MIOX_ENV || 'web';
        this.vars = new Dictionary();
        this.cache = new Dictionary();
        this.plugin = new Plugin(this);
        this.installed = false;
        this.err = null;
        this.doing = false;

        this.set('request', {});
        this.set('response', {});
        this.set('exists-webview', null);
        this.set('active-webview', null);

        this.vars.on('engine', this.plugin.Engine.bind(this.plugin));
        this.vars.on('animate', this.plugin.Animate.bind(this.plugin));
    }

    log(...args) {
        if (process.env.NODE_ENV === 'production') return;
        if (this.options.debug) console.log(...args);
    }

    set(...args){ return this.vars.set(...args); }
    get(...args){ return this.vars.get(...args); }
    del(...args){ return this.vars.del(...args); }
    exists(...args) { return this.vars.exists(...args); }
    filter(...args) { return this.vars.filter(...args); }

    async push(...args) { return await this.history.push(...args); }
    async replace(...args) { return await this.history.replace(...args); }
    async go(...args) { return await this.history.go(...args); }
    async redirect(...args) { return await this.history.redirect(...args); }

    get request() { return this.get('request'); }
    get response() { return this.get('response'); }
    get req() { return this.request; }
    get res() { return this.response; }
    get query() { return this.req.query || {}; }
    get pathname() { return this.req.pathname || '/'; }
    get url() { return this.req.href || '/'; }

    get webView() {
        const existsWebView = this.get('exists-webview');
        if (existsWebView) {
            return existsWebView.basic.dic.get(existsWebView.mark);
        }
    }

    exchange() {
        const webView = this.get('active-webview');
        if (webView) {
            this.set('exists-webview', webView);
            this.set('active-webview', null);
        }
    }

    async notify(index) {
        const webview = this.webView;

        if (this.env !== 'server') {
            if (this.env === 'client' && !this.installed) {
                await this.emit('client:render:mount', webview);
            }
            await this.history.notify(index, webview);
        }

        if (webview) {
            this.installed = true;
            this.exchange();
        }
        this.doing = false;
    }

    async error(value) {
        if (value instanceof Error) {
            this.err = value;
            await this.emit(String(value.code), value);
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
        this.log('%c------------ Process Start ------------', 'color:#000;font-weight:bold;');

        if (this.doing) return;
        this.doing = true;

        this.log('History type:', this.history ? (this.history.action || 'native') : '服务端渲染无行为');

        let error, index;
        this.set('request', uri instanceof Request ? uri : new Request(uri));
        this.set('response', new Response());
        this.request.app = this.response.app = this;
        if (this.history) {
            index = this.history.processDirection(this.request);
            this.log('Animate direction:', this.history.direction);
        }

        await this.emit('process:start');
        try{ await this.execute(this); } catch(e) { error = e; }

        if (error) {
            if (!error.code) error.code = 500;
        } else {
            const { basic, mark } = this.get('active-webview');
            const webview = basic.dic.get(mark);

            if (webview) {
                this.exchange();
            } else {
                error = new Error('webview lost');
                error.code = 404;
            }
        }

        await this.error(error);
        await this.notify(index);
        await this.emit('process:end');
    }

    async render(views, data) {
        return await this.response.render(
            this.plugin.get('engine'),
            views, data
        );
    }

    pathChange() {
        this.history.on('pathchange', async next => {
            await this.createServerProgress(next);
            if (this.err) {
                await this.emit(String(this.err.code), this.err);
            } else {
                await this.emit('200', this.webView);
            }
        });
    }

    searchChange() {
        this.history.on('searchchange', async (next, prev) => {
            if (this.options.strict) {
                await this.createServerProgress(next);
                if (this.err) {
                    await this.emit(String(this.err.code), this.err);
                } else {
                    await this.emit('200', this.webView);
                }
            } else if (this.webView && typeof this.webView.MioxInjectWebviewSearchChange === 'function') {
                await this.webView.MioxInjectWebviewSearchChange(prev, next);
            } else {
                await this.emit('searchchange', prev, next);
            }
        });
    }

    hashChange() {
        this.history.on('hashchange', async (next, prev) => {
            this.set('request', next instanceof Request ? next : new Request(next));
            this.set('response', new Response());
            if (this.webView && typeof this.webView.MioxInjectWebviewHashChange === 'function') {
                await this.webView.MioxInjectWebviewHashChange(prev, next);
            } else {
                await this.emit('hashchange', prev, next);
            }
        });
    }

    listen() {
        if (!this.plugin.get('engine')) {
            throw new Error(
                'You have not set webview rendering engine, ' +
                'you must set it first.'
            );
        }

        this.emit('app:start');

        WebTree(this);
        this.__defineProcessHandle__();

        if (this.env !== 'server') {
            this.history = new History(this);
            this.history.listen();
            this.pathChange();
            this.searchChange();
            this.hashChange();
        }

        switch (this.env) {
            case 'server':
                return async options => {
                    const { url, app, ctx } = options;
                    this.$application = app;
                    this.$context = ctx;
                    await this.createServerProgress(url);
                    this.emit('app:end');
                    if (this.err) {
                        return this.err;
                    } else {
                        await this.emit('server:render:polyfill', options);
                        return this.webView;
                    }
                };
            case 'client':
                this.emit('client:render:polyfill');
                this.history.action = 'push';
                this.createServerProgress(this.history.location()).then(() => {
                    this.history.clear();
                    this.emit('app:end');
                });
                break;
            case 'web':
                this.history.action = 'push';
                this.createServerProgress(this.history.location()).then(() => {
                    this.history.clear();
                    this.emit('app:end');
                });
                break;
        }
    }
}